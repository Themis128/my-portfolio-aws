import { WebClient } from '@slack/web-api';

interface SlackNotificationEvent {
  arguments?: {
    message: string;
    channel?: string;
  };
}

export const handler = async (event: SlackNotificationEvent) => {
  const { message, channel = '#general' } = event.arguments || {};

  if (!message) {
    console.error('No message provided');
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Message is required' }),
    };
  }

  try {
    // Get Slack token from environment variables
    const token = process.env.SLACK_BOT_TOKEN;

    if (!token) {
      console.error('SLACK_BOT_TOKEN environment variable not set');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Slack configuration missing' }),
      };
    }

    const client = new WebClient(token);

    // Send message to Slack
    const result = await client.chat.postMessage({
      channel: channel,
      text: message,
      username: 'Portfolio Contact Bot',
      icon_emoji: ':email:',
    });

    console.log('Slack message sent successfully:', result.ts);

    return `Message sent to Slack channel ${channel}`;

  } catch (error) {
    console.error('Error sending Slack message:', error);
    throw new Error('Failed to send Slack notification');
  }
};
