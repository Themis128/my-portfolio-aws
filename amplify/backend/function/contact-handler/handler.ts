import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { generateClient } from '@aws-amplify/api';

const sesClient = new SESClient({ region: 'eu-central-1' });

export const handler = async (event: any) => {
  try {
    let name, email, message;

    // Handle both DynamoDB stream events and direct GraphQL calls
    if (event.Records && event.Records[0] && event.Records[0].dynamodb) {
      // DynamoDB stream event
      const record = event.Records[0];
      const newImage = record.dynamodb.NewImage;

      name = newImage.name.S;
      email = newImage.email.S;
      message = newImage.message.S;

      if (!name || !email || !message) {
        console.error('Missing required fields in DynamoDB record');
        return;
      }
    } else if (event.arguments) {
      // Direct GraphQL mutation call
      name = event.arguments.name;
      email = event.arguments.email;
      message = event.arguments.message;

      if (!name || !email || !message) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Missing required fields' }),
        };
      }

      // Store in DynamoDB via GraphQL
      const client = generateClient();
      await client.graphql({
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
    } else {
      console.error('Unsupported event format');
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Unsupported event format' }),
      };
    }

    // Send confirmation email via SES
    const emailParams = {
      Source: 'noreply@cloudless.gr',
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Subject: {
          Data: 'Thank you for your message - Baltzakis Themis',
        },
        Body: {
          Text: {
            Data: `Dear ${name},

Thank you for reaching out to me!

I have received your message and appreciate you taking the time to contact me. I will review your inquiry and get back to you within 24 hours.

For your reference, here's a copy of your message:
"${message}"

Best regards,
Themis Baltzakis
www.baltzakisthemis.com

---
This is an automated response. Please do not reply to this email.`,
          },
          Html: {
            Data: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Message Received - Baltzakis Themis</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb;">Thank you for your message!</h2>

        <p>Dear ${name},</p>

        <p>Thank you for reaching out to me!</p>

        <p>I have received your message and appreciate you taking the time to contact me. I will review your inquiry and get back to you within 24 hours.</p>

        <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #2563eb; margin: 20px 0;">
            <strong>Your message:</strong><br>
            ${message.replace(/\n/g, '<br>')}
        </div>

        <p>Best regards,<br>
        <strong>Themis Baltzakis</strong><br>
        <a href="https://www.baltzakisthemis.com" style="color: #2563eb;">www.baltzakisthemis.com</a></p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="font-size: 12px; color: #666;">
            This is an automated response. Please do not reply to this email.
        </p>
    </div>
</body>
</html>`,
          },
        },
      },
    };

    await sesClient.send(new SendEmailCommand(emailParams));

    // Send to Slack webhook
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (!slackWebhookUrl) {
      console.warn('SLACK_WEBHOOK_URL not set, skipping Slack notification');
    } else {
      const slackPayload = {
        channel: '#personal-website',
        username: 'Contact Form Bot',
        icon_emoji: ':email:',
        attachments: [
          {
            fallback: `New contact form submission from ${name}`,
            color: '#36a64f',
            title: 'New Contact Form Submission',
            fields: [
              {
                title: 'Name',
                value: name,
                short: true,
              },
              {
                title: 'Email',
                value: email,
                short: true,
              },
              {
                title: 'Message',
                value: message,
                short: false,
              },
            ],
            footer: 'Baltzakis Themis Contact Form',
            ts: Math.floor(Date.now() / 1000),
          },
        ],
      };

      try {
        await fetch(slackWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(slackPayload),
        });
        console.log('Slack notification sent successfully');
      } catch (slackError) {
        console.error('Error sending Slack notification:', slackError);
      }
    }

    // Return appropriate response based on event type
    if (event.arguments) {
      // For GraphQL calls, return success message
      return 'Message sent successfully';
    }
    // For DynamoDB triggers, no return needed

  } catch (error) {
    console.error('Error processing contact form:', error);
    if (event.arguments) {
      // For GraphQL calls, return error message
      throw new Error('Failed to send message');
    }
  }
};
