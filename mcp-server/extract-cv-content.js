import { spawn } from 'child_process';

async function extractCVContent() {
  console.log('Starting CV content extraction...');
  
  const server = spawn('node', ['index.js'], { stdio: ['pipe', 'pipe', 'pipe'] });
  await new Promise(resolve => setTimeout(resolve, 1000));

  try {
    // Extract first PDF
    console.log('Extracting CV-Themistoklis_Baltzakis (1).pdf...');
    const extractRequest1 = {
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: {
        name: 'extract_pdf_content',
        arguments: {
          pdfPath: 'D:\\\\Nuxt Projects\\\\llm-dev-agent\\\\s3-website-fresh\\\\CV-Themistoklis_Baltzakis (1).pdf'
        }
      }
    };

    server.stdin.write(JSON.stringify(extractRequest1) + '\n');

    let response1 = '';
    server.stdout.on('data', (data) => {
      response1 += data.toString();
    });

    await new Promise(resolve => setTimeout(resolve, 5000));
    console.log('PDF 1 Response:', response1);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    server.kill();
  }
}

extractCVContent();
