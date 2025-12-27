import http from 'http';

const testData = JSON.stringify({
  name: 'Test User',
  email: 'test@example.com',
  message: 'Test message from local development'
});

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/dev/contact',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(testData),
  },
};

console.log('🧪 Testing Serverless Offline Endpoint...');
console.log('📤 Sending request to http://localhost:3001/dev/contact');

const req = http.request(options, (res) => {
  console.log(`📥 Status: ${res.statusCode}`);
  console.log(`📥 Headers:`, res.headers);

  res.setEncoding('utf8');
  let body = '';
  res.on('data', (chunk) => {
    body += chunk;
  });
  res.on('end', () => {
    try {
      const data = JSON.parse(body);
      console.log('📥 Response:', data);
      if (data.success) {
        console.log('✅ Test PASSED - Local mode working!');
      } else {
        console.log('❌ Test FAILED - Check response');
      }
    } catch {
      console.log('📥 Raw Response:', body);
    }
  });
});

req.on('error', () => {
  console.error('❌ Request failed');
});

req.write(testData);
req.end();