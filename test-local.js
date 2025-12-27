#!/usr/bin/env node

// Test script for local development setup
const http = require('http');

function makeRequest(url, data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);

    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const result = JSON.parse(body);
          resolve({ statusCode: res.statusCode, body: result });
        } catch (e) {
          resolve({ statusCode: res.statusCode, body });
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(postData);
    req.end();
  });
}

async function testContactForm() {
  console.log('🧪 Testing Contact Form with Serverless Offline\n');

  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    message: 'This is a test message from the local development environment.'
  };

  try {
    console.log('📤 Sending test request to Next.js API route...');
    const response = await makeRequest('http://localhost:3000/api/contact', testData);

    console.log('📥 Next.js API Response:', response);

    if (response.body && response.body.success) {
      console.log('✅ Contact form test successful!');
    } else {
      console.log('❌ Contact form test failed:', response.body?.error || 'Unknown error');
    }
  } catch (error) {
    console.log('❌ Error testing contact form:', error.message);
    console.log('\n💡 Make sure both servers are running:');
    console.log('   - Next.js: npm run dev (http://localhost:3000)');
    console.log('   - Serverless Offline: npx serverless offline (http://localhost:3001)');
  }
}

// Test direct serverless endpoint
async function testServerlessDirect() {
  console.log('\n🔧 Testing Serverless Offline directly...\n');

  const testData = {
    name: 'Direct Test User',
    email: 'direct@example.com',
    message: 'Direct test to serverless offline.'
  };

  try {
    console.log('📤 Sending direct request to serverless offline...');
    const response = await makeRequest('http://localhost:3001/contact', testData);

    console.log('📥 Serverless Direct Response:', response);
  } catch (error) {
    console.log('❌ Error testing serverless directly:', error.message);
  }
}

async function main() {
  await testContactForm();
  await testServerlessDirect();
}

main().catch(console.error);