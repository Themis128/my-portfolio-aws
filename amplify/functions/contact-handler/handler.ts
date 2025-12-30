import { generateClient } from '@aws-amplify/api';

// Types for better TypeScript support
interface ContactEvent {
  arguments?: {
    name: string;
    email: string;
    message: string;
  };
  Records?: Array<{
    dynamodb?: unknown;
  }>;
}

interface LambdaResponse {
  statusCode: number;
  body: string;
  headers?: Record<string, string>;
}

interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// Environment validation
const validateEnvironment = (): void => {
  const requiredEnvVars = ['AWS_REGION'];
  const missing = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};

// Input validation
const validateContactInput = (name: string, email: string, message: string): ValidationResult => {
  if (!name?.trim()) {
    return { isValid: false, error: 'Name is required' };
  }

  if (!email?.trim()) {
    return { isValid: false, error: 'Email is required' };
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { isValid: false, error: 'Invalid email format' };
  }

  if (!message?.trim()) {
    return { isValid: false, error: 'Message is required' };
  }

  if (message.trim().length < 10) {
    return { isValid: false, error: 'Message must be at least 10 characters long' };
  }

  if (message.trim().length > 2000) {
    return { isValid: false, error: 'Message must be less than 2000 characters' };
  }

  return { isValid: true };
};

// Store contact in database
const storeContact = async (name: string, email: string, message: string): Promise<string> => {
  console.log('Storing contact form submission', { name: name.substring(0, 50), email });

  const client = generateClient();

  const result = await client.graphql({
    query: `
      mutation CreateContact($input: CreateContactInput!) {
        createContact(input: $input) {
          id
          createdAt
        }
      }
    `,
    variables: {
      input: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
      },
    },
  });

  console.log('Contact stored successfully', {
    id: result.data.createContact.id,
    timestamp: result.data.createContact.createdAt
  });

  return result.data.createContact.id;
};

// Send Slack notification
const sendSlackNotification = async (contactId: string, name: string, email: string, message: string): Promise<void> => {
  try {
    console.log('Sending Slack notification for contact', contactId);

    const client = generateClient();

    // Truncate message for Slack if too long
    const truncatedMessage = message.length > 500
      ? message.substring(0, 500) + '...'
      : message;

    const slackMessage = `📧 *New Contact Form Submission*\n\n` +
      `👤 *Name:* ${name}\n` +
      `📧 *Email:* ${email}\n` +
      `💬 *Message:* ${truncatedMessage}\n\n` +
      `🆔 *Contact ID:* ${contactId}`;

    await client.graphql({
      query: `
        mutation SendSlackNotification($message: String!, $channel: String) {
          sendSlackNotification(message: $message, channel: $channel)
        }
      `,
      variables: {
        message: slackMessage,
        channel: '#general'
      }
    });

    console.log('Slack notification sent successfully for contact', contactId);
  } catch (error) {
    console.warn('Failed to send Slack notification:', error);
    // Don't fail the operation if Slack fails
  }
};

// Main handler
export const handler = async (event: ContactEvent): Promise<string | LambdaResponse> => {
  const startTime = Date.now();

  try {
    // Validate environment on cold start
    validateEnvironment();

    console.log('Contact handler invoked', {
      hasArguments: !!event.arguments,
      hasRecords: !!event.Records,
      timestamp: new Date().toISOString()
    });

    // Handle GraphQL mutation calls
    if (event.arguments) {
      const { name, email, message } = event.arguments;

      // Validate input
      const validation = validateContactInput(name, email, message);
      if (!validation.isValid) {
        console.warn('Input validation failed:', validation.error);
        return {
          statusCode: 400,
          body: JSON.stringify({
            error: validation.error,
            timestamp: new Date().toISOString()
          }),
          headers: {
            'Content-Type': 'application/json',
            'X-Amz-Error-Type': 'ValidationException'
          }
        };
      }

      // Store contact
      const contactId = await storeContact(name, email, message);

      // Send notification (non-blocking)
      sendSlackNotification(contactId, name, email, message);

      const duration = Date.now() - startTime;
      console.log('Contact handler completed successfully', {
        contactId,
        duration: `${duration}ms`
      });

      return `Contact form submitted successfully. Reference ID: ${contactId}`;
    }

    // Handle DynamoDB stream events (for future analytics)
    if (event.Records && event.Records.length > 0) {
      console.log('DynamoDB stream event received', {
        recordCount: event.Records.length,
        timestamp: new Date().toISOString()
      });
      return 'DynamoDB stream event processed';
    }

    // Unsupported event format
    console.warn('Unsupported event format received');
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Unsupported event format. Expected arguments or Records.',
        timestamp: new Date().toISOString()
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    };

  } catch (error) {
    const duration = Date.now() - startTime;

    console.error('Contact handler failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString()
    });

    // Return structured error response
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development'
          ? (error instanceof Error ? error.message : 'Unknown error')
          : 'An error occurred while processing your request',
        timestamp: new Date().toISOString(),
        requestId: process.env.AWS_REQUEST_ID || 'unknown'
      }),
      headers: {
        'Content-Type': 'application/json',
        'X-Amz-Error-Type': 'InternalServerError'
      }
    };
  }
};
