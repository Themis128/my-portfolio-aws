import { GetParameterCommand, SSMClient } from '@aws-sdk/client-ssm';
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
    // Get Slack token from environment variables or SSM parameter
    let token = process.env.SLACK_BOT_TOKEN;
    const ssmParam = process.env.SLACK_SSM_PARAM;

    if (!token && ssmParam) {
      try {
        const ssm = new SSMClient({});
        const cmd = new GetParameterCommand({ Name: ssmParam, WithDecryption: true });
        const resp = await ssm.send(cmd);
        token = resp.Parameter?.Value;
      } catch (e) {
        console.error('Failed to fetch Slack token from SSM:', e);
      }
    }

    if (!token) {
      console.error('SLACK_BOT_TOKEN not configured and no SLACK_SSM_PARAM available');
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
