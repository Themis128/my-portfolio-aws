export const handler = async (event: {
  arguments?: {
    message: string;
    channel?: string;
  };
}) => {
  const { message, channel = '#general' } = event.arguments || {};

  if (!message) {
    throw new Error('Message is required');
  }

  const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

  // Check if Slack is properly configured
  if (!slackWebhookUrl || slackWebhookUrl === 'REDACTED_SLACK_WEBHOOK_URL') {
    console.log('ℹ️ Slack webhook not configured, skipping notification');
    return 'Slack notification skipped - webhook not configured';
  }

  if (!slackWebhookUrl.startsWith('https://')) {
    console.log('ℹ️ Invalid Slack webhook URL format');
    return 'Slack notification skipped - invalid webhook URL';
  }

  try {
    const slackPayload = {
      channel: channel,
      username: 'Portfolio Analytics Bot',
      icon_emoji: ':chart_with_upwards_trend:',
      text: message,
      attachments: [
        {
          color: '#36a64f',
          footer: 'Portfolio Analytics System',
          ts: Math.floor(Date.now() / 1000),
        },
      ],
    };

    // Use Node.js built-in fetch (available in Node 18+)
    const response = await globalThis.fetch(slackWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(slackPayload),
    });

    if (!response.ok) {
      throw new Error(`Slack API responded with status: ${response.status}`);
    }

    console.log('✅ Slack notification sent successfully');
    return 'Slack notification sent successfully';

  } catch (error) {
    console.error('❌ Error sending Slack notification:', error);
    throw new Error(`Failed to send Slack notification: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};