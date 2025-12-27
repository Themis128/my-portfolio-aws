import { spawn } from 'child_process';

async function testPDFExtraction() {
  console.log('🧪 Testing PDF extraction with newly added CV files...\n');

  const server = spawn('node', ['index.js'], {
    cwd: process.cwd(),
    stdio: ['pipe', 'pipe', 'pipe']
  });

  let serverReady = false;
  let buffer = '';

  return new Promise((resolve, reject) => {
    server.stdout.on('data', (data) => {
      buffer += data.toString();
      if (buffer.includes('D: Drive File Server started') && !serverReady) {
        serverReady = true;
        console.log('✅ MCP Server started');

        // Test first PDF
        const request1 = {
          jsonrpc: '2.0',
          id: 1,
          method: 'tools/call',
          params: {
            name: 'extract_pdf_content',
            arguments: {
              filePath: '/home/tbaltzakis/my-portfolio-aws/CV-Themistoklis_Baltzakis (1).pdf'
            }
          }
        };

        server.stdin.write(JSON.stringify(request1) + '\n');
      }
    });

    server.stdout.on('data', (data) => {
      if (serverReady) {
        try {
          const lines = data.toString().trim().split('\n');
          for (const line of lines) {
            if (line.trim()) {
              const response = JSON.parse(line);
              if (response.id === 1) {
                console.log('\n📄 PDF Extraction Test 1 (CV-Themistoklis_Baltzakis):');
                console.log('Raw response:', JSON.stringify(response, null, 2));
                if (response.result && response.result.content) {
                  const content = response.result.content[0].text;
                  console.log('✅ Successfully extracted content');
                  console.log(`📊 Content length: ${content.length} characters`);
                  console.log(`📝 Preview: ${content.substring(0, 200)}...`);
                } else if (response.error) {
                  console.log('❌ Error extracting PDF:', response.error.message);
                }

                // Test second PDF
                const request2 = {
                  jsonrpc: '2.0',
                  id: 2,
                  method: 'tools/call',
                  params: {
                    name: 'extract_pdf_content',
                    arguments: {
                      filePath: '/home/tbaltzakis/my-portfolio-aws/Themis_Baltzakis_CV_2025-08-19 (12).pdf'
                    }
                  }
                };

                server.stdin.write(JSON.stringify(request2) + '\n');
              } else if (response.id === 2) {
                console.log('\n📄 PDF Extraction Test 2 (Themis_Baltzakis_CV_2025-08-19):');
                if (response.result && response.result.content) {
                  const content = response.result.content[0].text;
                  console.log('✅ Successfully extracted content');
                  console.log(`📊 Content length: ${content.length} characters`);
                  console.log(`📝 Preview: ${content.substring(0, 200)}...`);
                } else if (response.error) {
                  console.log('❌ Error extracting PDF:', response.error.message);
                }

                console.log('\n🎉 PDF extraction testing complete!');
                server.kill();
                resolve();
              }
            }
          }
        } catch {
          // Ignore parsing errors for non-JSON output
        }
      }
    });

    server.stderr.on('data', (data) => {
      console.error('Server error:', data.toString());
    });

    server.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Server exited with code ${code}`));
      }
    });

    // Timeout after 10 seconds
    setTimeout(() => {
      server.kill();
      reject(new Error('Test timeout'));
    }, 10000);
  });
}

testPDFExtraction().catch(console.error);