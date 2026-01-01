# Scheduled Functions

This directory contains AWS Lambda functions that are scheduled to run automatically using Amazon EventBridge rules. These functions demonstrate various scheduling patterns and use cases for automated background processing.

## Functions

### Weekly Digest (`weekly-digest`)

- **Schedule**: Every week (Sundays at midnight)
- **Purpose**: Generates weekly analytics and activity summaries
- **Configuration**:
  - Timeout: 300 seconds (5 minutes)
  - Memory: 512 MB
  - Runtime: Node.js 20
- **Use Cases**:
  - Generate weekly performance reports
  - Send summary emails to stakeholders
  - Clean up old data and logs
  - Process accumulated analytics data

### Daily Reminder (`daily-reminder`)

- **Schedule**: Multiple intervals
  - Every day at 9:00 AM UTC (morning reminder)
  - Every day at 6:00 PM UTC (evening reminder)
  - Every 2 hours during business hours (productivity check)
  - Every weekday at 12:00 PM UTC (lunch reminder)
- **Purpose**: Sends daily reminders and notifications
- **Configuration**:
  - Timeout: 60 seconds
  - Memory: 256 MB
  - Runtime: Node.js 20
- **Use Cases**:
  - Send daily status updates
  - Remind users of important tasks
  - Generate daily reports
  - Monitor system health

## Scheduling Options

### Natural Language

- `"every week"` - Every Sunday at midnight
- `"every day"` - Every day at midnight
- `"every month"` - First day of every month at midnight
- `"every 1h"` - Every hour
- `"every 30m"` - Every 30 minutes

### Cron Expressions

- `"0 9 * * ? *"` - Every day at 9:00 AM UTC
- `"0 18 * * ? *"` - Every day at 6:00 PM UTC
- `"0 12 ? * 2-6 *"` - Every weekday (Mon-Fri) at 12:00 PM UTC

## Testing Scheduled Functions

### Local Testing

```bash
# Test with sandbox
npx ampx sandbox

# The functions will be triggered according to their schedules
```

### Manual Testing

You can manually invoke scheduled functions for testing:

```typescript
import { handler } from './handler';

// Test event structure
const testEvent = {
  source: 'aws.events',
  'detail-type': 'Scheduled Event',
  time: new Date().toISOString(),
  detail: {},
};

await handler(testEvent, {} as any, () => {});
```

## EventBridge Integration

Scheduled functions are powered by Amazon EventBridge, which provides:

- **Reliable Scheduling**: Guaranteed execution within 60 seconds of schedule
- **Multiple Triggers**: Support for cron expressions and natural language
- **Event-Driven**: Functions receive structured EventBridge events
- **Monitoring**: Built-in metrics and logging through CloudWatch
- **Cost Effective**: Pay only for actual function execution time

### Event Structure

Scheduled functions receive EventBridge events with this structure:

```json
{
  "source": "aws.events",
  "detail-type": "Scheduled Event",
  "time": "2025-12-31T00:00:00.000Z",
  "detail": {}
}
```

## Best Practices

### Function Design

- **Idempotent Operations**: Design functions to be safe to run multiple times
- **Error Handling**: Implement comprehensive error handling and logging
- **Resource Limits**: Set appropriate timeouts and memory limits
- **Environment Variables**: Use environment variables for configuration

### Scheduling

- **Timezone Awareness**: Consider timezone implications for schedules
- **Business Hours**: Use appropriate schedules for business operations
- **Overlapping Schedules**: Avoid overlapping executions that could cause conflicts
- **Testing**: Test schedules thoroughly before production deployment

### Monitoring

- **CloudWatch Logs**: Monitor execution logs for errors and performance
- **Metrics**: Track invocation count, duration, and error rates
- **Alerts**: Set up alerts for failed executions
- **Cost Monitoring**: Monitor Lambda costs for scheduled functions

## Environment Variables

Both functions support environment variables for configuration:

- `DIGEST_TYPE` / `REMINDER_TYPE`: Type of operation
- `TIMEZONE`: Timezone for scheduling (default: UTC)
- `BUSINESS_HOURS_START/END`: Business hours configuration

## Adding New Scheduled Functions

1. Create a new directory under `amplify/functions/`
2. Create `resource.ts` with `defineFunction` and `schedule` property
3. Create `handler.ts` with `EventBridgeHandler` type
4. Import and add to `backend.ts`

Example:

````typescript
// resource.ts
export const myScheduledFunction = defineFunction({
  name: 'my-scheduled-function',
  schedule: 'every day', // or cron expression
  entry: './handler.ts'
});

// handler.ts
export const handler: EventBridgeHandler<'Scheduled Event', null, void> = async (event) => {
  // Your logic here
};
```

## Deployment & Environments

### Local Development
```bash
# Test functions locally
npx ampx sandbox

# Test scheduled functions specifically
pnpm run test:scheduled -- --all
```

### Production Deployment
```bash
# Deploy all backend resources including scheduled functions
npx ampx push

# Or use the deployment script
pnpm run deploy:amplify
```

### Environment Variables
Configure environment-specific variables in Amplify Console:

- **Development**: Test schedules with shorter intervals
- **Production**: Use production-appropriate schedules and endpoints
- **Secrets**: Store sensitive data using Amplify secrets management

## Troubleshooting

### Common Issues

**Functions not triggering**
- Check EventBridge rules in AWS Console
- Verify schedule expressions are valid
- Ensure function has necessary permissions

**Functions timing out**
- Increase timeout in function configuration
- Optimize function logic for performance
- Check for infinite loops or hanging operations

**Environment variables not available**
- Verify variables are set in Amplify Console
- Check function resource configuration
- Ensure proper environment variable names

### Logs & Debugging
- **CloudWatch Logs**: View execution logs and errors
- **EventBridge Console**: Check rule execution history
- **Lambda Console**: Monitor function performance metrics</content>
<parameter name="filePath">/home/tbaltzakis/my-portfolio-aws/amplify/functions/README.md
````
