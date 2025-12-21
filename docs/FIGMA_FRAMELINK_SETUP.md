# Framelink MCP Server Setup Guide

This guide explains how to set up and use the Framelink MCP server as an alternative to the previous Figma MCP server.

## Why Framelink?

**Framelink MCP for Figma** is a more actively maintained and robust solution:

- **12.3k stars** on GitHub vs 1.2k for the previous server
- **Recent updates**: Last updated 3 months ago
- **Better documentation**: Comprehensive setup and usage guides
- **Cursor integration**: Specifically designed for AI coding assistants
- **Active development**: Regular updates and bug fixes

## Step 1: Install Framelink MCP Server

```bash
# Install globally
npm install -g figma-developer-mcp

# Or install locally
npm install figma-developer-mcp
```

## Step 2: Configure MCP Server

### Option A: Using API Key (Recommended)

1. **Get Figma API Key**:
   - Go to Figma → Settings → Account → Personal Access Tokens
   - Create new token with "Read access to files" permission
   - Copy the generated token

2. **Update `mcp-servers.json`**:

   ```json
   {
     "Framelink MCP for Figma": {
       "command": "npx",
       "args": ["-y", "figma-developer-mcp", "--figma-api-key=YOUR_API_KEY"],
       "disabled": false,
       "autoApprove": ["figma_get_file", "figma_list_components"],
       "env": {}
     }
   }
   ```

3. **Replace `YOUR_API_KEY`** with your actual Figma API key

### Option B: Using Environment Variables

1. **Set environment variable**:

   ```bash
   export FIGMA_API_KEY="your_api_key_here"
   ```

2. **Update `mcp-servers.json`**:
   ```json
   {
     "Framelink MCP for Figma": {
       "command": "npx",
       "args": ["-y", "figma-developer-mcp", "--stdio"],
       "disabled": false,
       "autoApprove": ["figma_get_file", "figma_list_components"],
       "env": {}
     }
   }
   ```

## Step 3: Restart MCP Client

1. **Restart your MCP client** (Claude Desktop, VS Code, etc.)
2. **Verify connection**: The Framelink server should appear in connected servers

## Available Tools

Once connected, you'll have access to these Figma MCP tools:

### `figma_list_components`

Lists all components in your Figma file

```javascript
// Example usage
{
  "file_url": "https://www.figma.com/design/9DPzMHAEGmxNKf8wQ77ktn/AWS-Amplify-UI-Kit--Community---Copy-?node-id=2653-2886&p=f&t=FWbjFxTfItL1AvBM-0"
}
```

### `figma_get_file`

Retrieves detailed information about a specific Figma file

```javascript
// Example usage
{
  "file_key": "your_file_key",
  "node_id": "2653-2886"
}
```

## Step 4: Design Components

### Using Figma Desktop + Framelink MCP

1. **Open your Figma file** in Figma Desktop
2. **Go to "My Components" page**
3. **Design your components** using Amplify primitives
4. **Add variants** for different states (hover, active, disabled)

### Using MCP Commands

1. **List existing components**:

   ```bash
   # Use MCP tool to list components
   figma_list_components
   ```

2. **Get component details**:
   ```bash
   # Use MCP tool to get specific component
   figma_get_file
   ```

## Step 5: Connect to Amplify Studio

1. **Open AWS Console** → **Amplify** → **Your Project**
2. **Go to "UI Library" section**
3. **Click "Link Figma file"**
4. **Paste your Figma file URL**:
   ```
   https://www.figma.com/design/9DPzMHAEGmxNKf8wQ77ktn/AWS-Amplify-UI-Kit--Community---Copy-?node-id=2653-2886&p=f&t=FWbjFxTfItL1AvBM-0
   ```
5. **Authenticate with Figma** when prompted
6. **Sync components** from Figma to Amplify Studio

## Step 6: Generate Code

```bash
# Generate UI components from Amplify Studio
npx ampx generate
```

## Troubleshooting

### Common Issues

1. **Connection Problems**:
   - Ensure Figma Desktop is running
   - Check that API key is valid and has proper permissions
   - Verify MCP server is not disabled

2. **Token Issues**:
   - Generate new API key if expired
   - Ensure key has read access to files
   - Check that key is correctly copied

3. **MCP Server Not Found**:
   - Restart MCP client
   - Check `mcp-servers.json` syntax
   - Verify server is not disabled

### Advantages of Framelink

- **Better Performance**: Optimized for AI workflows
- **Cursor Integration**: Designed specifically for AI coding assistants
- **Active Development**: Regular updates and improvements
- **Comprehensive Documentation**: Detailed setup and usage guides
- **Error Handling**: Better error reporting and recovery

## Migration from Previous Server

If you were using the previous `@sethdouglasford/mcp-figma` server:

1. **Stop the old server**:

   ```bash
   pkill -f "mcp-figma"
   ```

2. **Install Framelink**:

   ```bash
   npm install -g figma-developer-mcp
   ```

3. **Update configuration**:
   - Replace the old server configuration with Framelink
   - Update your API key

## Security Notes

- **Keep API keys secure**: Never share your Figma API keys
- **Limited permissions**: Use read-only access when possible
- **Regular rotation**: Update API keys every 30 days
- **Environment variables**: Store keys in env files, not in code

## Next Steps

1. **Install Framelink MCP server**
2. **Configure with your Figma API key**
3. **Restart MCP client**
4. **Design components** in Figma Desktop
5. **Connect to Amplify Studio**
6. **Generate code** with `npx ampx generate`

## Resources

- **Framelink GitHub**: https://github.com/Framelink/figma-developer-mcp
- **Documentation**: https://github.com/Framelink/figma-developer-mcp/blob/main/README.md
- **Issues**: https://github.com/Framelink/figma-developer-mcp/issues
- **Discord Community**: https://discord.gg/framelink

Framelink provides a more robust and actively maintained Figma MCP server that should resolve the connection issues you experienced with the previous server.
