import { generateClient } from '@aws-amplify/api';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { createContact } from './graphql/mutations';

const sesClient = new SESClient({ region: 'eu-central-1' });

export const handler = async (event: {
  body?: string | Record<string, unknown>;
  arguments?: {
    name: string;
    email: string;
    message: string;
  };
}) => {
  // Handle both GraphQL mutation arguments and API Gateway body
  let name: string | undefined, email: string | undefined, message: string | undefined;

  if (event.arguments) {
    // GraphQL mutation call
    ({ name, email, message } = event.arguments);
  } else {
    // Handle both Amplify and serverless-offline event formats
    let body: Record<string, unknown> = {};
    if (typeof event.body === 'string') {
      body = JSON.parse(event.body);
    } else if (event.body) {
      body = event.body;
    }

    ({ name, email, message } = body as {
      name?: string;
      email?: string;
      message?: string;
    });
  }

  if (!name || !email || !message) {
    if (event.arguments) {
      // For GraphQL, throw error for validation
      throw new Error('Missing required fields');
    } else {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
        },
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }
  }

  // At this point, we know name, email, message are defined

  try {
    // Store in DynamoDB via GraphQL
    const client = generateClient();
    await client.graphql({
      query: createContact,
      variables: {
        input: {
          name,
          email,
          message,
        },
      },
    });

    // Send confirmation email via SES
    try {
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
Themistoklis Baltzakis
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
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Continue anyway
    }

    // Send to Slack webhook
    try {
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

      await fetch('REDACTED_SLACK_WEBHOOK_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(slackPayload),
      });
    } catch (slackError) {
      console.error('Error sending to Slack:', slackError);
      // Continue anyway
    }

    // Return different format for GraphQL vs API Gateway
    if (event.arguments) {
      // GraphQL mutation - return string
      return "success";
    } else {
      // API Gateway - return HTTP response
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
        },
        body: JSON.stringify({
          message: 'Message sent successfully',
          success: true
        }),
      };
    }

  } catch (error) {
    console.error('Error processing contact form:', error);

    if (event.arguments) {
      // For GraphQL, throw error
      throw error;
    } else {
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
        },
        body: JSON.stringify({
          error: 'Internal server error',
          success: false
        }),
      };
    }
  }
};
