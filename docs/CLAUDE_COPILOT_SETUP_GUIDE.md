# Claude Desktop + GitHub Copilot API Setup Guide

## 🔑 Required API Keys

### 1. Claude API Key (Anthropic)

**Steps to get your Claude API key:**

1. **Visit Anthropic Console:**
   - Go to https://console.anthropic.com/
   - Sign in with your Anthropic account

2. **Create API Key:**
   - Click on "API Keys" in the left sidebar
   - Click "Create Key"
   - Give it a descriptive name (e.g., "Claude Desktop Integration")
   - Copy the generated key immediately (you won't see it again!)

3. **Security Notes:**
   - Store your API key securely
   - Never commit it to version control
   - Rotate keys regularly
   - Use environment variables, not hardcoded values

**Pricing:** Claude API has usage-based pricing. Check https://www.anthropic.com/pricing for current rates.

---

### 2. GitHub Personal Access Token

**Steps to create a GitHub token:**

1. **Go to GitHub Settings:**
   - Visit https://github.com/settings/tokens
   - Click "Generate new token (classic)"

2. **Configure Token:**
   - **Token name:** "Claude Copilot Integration"
   - **Expiration:** Set to your preference (recommended: 30 days for security)
   - **Scopes:** Select these permissions:
     - ✅ `read:user` - Read user profile data
     - ✅ `read:org` - Read org membership (if using org repos)
     - ✅ `repo` - Full access to private repositories
     - ✅ `workflow` - Read workflow permissions

3. **Generate and Copy:**
   - Click "Generate token"
   - Copy the token immediately (GitHub shows it only once!)

**Note:** GitHub Copilot API access may require special permissions. If you don't have Copilot access, some features may be limited.

---

## 🔧 Configuration Steps

### Step 1: Set Environment Variables

Edit your `.env.claude-copilot` file:

```bash
# Replace with your actual keys
CLAUDE_API_KEY=sk-ant-api03-your-actual-claude-key-here
GITHUB_TOKEN=github_pat_your-actual-github-token-here
```

### Step 2: Test API Keys

Run these commands to verify your keys work:

```bash
# Test Claude API
curl -X POST https://api.anthropic.com/v1/messages \
  -H "Content-Type: application/json" \
  -H "x-api-key: $CLAUDE_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
    "model": "claude-3-haiku-20240307",
    "max_tokens": 100,
    "messages": [{"role": "user", "content": "Hello!"}]
  }'

# Test GitHub API
curl -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/user
```

### Step 3: Start MCP Servers

```bash
# Make sure you're in the project root
cd /home/tbaltzakis/my-portfolio-aws

# Start the integration servers
./start-all-servers.sh
```

---

## 🧪 Testing the Integration

### Test 1: Basic Server Connection

```bash
# Check if servers are running
ps aux | grep "node.*claude"
```

### Test 2: MCP Tool Availability

Use Claude Desktop to test these tools:

1. **generate_code_with_claude**
   ```
   Generate a simple React component for a button
   ```

2. **create_development_agent**
   ```
   Create a frontend development agent to help with React components
   ```

3. **copilot_suggestions_enhanced**
   ```
   Get suggestions for improving this JavaScript function
   ```

### Test 3: VS Code Integration

1. Open VS Code with GitHub Copilot enabled
2. Use the MCP servers through Claude Desktop
3. Test code generation and suggestions

---

## 🔍 Troubleshooting

### Common Issues:

**1. "API key not found" error:**
- Check your `.env.claude-copilot` file exists
- Verify environment variables are loaded
- Restart the MCP servers after changing keys

**2. "Invalid API key" error:**
- Double-check you copied the full key
- Ensure no extra spaces or characters
- Verify the key hasn't expired

**3. "Rate limit exceeded":**
- Claude API has rate limits based on your plan
- GitHub API has rate limits (5000 requests/hour for authenticated users)
- Implement exponential backoff in your code

**4. "MCP server not responding":**
- Check if servers are running: `ps aux | grep node`
- Verify port 3000 is not blocked
- Check server logs for errors

**5. "Copilot features not working":**
- Ensure GitHub token has correct scopes
- Verify you have GitHub Copilot access
- Check if Copilot API is available in your region

### Debug Mode:

Enable debug logging by setting:
```bash
MCP_DEBUG=true
VERBOSE_LOGGING=true
```

---

## 📊 Monitoring Usage

### Claude API Usage:
- Check usage at: https://console.anthropic.com/
- Monitor costs and set budget alerts

### GitHub API Usage:
- Check rate limits: `curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/rate_limit`

### MCP Server Logs:
```bash
# View server logs
tail -f ./logs/claude-copilot-integration.log
```

---

## 🔒 Security Best Practices

1. **Never commit API keys** to version control
2. **Use environment variables** instead of hardcoded values
3. **Rotate keys regularly** (every 30-90 days)
4. **Limit API key permissions** to minimum required
5. **Monitor API usage** for unusual activity
6. **Use HTTPS** for all API communications
7. **Implement rate limiting** in your applications

---

## 📞 Support

If you encounter issues:

1. Check this troubleshooting guide
2. Review server logs for error messages
3. Test API keys individually
4. Verify network connectivity
5. Check GitHub status: https://www.githubstatus.com/
6. Check Anthropic status: https://status.anthropic.com/

For additional help, refer to:
- Claude API Documentation: https://docs.anthropic.com/
- GitHub API Documentation: https://docs.github.com/en/rest
- MCP Protocol Documentation: https://modelcontextprotocol.io/