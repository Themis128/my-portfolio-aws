#!/usr/bin/env node

// MCP Server Test Script
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SERVER_DIR = path.join(__dirname, 'mcp-servers', 'documentation-server');

console.log('🧪 MCP Documentation Server - Test Suite');
console.log('========================================\n');

async function runTest(name, description, testFn) {
    console.log(`🔍 ${name}`);
    console.log(`   ${description}`);
    
    try {
        const result = await testFn();
        console.log(`   ${result.message}`);
        if (result.details) console.log(`   ℹ️  ${result.details}`);
        return result.success;
    } catch (error) {
        console.log(`   ❌ Error: ${error.message}`);
        return false;
    } finally {
        console.log('');
    }
}

async function testServerFiles() {
    const requiredFiles = ['dist/server.js', 'src/server.ts', 'package.json', '.env'];
    const missing = requiredFiles.filter(file => !fs.existsSync(path.join(SERVER_DIR, file)));
    
    return {
        success: missing.length === 0,
        message: missing.length === 0 ? '✅ All server files present' : `❌ Missing: ${missing.join(', ')}`
    };
}

async function testEnvironment() {
    const envPath = path.join(SERVER_DIR, '.env');
    if (!fs.existsSync(envPath)) {
        return { success: false, message: '❌ .env file not found' };
    }
    
    const envContent = fs.readFileSync(envPath, 'utf8');
    const hasGeminiKey = envContent.includes('GEMINI_API_KEY=') && 
                        envContent.split('GEMINI_API_KEY=')[1].trim().length > 0;
    
    return {
        success: hasGeminiKey,
        message: hasGeminiKey ? '✅ Gemini API key configured' : '❌ Gemini API key missing'
    };
}

async function testServerStartup() {
    return new Promise((resolve) => {
        const server = spawn('node', ['dist/server.js'], { 
            cwd: SERVER_DIR,
            stdio: ['pipe', 'pipe', 'pipe']
        });
        
        let stderr = '';
        server.stderr.on('data', (data) => stderr += data.toString());
        
        setTimeout(() => {
            server.kill();
            const success = stderr.includes('Gemini AI search tool enabled');
            resolve({
                success,
                message: success ? '✅ Server starts with Gemini AI enabled' : '❌ Server startup failed',
                details: success ? undefined : `Output: ${stderr.substring(0, 100)}...`
            });
        }, 2000);
    });
}

async function main() {
    console.log('Running comprehensive MCP server tests...\n');
    
    const tests = [
        { name: 'Server Files', desc: 'Check all required files exist', fn: testServerFiles },
        { name: 'Environment Config', desc: 'Verify .env and API keys', fn: testEnvironment },
        { name: 'Server Startup', desc: 'Test server initialization', fn: testServerStartup }
    ];
    
    let passed = 0;
    for (const test of tests) {
        const success = await runTest(test.name, test.desc, test.fn);
        if (success) passed++;
    }
    
    console.log('📊 RESULTS SUMMARY');
    console.log('==================');
    console.log(`✅ Passed: ${passed}/${tests.length}`);
    
    if (passed === tests.length) {
        console.log('\n🎉 ALL TESTS PASSED!');
        console.log('🚀 MCP Server is ready for MCP Inspector!');
        console.log('\n🌐 Open: http://localhost:6274/');
        console.log('⚙️  Configure with:');
        console.log('   Transport: STDIO');
        console.log('   Command: node');
        console.log('   Arguments: dist/server.js');
        console.log('   Working Directory: /home/tbaltzakis/my-portfolio-aws/mcp-servers/documentation-server');
        console.log('   Environment: GEMINI_API_KEY=gen-lang-client-0524292946');
        console.log('\n🔗 Click "Connect" and test the 10 available tools!');
    } else {
        console.log('\n⚠️  Some tests failed. Check output above.');
    }
}

main().catch(console.error);
