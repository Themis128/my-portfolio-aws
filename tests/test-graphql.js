import { graphqlClient } from './lib/graphql-client.ts';
import { listUsers } from './lib/graphql/dashboard.ts';

async function testGraphQLClient() {
  try {
    console.log('Testing GraphQL client...');
    const result = await graphqlClient.query(listUsers, { limit: 5 });
    console.log('Success:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

testGraphQLClient();
