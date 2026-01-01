import type { EventBridgeHandler } from 'aws-lambda';

/**
 * Daily Reminder Handler
 *
 * Scheduled function that runs at multiple intervals throughout the day.
 * Demonstrates handling different types of scheduled events.
 */
export const handler: EventBridgeHandler<'Scheduled Event', null, void> = async (event) => {
  console.log('Daily Reminder Function Triggered');
  console.log('Event:', JSON.stringify(event, null, 2));

  try {
    const now = new Date();
    const currentHour = now.getUTCHours();
    const currentMinute = now.getUTCMinutes();

    console.log(`Reminder triggered at: ${now.toISOString()} (${currentHour}:${currentMinute.toString().padStart(2, '0')} UTC)`);

    // Determine reminder type based on time
    let reminderType = 'general';
    let message = 'Time for a break!';

    if (currentHour === 9 && currentMinute === 0) {
      reminderType = 'morning';
      message = 'Good morning! Start your day with a positive mindset.';
    } else if (currentHour === 12 && currentMinute === 0) {
      reminderType = 'lunch';
      message = 'Lunch time! Take a break and recharge.';
    } else if (currentHour === 18 && currentMinute === 0) {
      reminderType = 'evening';
      message = 'Evening reminder: Wrap up your day and plan for tomorrow.';
    } else if (currentHour >= 9 && currentHour < 18 && currentHour % 2 === 0 && currentMinute === 0) {
      reminderType = 'business-hours';
      message = 'Business hours reminder: Stay focused and productive!';
    }

    // TODO: Implement your reminder logic here
    // Examples:
    // - Send notifications to users
    // - Update dashboard with reminders
    // - Send emails or messages
    // - Log activities
    // - Trigger other functions

    const reminderData = {
      timestamp: now.toISOString(),
      type: reminderType,
      message: message,
      timezone: process.env.TIMEZONE || 'UTC',
      businessHours: {
        start: process.env.BUSINESS_HOURS_START || '09:00',
        end: process.env.BUSINESS_HOURS_END || '18:00'
      },
      eventSource: event.source,
      eventDetailType: event['detail-type']
    };

    console.log('Reminder processed:', JSON.stringify(reminderData, null, 2));

    // Simulate processing (e.g., sending notifications)
    await new Promise(resolve => setTimeout(resolve, 500));

    console.log(`✅ ${reminderType.toUpperCase()} reminder completed successfully`);

  } catch (error) {
    console.error('Error processing daily reminder:', error);
    throw error;
  }
};