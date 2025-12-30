import { GetParameterCommand, SSMClient } from '@aws-sdk/client-ssm';
import { WebClient } from '@slack/web-api';

// Types for better TypeScript support
interface SlackNotificationEvent {
  arguments?: {
    message: string;
    channel?: string;
  };
}

interface LambdaResponse {
  statusCode: number;
  body: string;
  headers?: Record<string, string>;
}

interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// Environment validation
const validateEnvironment = (): void => {
  const hasToken = process.env.SLACK_BOT_TOKEN || process.env.SLACK_SSM_PARAM;
  if (!hasToken) {
    throw new Error('SLACK_BOT_TOKEN or SLACK_SSM_PARAM must be configured');
  }

  if (!process.env.AWS_REGION) {
    throw new Error('AWS_REGION environment variable is required');
  }
};

// Input validation
const validateSlackInput = (message: string, channel: string): ValidationResult => {
  if (!message?.trim()) {
    return { isValid: false, error: 'Message is required' };
  }

  if (message.trim().length > 4000) {
    return { isValid: false, error: 'Message must be less than 4000 characters' };
  }

  if (!channel?.trim()) {
    return { isValid: false, error: 'Channel is required' };
  }

  // Basic channel validation (should start with # for public channels or @ for DMs)
  if (!channel.startsWith('#') && !channel.startsWith('@')) {
    return { isValid: false, error: 'Channel must start with # (public) or @ (DM)' };
  }

  return { isValid: true };
};

// Get Slack token from environment or SSM
const getSlackToken = async (): Promise<string> => {
  // Try environment variable first
  if (process.env.SLACK_BOT_TOKEN) {
    return process.env.SLACK_BOT_TOKEN;
  }

  // Try SSM parameter
  const ssmParam = process.env.SLACK_SSM_PARAM;
  if (ssmParam) {
    try {
      console.log('Fetching Slack token from SSM parameter:', ssmParam);
      const ssm = new SSMClient({ region: process.env.AWS_REGION });
      const cmd = new GetParameterCommand({
        Name: ssmParam,
        WithDecryption: true
      });
      const resp = await ssm.send(cmd);

      if (!resp.Parameter?.Value) {
        throw new Error('SSM parameter exists but has no value');
      }

      console.log('Successfully retrieved Slack token from SSM');
      return resp.Parameter.Value;
    } catch (error) {
      console.error('Failed to fetch Slack token from SSM:', error);
      throw new Error('Unable to retrieve Slack authentication token');
    }
  }

  throw new Error('No Slack authentication method configured');
};

// Send Slack message
const sendSlackMessage = async (token: string, message: string, channel: string): Promise<string> => {
  console.log('Sending Slack message', {
    channel,
    messageLength: message.length,
    timestamp: new Date().toISOString()
  });

  const client = new WebClient(token);

  try {
    const result = await client.chat.postMessage({
      channel: channel,
      text: message,
      username: 'Portfolio Contact Bot',
      icon_emoji: ':email:',
      // Add some formatting for better readability
      mrkdwn: true,
    });

    if (!result.ok) {
      throw new Error(`Slack API error: ${result.error}`);
    }

    console.log('Slack message sent successfully', {
      channel,
      messageId: result.ts,
      timestamp: new Date().toISOString()
    });

    return result.ts!;
  } catch (error) {
    console.error('Slack API call failed:', error);

    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('missing_scope')) {
        throw new Error('Slack bot is missing required permissions (chat:write)');
      }
      if (error.message.includes('channel_not_found')) {
        throw new Error(`Slack channel "${channel}" not found or bot not invited`);
      }
      if (error.message.includes('invalid_auth')) {
        throw new Error('Slack authentication failed - check bot token');
      }
    }

    throw error;
  }
};

// Main handler
export const handler = async (event: SlackNotificationEvent): Promise<string | LambdaResponse> => {
  const startTime = Date.now();

  try {
    // Validate environment on cold start
    validateEnvironment();

    console.log('Slack notifier invoked', {
      hasArguments: !!event.arguments,
      timestamp: new Date().toISOString()
    });

    const { message, channel = '#general' } = event.arguments || {};

    // Validate input
    const validation = validateSlackInput(message, channel);
    if (!validation.isValid) {
      console.warn('Input validation failed:', validation.error);
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: validation.error,
          timestamp: new Date().toISOString()
        }),
        headers: {
          'Content-Type': 'application/json',
          'X-Amz-Error-Type': 'ValidationException'
        }
      };
    }

    // Get authentication token
    const token = await getSlackToken();

    // Send message
    const messageId = await sendSlackMessage(token, message.trim(), channel.trim());

    const duration = Date.now() - startTime;
    console.log('Slack notifier completed successfully', {
      channel,
      messageId,
      duration: `${duration}ms`
    });

    return `Message sent to Slack channel ${channel} (ID: ${messageId})`;

  } catch (error) {
    const duration = Date.now() - startTime;

    console.error('Slack notifier failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString()
    });

    // Return structured error response
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to send Slack notification',
        message: process.env.NODE_ENV === 'development'
          ? (error instanceof Error ? error.message : 'Unknown error')
          : 'An error occurred while sending the notification',
        timestamp: new Date().toISOString(),
        requestId: process.env.AWS_REQUEST_ID || 'unknown'
      }),
      headers: {
        'Content-Type': 'application/json',
        'X-Amz-Error-Type': 'SlackNotificationError'
      }
    };
  }
};
