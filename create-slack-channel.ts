import { config } from 'dotenv';
config({ path: '.env.local' });

import { WebClient } from '@slack/web-api';

const token = process.env.SLACK_BOT_TOKEN;
if (!token) {
  console.error('SLACK_BOT_TOKEN environment variable is not set');
  process.exit(1);
}
const client = new WebClient(token);

async function createChannel(): Promise<void> {
  try {
    const result = await client.conversations.create({
      name: 'webhook-channel',
      is_private: false,
    });
    console.log('Channel created successfully:', result.channel);
  } catch (error: unknown) {
    console.error('Error creating channel:', error);
  }
}

createChannel();