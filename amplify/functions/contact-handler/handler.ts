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
  // Handle direct GraphQL mutation calls
  if (event.arguments) {
    const { name, email, message } = event.arguments;

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      console.error('Missing required fields');
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    try {
      console.log('Storing contact form submission');

      // Store in DynamoDB via GraphQL
      const client = generateClient();
      await client.graphql({
        query: `
          mutation CreateContact($input: CreateContactInput!) {
            createContact(input: $input) {
              id
            }
          }
        `,
        variables: {
          input: {
            name: name.trim(),
            email: email.trim(),
            message: message.trim(),
          },
        },
      });

      console.log('Contact form stored successfully');

      // Send Slack notification
      try {
        console.log('Sending Slack notification...');
        await client.graphql({
          query: `
            mutation SendSlackNotification($message: String!, $channel: String) {
              sendSlackNotification(message: $message, channel: $channel)
            }
          `,
          variables: {
            message: `New contact form submission from ${name} (${email}): ${message}`,
            channel: '#general'
          }
        });
        console.log('Slack notification sent successfully');
      } catch (slackError) {
        console.warn('Failed to send Slack notification:', slackError);
        // Don't fail the whole operation if Slack fails
      }

      return 'Message sent successfully';
    } catch (error) {
      console.error('Error storing contact:', error);
      throw new Error('Failed to send message');
    }
  }

  // Handle DynamoDB stream events (for future use)
  if (event.Records && event.Records[0]?.dynamodb) {
    console.log('DynamoDB stream event received');
    return;
  }

  console.error('Unsupported event format');
  return {
    statusCode: 400,
    body: JSON.stringify({ error: 'Unsupported event format' }),
  };
};
