export const request = async (ctx) => {
  const { message, channel = '#general' } = ctx.arguments;

  // Validate required fields
  if (!message) {
    throw new Error('Message is required');
  }

  try {
    // Check if Slack webhook URL is configured
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

    if (!slackWebhookUrl) {
      console.log('⚠️ Slack webhook URL not configured, skipping Slack notification');
      return 'Slack notification skipped - webhook URL not configured';
    }

    // Prepare Slack message payload
    const payload = {
      text: message,
      channel: channel,
      username: 'Portfolio Contact Form',
      icon_emoji: ':rocket:'
    };

    // Send message to Slack using webhook
    const response = await fetch(slackWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Slack webhook failed: ${response.status} ${response.statusText}`);
    }

    console.log(`📢 Slack notification sent to ${channel}: ${message.substring(0, 50)}...`);
    return `Slack notification sent successfully to ${channel}`;

  } catch (error) {
    console.error('❌ Slack notification failed:', error);
    throw new Error(`Failed to send Slack notification: ${error.message}`);
  }
};

export const response = (ctx) => {
  return ctx.result;
};
