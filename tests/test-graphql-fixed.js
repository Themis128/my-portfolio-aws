import { graphqlClient } from './lib/graphql-client.js';
import { listUsers } from './lib/graphql/dashboard.js';

async function testGraphQLClient() {
  try {
    console.log('Testing GraphQL client with fixed config...');
    const result = await graphqlClient.query(listUsers, { limit: 5 });
    console.log('✅ Success! Users:', result?.listUsers?.items?.length || 0);
    console.log('Sample user:', result?.listUsers?.items?.[0] || 'No users');
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testGraphQLClient();
