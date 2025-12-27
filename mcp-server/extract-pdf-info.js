import { spawn } from 'child_process';
import fs from 'fs';

async function extractPDFInfo() {
  console.log('Starting PDF extraction process...');
  
  // Start the MCP server
  const server = spawn('node', ['index.js'], { 
    stdio: ['pipe', 'pipe', 'pipe']
  });

  // Wait for server to start
  await new Promise(resolve => setTimeout(resolve, 1000));

  try {
    // 1. List files in the directory
    console.log('1. Listing files in D:\\Nuxt Projects\\llm-dev-agent\\s3-website-fresh');
    
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

    // Collect the response
    let responseData = '';
    server.stdout.on('data', (data) => {
      responseData += data.toString();
    });

    // Wait for response
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('List files response:', responseData);

    // 2. Search for PDF files
    console.log('2. Searching for PDF files...');
    
    const searchRequest = {
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/call',
      params: {
        name: 'search_files',
        arguments: {
          directory: 'D:\\\\Nuxt Projects\\\\llm-dev-agent\\\\s3-website-fresh',
          pattern: '*.pdf'
        }
      }
    };

    server.stdin.write(JSON.stringify(searchRequest) + '\n');

    // Wait for response
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Search PDF response:', responseData);

    // 3. Extract content from each PDF found
    // This would need to be implemented based on the search results
    
  } catch (error) {
    console.error('Error during PDF extraction:', error);
  } finally {
    // Clean up
    server.kill();
    console.log('PDF extraction process completed.');
  }
}

extractPDFInfo().catch(console.error);
