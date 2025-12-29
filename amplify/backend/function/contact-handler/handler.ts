import { generateClient } from '@aws-amplify/api';

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

export const handler = async (event: ContactEvent) => {
  try {
    console.log('Contact handler called with event:', JSON.stringify(event, null, 2));

    // Handle direct GraphQL mutation calls
    if (event.arguments) {
      const { name, email, message } = event.arguments;

      if (!name || !email || !message) {
        console.error('Missing required fields');
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Missing required fields' }),
        };
      }

      console.log('Storing contact form submission in DynamoDB');

      // Store in DynamoDB via GraphQL
      const client = generateClient();
      const result = await client.graphql({
        query: `
          mutation CreateContact($input: CreateContactInput!) {
            createContact(input: $input) {
              id
              name
              email
              message
              createdAt
            }
          }
        `,
        variables: {
          input: {
            name,
            email,
            message,
          },
        },
      });

      console.log('Contact form stored successfully:', result);

      // For GraphQL calls, return success message
      return 'Message sent successfully';
    }

    // Handle DynamoDB stream events (for future use)
    if (event.Records && event.Records[0] && event.Records[0].dynamodb) {
      console.log('DynamoDB stream event received - processing...');
      // Future enhancement: send emails, Slack notifications, etc.
      return;
    }

    console.error('Unsupported event format');
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Unsupported event format' }),
    };

  } catch (error) {
    console.error('Error processing contact form:', error);
    if (event.arguments) {
      // For GraphQL calls, return error message
      throw new Error('Failed to send message');
    }
  }
};
