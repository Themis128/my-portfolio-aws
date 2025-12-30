import { SESClient, SendEmailCommand, SendEmailCommandInput } from '@aws-sdk/client-ses';

// Types for better TypeScript support
interface EmailEvent {
  arguments?: {
    to: string;
    subject: string;
    body: string;
    from?: string;
  };
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
  if (!process.env.AWS_REGION) {
    throw new Error('AWS_REGION environment variable is required');
  }
};

// Input validation
const validateEmailInput = (to: string, subject: string, body: string, from?: string): ValidationResult => {
  // Email validation regex (basic)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!to?.trim()) {
    return { isValid: false, error: 'Recipient email (to) is required' };
  }

  if (!emailRegex.test(to.trim())) {
    return { isValid: false, error: 'Invalid recipient email format' };
  }

  if (!subject?.trim()) {
    return { isValid: false, error: 'Subject is required' };
  }

  if (subject.trim().length > 998) { // SES limit
    return { isValid: false, error: 'Subject must be less than 998 characters' };
  }

  if (!body?.trim()) {
    return { isValid: false, error: 'Email body is required' };
  }

  if (body.trim().length > 10000) { // Reasonable limit
    return { isValid: false, error: 'Email body must be less than 10,000 characters' };
  }

  if (from && !emailRegex.test(from.trim())) {
    return { isValid: false, error: 'Invalid sender email format' };
  }

  return { isValid: true };
};

// Prepare email content
const prepareEmailContent = (subject: string, body: string): { textBody: string; htmlBody: string } => {
  const textBody = body.trim();

  // Create HTML version with basic formatting
  const htmlBody = `<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    pre { white-space: pre-wrap; font-family: monospace; background: #f5f5f5; padding: 10px; border-radius: 4px; }
  </style>
</head>
<body>
  <pre>${body.trim().replace(/[&<>"']/g, (char) => ({
    '&': '&',
    '<': '<',
    '>': '>',
    '"': '"',
    "'": '&#39;'
  }[char] || char))}</pre>
</body>
</html>`;

  return { textBody, htmlBody };
};

// Send email via SES
const sendEmail = async (params: SendEmailCommandInput): Promise<string> => {
  console.log('Sending email via SES', {
    to: params.Destination?.ToAddresses?.[0],
    subject: params.Message?.Subject?.Data?.substring(0, 50),
    timestamp: new Date().toISOString()
  });

  const sesClient = new SESClient({ region: process.env.AWS_REGION });

  try {
    const command = new SendEmailCommand(params);
    const result = await sesClient.send(command);

    console.log('Email sent successfully via SES', {
      messageId: result.MessageId,
      timestamp: new Date().toISOString()
    });

    return result.MessageId!;
  } catch (error) {
    console.error('SES send failed:', error);

    // Provide more specific error messages based on SES error codes
    if (error instanceof Error) {
      if (error.name === 'MessageRejected') {
        if (error.message.includes('Email address is not verified')) {
          throw new Error('Sender email address is not verified in SES');
        }
        if (error.message.includes('sandbox')) {
          throw new Error('SES is in sandbox mode - recipient email must be verified');
        }
      }
      if (error.name === 'InvalidParameterValue') {
        throw new Error('Invalid email parameter - check email addresses and content');
      }
    }

    throw error;
  }
};

// Get sender email address
const getSenderEmail = (providedFrom?: string): string => {
  // Priority: provided > environment > fallback
  const fromAddress = providedFrom?.trim() ||
                     process.env.FROM_EMAIL?.trim() ||
                     'noreply@yourdomain.com';

  // Basic validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(fromAddress)) {
    throw new Error('Invalid sender email address');
  }

  return fromAddress;
};

// Main handler
export const handler = async (event: EmailEvent): Promise<string | LambdaResponse> => {
  const startTime = Date.now();

  try {
    // Validate environment on cold start
    validateEnvironment();

    console.log('Email sender invoked', {
      hasArguments: !!event.arguments,
      timestamp: new Date().toISOString()
    });

    const { to, subject, body, from } = event.arguments || {};

    // Validate input
    const validation = validateEmailInput(to, subject, body, from);
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

    // Get sender email
    const fromAddress = getSenderEmail(from);

    // Prepare email content
    const { textBody, htmlBody } = prepareEmailContent(subject, body);

    // Prepare SES parameters
    const params: SendEmailCommandInput = {
      Source: fromAddress,
      Destination: {
        ToAddresses: [to.trim().toLowerCase()],
      },
      Message: {
        Subject: {
          Data: subject.trim(),
          Charset: 'UTF-8',
        },
        Body: {
          Text: {
            Data: textBody,
            Charset: 'UTF-8',
          },
          Html: {
            Data: htmlBody,
            Charset: 'UTF-8',
          },
        },
      },
      // Add reply-to header
      ReplyToAddresses: [fromAddress],
    };

    // Send email
    const messageId = await sendEmail(params);

    const duration = Date.now() - startTime;
    console.log('Email sender completed successfully', {
      messageId,
      to: to.trim(),
      duration: `${duration}ms`
    });

    return `Email sent successfully (ID: ${messageId})`;

  } catch (error) {
    const duration = Date.now() - startTime;

    console.error('Email sender failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString()
    });

    // Return structured error response
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to send email',
        message: process.env.NODE_ENV === 'development'
          ? (error instanceof Error ? error.message : 'Unknown error')
          : 'An error occurred while sending your email',
        timestamp: new Date().toISOString(),
        requestId: process.env.AWS_REQUEST_ID || 'unknown'
      }),
      headers: {
        'Content-Type': 'application/json',
        'X-Amz-Error-Type': 'EmailSendingError'
      }
    };
  }
};
