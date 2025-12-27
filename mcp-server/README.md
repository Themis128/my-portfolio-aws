# D: Drive File Server

An MCP (Model Context Protocol) server that provides access to files and folders on the D: drive.

## Features

- List files and directories in any path on D: drive
- Read file contents from D: drive
- Search for files matching patterns in directories on D: drive

## Tools

### list_files
Lists files and directories in a given path on D: drive.

**Parameters:**
- `directory` (string, required): The directory path to list (relative to D: drive)

**Example:**
```json
{
  "name": "list_files",
  "arguments": {
    "directory": "Documents"
  }
}
```

### read_file
Reads the contents of a file from D: drive.

**Parameters:**
- `filePath` (string, required): The full path to the file to read

**Example:**
```json
{
  "name": "read_file",
  "arguments": {
    "filePath": "D:\\Documents\\example.txt"
  }
}
```

### search_files
Searches for files matching a pattern in a directory on D: drive.

**Parameters:**
- `directory` (string, required): The directory to search in
- `pattern` (string, required): The file pattern to search for (e.g., '*.txt')

**Example:**
```json
{
  "name": "search_files",
  "arguments": {
    "directory": "Documents",
    "pattern": "*.txt"
  }
}
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

## Usage

The server runs as an MCP server and can be connected to by MCP clients. Once connected, clients can call the available tools to access files on the D: drive.

## Security Notes

- This server provides access to the D: drive on the machine where it's running
- Ensure proper security measures are in place when deploying
- Consider implementing authentication and authorization for production use
- Be cautious about which directories and files are accessible

## Dependencies

- `@modelcontextprotocol/sdk`: MCP server framework
