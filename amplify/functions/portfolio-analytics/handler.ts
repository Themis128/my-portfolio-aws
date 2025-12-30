interface AnalyticsEvent {
  arguments?: {
    eventType: string;
    page?: string;
    userAgent?: string;
    referrer?: string;
    metadata?: Record<string, any>;
  };
}

export const handler = async (event: AnalyticsEvent) => {
  const { eventType, page, userAgent, referrer, metadata } = event.arguments || {};

  if (!eventType) {
    console.error('Missing eventType');
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'eventType is required' }),
    };
  }

  try {
    console.log('Analytics event received:', {
      eventType,
      page,
      userAgent,
      referrer,
      metadata,
      timestamp: new Date().toISOString(),
    });

    // Here you could:
    // 1. Store in DynamoDB
    // 2. Send to analytics service (Google Analytics, Mixpanel, etc.)
    // 3. Process and aggregate data
    // 4. Send notifications for important events

    // For now, just log the event
    console.log(`Portfolio analytics: ${eventType} on ${page || 'unknown page'}`);

    return `Analytics event "${eventType}" recorded successfully`;

  } catch (error) {
    console.error('Error processing analytics event:', error);
    throw new Error('Failed to process analytics event');
  }
};