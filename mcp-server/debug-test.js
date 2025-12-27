import { spawn } from 'child_process';

const server = spawn('node', ['index.js'], {
  cwd: process.cwd(),
  stdio: ['pipe', 'pipe', 'inherit']
});

let started = false;
server.stdout.on('data', (data) => {
  const msg = data.toString();
  console.log('SERVER:', msg.trim());
  if (msg.includes('started') && !started) {
    started = true;
    console.log('CLIENT: Sending request...');
    const request = JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: {
        name: 'list_files',
        arguments: { directory: 'D:\\test\\path' }
      }
    }) + '\n';
    console.log('CLIENT: Request:', request.trim());
    server.stdin.write(request);
  }
});

setTimeout(() => {
  console.log('Timeout reached, killing server');
  server.kill();
}, 12000);