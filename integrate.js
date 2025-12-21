import { spawn } from 'child_process';
import fs from 'fs';
import { dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to run Playwright tests and capture output
async function runTests() {
  return new Promise((resolve, reject) => {
    const testProcess = spawn('npx', ['playwright', 'test'], {
      cwd: __dirname,
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    let stdout = '';
    let stderr = '';

    testProcess.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    testProcess.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    testProcess.on('close', (code) => {
      resolve({ code, stdout, stderr });
    });

    testProcess.on('error', reject);
  });
}

// Function to call MCP server tool
async function callMCPTool(errorMessage, codeSnippet) {
  return new Promise((resolve, reject) => {
    const serverProcess = spawn('node', ['build/index.js'], {
      cwd: __dirname,
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    const request = {
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: {
        name: 'fix_code',
        arguments: {
          error_message: errorMessage,
          code_snippet: codeSnippet,
        },
      },
    };

    let responseData = '';

    serverProcess.stdout.on('data', (data) => {
      responseData += data.toString();
    });

    serverProcess.stderr.on('data', (data) => {
      console.error('MCP Server stderr:', data.toString());
    });

    serverProcess.on('close', (code) => {
      try {
        const response = JSON.parse(responseData.trim());
        if (response.error) {
          reject(new Error(response.error.message));
        } else {
          resolve(response.result);
        }
      } catch (e) {
        reject(e);
      }
    });

    serverProcess.on('error', reject);

    // Send the request after a short delay to let server start
    setTimeout(() => {
      serverProcess.stdin.write(JSON.stringify(request) + '\n');
      serverProcess.stdin.end();
    }, 1000);
  });
}

// Function to parse test output for failures
function parseFailures(output) {
  // Simple parsing: look for "✘" and extract error
  const lines = output.split('\n');
  const failures = [];
  let inError = false;
  let errorMessage = '';
  let testName = '';

  for (const line of lines) {
    if (line.includes('✘')) {
      inError = true;
      errorMessage = '';
      // Extract test name, e.g., tests/example.spec.ts:8:1 › failing test
      const match = line.match(/› (.*)$/);
      if (match) testName = match[1];
    } else if (inError && line.includes('Error:')) {
      errorMessage += line + '\n';
    } else if (inError && line.includes('at ')) {
      // Extract file and line
      const match = line.match(/at (.+):(\d+):(\d+)/);
      if (match) {
        const filePath = relative(__dirname, match[1]);
        const lineNum = parseInt(match[2]);
        // Read the test file and extract the test code
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const fileLines = fileContent.split('\n');
        // Find the test function starting from lineNum backwards
        let startLine = lineNum - 1;
        while (startLine > 0 && !fileLines[startLine].includes(`test('${testName}'`)) {
          startLine--;
        }
        let endLine = startLine + 1;
        let braceCount = 0;
        for (let i = startLine; i < fileLines.length; i++) {
          const line = fileLines[i];
          braceCount += (line.match(/{/g) || []).length;
          braceCount -= (line.match(/}/g) || []).length;
          endLine = i;
          if (braceCount === 0 && line.includes('});')) break;
        }
        const codeSnippet = fileLines.slice(startLine, endLine + 1).join('\n');
        failures.push({
          errorMessage: errorMessage.trim(),
          codeSnippet,
          filePath,
          startLine,
          endLine,
        });
      }
      inError = false;
    }
  }

  return failures;
}

// Main function
async function main() {
  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    console.log(`Running Playwright tests... (attempt ${attempts + 1})`);
    const { code, stdout, stderr } = await runTests();
    const output = stdout + stderr;

    console.log('Test output:');
    console.log(output);

    if (code === 0) {
      console.log('All tests passed!');
      break;
    } else {
      console.log('Tests failed. Analyzing failures...');
      const failures = parseFailures(output);

      if (failures.length === 0) {
        console.log('No failures could be parsed.');
        break;
      }

      for (const failure of failures) {
        console.log('Calling MCP tool to fix code...');
        try {
          const result = await callMCPTool(failure.errorMessage, failure.codeSnippet);
          const text = result.content[0].text;
          const fixedCodeMatch = text.match(/Fixed code:\n([\s\S]*)/);
          if (fixedCodeMatch) {
            const fixedCode = fixedCodeMatch[1].trim();
            console.log('Fixed code:');
            console.log(fixedCode);
            // Apply the fix to the test file
            let fileContent = fs.readFileSync(failure.filePath, 'utf-8');
            // Replace the failing test code with fixed
            fileContent = fileContent.replace(failure.codeSnippet, fixedCode);
            fs.writeFileSync(failure.filePath, fileContent);
            console.log('Applied fix to test file.');
          }
        } catch (error) {
          console.error('Error calling MCP tool:', error.message);
        }
      }
      attempts++;
      if (attempts < maxAttempts) {
        console.log('Re-running tests after fixes...');
      }
    }
  }

  if (attempts === maxAttempts) {
    console.log('Max attempts reached. Some tests may still be failing.');
  }
}

main().catch(console.error);
