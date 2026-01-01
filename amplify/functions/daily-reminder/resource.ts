import { defineFunction } from '@aws-amplify/backend';

/**
 * Daily Reminder Scheduled Function
 *
 * This function demonstrates complex scheduling with multiple intervals:
 * - Daily reminders at specific times
 * - Using both natural language and cron expressions
 * - Multiple schedule entries
 */
export const dailyReminder = defineFunction({
  name: 'daily-reminder',

  // Entry point
  entry: './handler.ts',

  // Complex schedule with multiple intervals
  schedule: [
    // Every day at 9 AM (cron expression)
    '0 9 * * ? *',
    // Every day at 6 PM (cron expression)
    '0 18 * * ? *',
    // Every 2 hours during business hours (natural language)
    'every 2h',
    // Every weekday at 12 PM (cron expression for Monday-Friday)
    '0 12 ? * 2-6 *'
  ],

  // Function configuration
  timeoutSeconds: 60,
  memoryMB: 256,
  runtime: 20,

  // Environment variables
  environment: {
    REMINDER_TYPE: 'daily',
    TIMEZONE: 'UTC',
    BUSINESS_HOURS_START: '09:00',
    BUSINESS_HOURS_END: '18:00'
  },

  // Resource group
  resourceGroupName: 'scheduled-functions'
});