// @ts-ignore
import { Server } from '/home/tbaltzakis/home/my-portfolio/node_modules/@modelcontextprotocol/sdk/dist/cjs/server/index.js';
// @ts-ignore
import { StdioServerTransport } from '/home/tbaltzakis/home/my-portfolio/node_modules/@modelcontextprotocol/sdk/dist/cjs/server/stdio.js';
// @ts-ignore
import { CallToolRequestSchema } from '/home/tbaltzakis/home/my-portfolio/node_modules/@modelcontextprotocol/sdk/dist/cjs/types.js';

const server = new Server(
  {
    name: 'playwright-code-fixer',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(
  CallToolRequestSchema,
  async (request: any, extra: any) => {
    if (request.params.name === 'fix_code') {
      const args = request.params.arguments as { error_message: string; code_snippet: string };
      const { error_message, code_snippet } = args;

      // Simple rule-based fixes for common Playwright errors
      let fixedCode = code_snippet;
      let explanation = 'Applied basic fixes based on error message.';

      if (error_message.includes('toHaveTitle') && error_message.includes('failed')) {
        // Fix the title expectation
        fixedCode = code_snippet.replace(/await expect\(page\)\.toHaveTitle\('Wrong Title'\);/, "await expect(page).toHaveTitle('Example Domain');");
        explanation = 'Corrected the expected title to match the actual page title.';
      } else if (error_message.includes('selector') || error_message.includes('not found')) {
        // Suggest using data-testid for better reliability
        fixedCode = code_snippet.replace(
          /page\.locator\('([^']*)'\)/g,
          'page.locator(\'[data-testid="$1"]\')'
        );
        explanation =
          'Replaced selector with data-testid attribute for better test reliability.';
      } else if (error_message.includes('timeout')) {
        // Increase timeout
        fixedCode = code_snippet.replace(
          /page\.waitForTimeout\((\d+)\)/g,
          'page.waitForTimeout($1 * 2)'
        );
        explanation = 'Increased timeout to handle slower page loads.';
      } else if (error_message.includes('click') && error_message.includes('not visible')) {
        // Wait for element to be visible before clicking
        fixedCode = code_snippet.replace(
          /await page\.locator\('([^']*)'\)\.click\(\);/g,
          "await page.locator('$1').waitFor({ state: 'visible' });\n  await page.locator('$1').click();"
        );
        explanation = 'Added wait for element to be visible before clicking.';
      }

      return {
        content: [
          {
            type: 'text',
            text: `Explanation: ${explanation}\n\nFixed code:\n${fixedCode}`,
          },
        ],
      };
    } else {
      throw new Error(`Unknown tool: ${request.params.name}`);
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Playwright Code Fixer MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
