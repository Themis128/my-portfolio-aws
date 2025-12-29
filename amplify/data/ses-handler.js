import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

export const request = async (ctx) => {
  const { to, subject, body } = ctx.arguments;

  // Validate required fields
  if (!to || !subject || !body) {
    throw new Error('To, subject, and body are all required');
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(to)) {
    throw new Error('Please provide a valid email address');
  }

  try {
    // Initialize SES client
    const sesClient = new SESClient({
      region: process.env.AWS_REGION || 'eu-central-1'
    });

    // Prepare email parameters
    const params = {
      Source: process.env.FROM_EMAIL || 'noreply@cloudless.gr',
      Destination: {
        ToAddresses: [to]
      },
      Message: {
        Subject: {
          Data: subject,
          Charset: 'UTF-8'
        },
        Body: {
          Text: {
            Data: body,
            Charset: 'UTF-8'
          }
        }
      }
    };

    // Send email using SES
    const command = new SendEmailCommand(params);
    const result = await sesClient.send(command);

    console.log(`📧 Email sent successfully to ${to}: ${subject} (MessageId: ${result.MessageId})`);
    return `Email sent successfully to ${to} (MessageId: ${result.MessageId})`;

  } catch (error) {
    console.error('❌ SES email failed:', error);

    // Check if SES is not configured or not verified
    if (error.name === 'MessageRejected' || error.message.includes('not verified')) {
      console.log('⚠️ SES email failed - email address may not be verified in SES');
      return `Email sending skipped - SES not configured or email not verified (To: ${to})`;
    }

    throw new Error(`Failed to send email: ${error.message}`);
  }
};

export const response = (ctx) => {
  return ctx.result;
};
