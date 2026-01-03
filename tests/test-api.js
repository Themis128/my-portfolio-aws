async function testAPI() {
  try {
    console.log('Testing API endpoint with fetch...');
    const response = await fetch('http://localhost:3002/api/dashboard/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(10000),
    });

    console.log(`Status: ${response.status}`);
    console.log(`Headers:`, Object.fromEntries(response.headers.entries()));

    const data = await response.text();
    try {
      const jsonData = JSON.parse(data);
      console.log('Response:', JSON.stringify(jsonData, null, 2));
    } catch (e) {
      console.log('Raw response:', data);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAPI();
