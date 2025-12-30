export const createAnalytics = /* GraphQL */ `
  mutation CreateAnalytics(
    $input: CreateAnalyticsInput!
    $condition: ModelAnalyticsConditionInput
  ) {
    createAnalytics(input: $input, condition: $condition) {
      id
      eventType
      page
      userAgent
      referrer
      metadata
      createdAt
    }
  }
`;