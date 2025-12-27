import { spawn } from 'child_process';

async function communicateWithServer() {
  console.log('Communicating with MCP server...');
  
  // Use the already running server
  const server = spawn('node', ['index.js'], { 
    stdio: ['pipe', 'pipe', 'pipe']
  });

  // Wait for server to start
  await new Promise(resolve => setTimeout(resolve, 1000));

  try {
    // 1. List files
    console.log('Listing files...');
    const listRequest = {
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: {
        name: 'list_files',
        arguments: {
          directory: 'D:\\\\Nuxt Projects\\\\llm-dev-agent\\\\s3-website-fresh'
        }
      }
    };

    server.stdin.write(JSON.stringify(listRequest) + '\n');

    // Collect response
    let response = '';
    server.stdout.on('data', (data) => {
      response += data.toString();
    });

    // Wait for response
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    console.log('Server response:', response);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    server.kill();
  }
}

communicateWithServer();
