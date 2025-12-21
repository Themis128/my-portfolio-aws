# Figma MCP Server Setup Guide

This guide explains how to set up and use the Figma MCP server for direct Figma integration.

## Prerequisites

✅ **Already Completed:**

- Figma Desktop installed on your PC
- Figma MCP server installed globally
- Your duplicated AWS Amplify UI Kit file ready
- MCP configuration updated in `mcp-servers.json`

## Step 1: Get Figma Access Token

1. **Open Figma Desktop**
2. **Go to Settings** → **Account** → **Personal Access Tokens**
3. **Create New Token**:
   - Name: "Portfolio Development"
   - Permissions: Read access to files
   - Expiration: 30 days (recommended)
4. **Copy the generated token**

## Step 2: Configure MCP Server

1. **Edit `mcp-servers.json`**:

   ```json
   {
     "figma": {
       "command": "npx",
       "args": ["@sethdouglasford/mcp-figma"],
       "disabled": false,
       "autoApprove": ["figma_get_file", "figma_list_components"],
       "env": {
         "FIGMA_ACCESS_TOKEN": "your_token_here"
       }
     }
   }
   ```

2. **Replace `your_token_here`** with your actual Figma access token

## Step 3: Restart MCP Client

1. **Restart your MCP client** (Claude Desktop, VS Code, etc.)
2. **Verify connection**: The Figma server should appear in connected servers

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

### Using Figma Desktop + MCP

1. **Open your Figma file** in Figma Desktop
2. **Go to "My Components" page**
3. **Design your components** using Amplify primitives:
   - Buttons, Cards, Forms, etc.
   - Add variants for different states
   - Use consistent naming

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

### Connection Issues

1. **Socket Connection Errors**:
   - Ensure Figma Desktop is running
   - Check that Figma plugin is installed
   - Verify access token is valid

2. **Token Issues**:
   - Generate new token if expired
   - Ensure token has proper permissions
   - Check token is correctly copied

3. **MCP Server Not Found**:
   - Restart MCP client
   - Check `mcp-servers.json` syntax
   - Verify server is not disabled

### Alternative Access Methods

If MCP server has issues, you can still:

1. **Use Figma Desktop directly** for design
2. **Use Amplify Studio web interface** for syncing
3. **Manual component creation** in Amplify Studio

## Security Notes

- **Keep tokens secure**: Never share access tokens
- **Limited permissions**: Use read-only access when possible
- **Regular rotation**: Update tokens every 30 days
- **Environment variables**: Store tokens in env files, not code

## Next Steps

1. **Get your Figma access token**
2. **Configure MCP server** with the token
3. **Restart your MCP client**
4. **Design components** in Figma Desktop
5. **Sync to Amplify Studio**
6. **Generate code** with `npx ampx generate`

Your Figma integration will then be fully operational!
