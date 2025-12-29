import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

interface EmailEvent {
  arguments?: {
    to: string;
    subject: string;
    body: string;
    from?: string;
  };
}

export const handler = async (event: EmailEvent) => {
  const { to, subject, body, from } = event.arguments || {};

  if (!to || !subject || !body) {
    console.error('Missing required fields: to, subject, or body');
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing required fields: to, subject, body' }),
    };
  }

  try {
    // Create SES client
    const sesClient = new SESClient({ region: process.env.AWS_REGION || 'eu-central-1' });

    // Default from address if not provided
    const fromAddress = from || process.env.FROM_EMAIL || 'noreply@yourdomain.com';

    // Prepare email parameters
    const params = {
      Source: fromAddress,
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Subject: {
          Data: subject,
          Charset: 'UTF-8',
        },
        Body: {
          Text: {
            Data: body,
            Charset: 'UTF-8',
          },
          Html: {
            Data: `<html><body><pre>${body.replace(/\n/g, '<br>')}</pre></body></html>`,
            Charset: 'UTF-8',
          },
        },
      },
    };

    // Send email
    const command = new SendEmailCommand(params);
    const result = await sesClient.send(command);

    console.log('Email sent successfully:', result.MessageId);

    return `Email sent successfully with ID: ${result.MessageId}`;

  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};
