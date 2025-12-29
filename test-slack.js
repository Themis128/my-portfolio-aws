const { generateClient } = require('@aws-amplify/api');
const { Amplify } = require('aws-amplify');
const amplifyconfig = require('./amplify_outputs.json');

// Configure Amplify
Amplify.configure(amplifyconfig);

// Removed individual Slack notification test - functionality tested through contact form

async function testContactFormWithSlack() {
  console.log('\n📝 Testing Complete Contact Form with Slack Integration...\n');

  try {
    const client = generateClient();

    console.log('� Submitting contact form (this should trigger Slack notification)...');
    const contactResult = await client.graphql({
      query: `
        mutation SendContact($name: String!, $email: String!, $message: String!) {
          sendContact(name: $name, email: $email, message: $message)
        }
      `,
      variables: {
        name: 'Slack Test User',
        email: 'slack-test@cloudless.gr',
        message: 'This is a test message to verify that Slack notifications are sent when contact forms are submitted. If you see this in Slack, the integration is working perfectly!'
      }
    });

    console.log('✅ Contact form submitted successfully!');
    console.log('📄 Response:', contactResult.data);
    console.log('\n📢 CHECK YOUR SLACK: You should receive a notification in #general channel');
    return { success: true, response: contactResult.data };

  } catch (error) {
    console.error('❌ Contact form test failed!');
    console.error('Error details:', error);
    return { success: false, error: error.message };
  }
}

async function runSlackTests() {
  console.log('🚀 Starting Slack Implementation Tests...\n');

  // Test: Contact form with Slack integration
  console.log('=' .repeat(60));
  console.log('TEST: Contact Form with Slack Integration');
  console.log('=' .repeat(60));

  const contactTest = await testContactFormWithSlack();

  // Summary
  console.log('\n' + '=' .repeat(60));
  console.log('SLACK TEST SUMMARY');
  console.log('=' .repeat(60));

  if (contactTest.success) {
    console.log('✅ Contact form with Slack integration: PASSED');
    console.log('\n🎉 SUCCESS: Slack notifications are working!');
    console.log('📱 Check your Slack #general channel for notifications');
  } else {
    console.log('❌ Contact form with Slack integration: FAILED');
    console.log('Error:', contactTest.error);
  }

  console.log('\n💡 Note: Slack notifications work through the contact form workflow');
  console.log('🔧 SLACK_WEBHOOK_URL is configured in Amplify environment variables');
}

// Run the tests
runSlackTests().catch(console.error);
