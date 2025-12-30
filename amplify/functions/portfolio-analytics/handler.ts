import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';

// Types for better TypeScript support
interface AnalyticsEvent {
  arguments?: {
    eventType: string;
    page?: string;
    userAgent?: string;
    referrer?: string;
    metadata?: Record<string, unknown>;
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
  if (!process.env.AWS_REGION) {
    throw new Error('AWS_REGION environment variable is required');
  }
};

// Input validation
const validateAnalyticsInput = (eventType: string): ValidationResult => {
  if (!eventType?.trim()) {
    return { isValid: false, error: 'eventType is required' };
  }

  // Validate event type format
  const validEventTypes = [
    'page_view', 'contact_form_submit', 'project_view',
    'social_click', 'download', 'navigation_click',
    'button_click', 'form_interaction'
  ];

  if (!validEventTypes.includes(eventType)) {
    return { isValid: false, error: `Invalid eventType. Must be one of: ${validEventTypes.join(', ')}` };
  }

  return { isValid: true };
};

// Store analytics event in DynamoDB
const storeAnalyticsEvent = async (eventData: {
  eventType: string;
  page?: string;
  userAgent?: string;
  referrer?: string;
  metadata?: Record<string, unknown>;
  timestamp: string;
  sessionId: string;
  ipAddress?: string;
}): Promise<string> => {
  console.log('Storing analytics event', {
    eventType: eventData.eventType,
    page: eventData.page,
    timestamp: eventData.timestamp
  });

  const dynamoClient = new DynamoDBClient({ region: process.env.AWS_REGION });

  // Generate unique ID for the event
  const eventId = `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const item = {
    id: eventId,
    eventType: eventData.eventType,
    page: eventData.page || 'unknown',
    userAgent: eventData.userAgent,
    referrer: eventData.referrer,
    metadata: eventData.metadata ? JSON.stringify(eventData.metadata) : null,
    timestamp: eventData.timestamp,
    sessionId: eventData.sessionId,
    ipAddress: eventData.ipAddress,
    // Add partition key for time-based queries
    date: eventData.timestamp.split('T')[0], // YYYY-MM-DD format
    // Add sort key for efficient queries
    eventTimestamp: eventData.timestamp,
  };

  const putCommand = new PutItemCommand({
    TableName: process.env.ANALYTICS_TABLE_NAME || 'PortfolioAnalytics',
    Item: marshall(item, {
      removeUndefinedValues: true,
      convertEmptyValues: true,
    }),
  });

  await dynamoClient.send(putCommand);

  console.log('Analytics event stored successfully', {
    eventId,
    eventType: eventData.eventType,
    timestamp: eventData.timestamp
  });

  return eventId;
};

// Process special events that need notifications
const processSpecialEvents = async (eventType: string, metadata?: Record<string, unknown>): Promise<void> => {
  // Handle events that might need notifications
  if (eventType === 'contact_form_submit') {
    console.log('Contact form submission detected - this should trigger notifications');
    // Could trigger additional processing here
  }

  if (eventType === 'download' && metadata?.fileName) {
    console.log('File download detected', { fileName: metadata.fileName });
    // Could track popular downloads
  }
};

// Generate session ID from request context
const generateSessionId = (): string => {
  // In a real implementation, this would come from cookies or headers
  // For now, generate a simple session ID
  return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Main handler
export const handler = async (event: AnalyticsEvent): Promise<string | LambdaResponse> => {
  const startTime = Date.now();

  try {
    // Validate environment on cold start
    validateEnvironment();

    console.log('Analytics handler invoked', {
      hasArguments: !!event.arguments,
      timestamp: new Date().toISOString()
    });

    const { eventType, page, userAgent, referrer, metadata } = event.arguments || {};

    // Validate input
    const validation = validateAnalyticsInput(eventType);
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

    // Prepare event data
    const eventData = {
      eventType: eventType.trim(),
      page: page?.trim(),
      userAgent: userAgent?.trim(),
      referrer: referrer?.trim(),
      metadata,
      timestamp: new Date().toISOString(),
      sessionId: generateSessionId(),
      ipAddress: event.requestContext?.identity?.sourceIp, // If available from API Gateway
    };

    // Store the event
    const eventId = await storeAnalyticsEvent(eventData);

    // Process special events
    await processSpecialEvents(eventType, metadata);

    const duration = Date.now() - startTime;
    console.log('Analytics handler completed successfully', {
      eventId,
      eventType,
      duration: `${duration}ms`
    });

    return `Analytics event "${eventType}" recorded successfully (ID: ${eventId})`;

  } catch (error) {
    const duration = Date.now() - startTime;

    console.error('Analytics handler failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString()
    });

    // Return structured error response
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to process analytics event',
        message: process.env.NODE_ENV === 'development'
          ? (error instanceof Error ? error.message : 'Unknown error')
          : 'An error occurred while processing your request',
        timestamp: new Date().toISOString(),
        requestId: process.env.AWS_REQUEST_ID || 'unknown'
      }),
      headers: {
        'Content-Type': 'application/json',
        'X-Amz-Error-Type': 'AnalyticsProcessingError'
      }
    };
  }
};
