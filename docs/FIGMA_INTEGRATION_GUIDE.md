# Figma Integration with AWS Amplify Studio

This guide explains how to set up Figma integration with your portfolio project using AWS Amplify Studio.

## Prerequisites

✅ **Already Completed:**

- AWS Amplify CLI installed (`ampx`)
- `@aws-amplify/ui-react` and `aws-amplify` dependencies installed
- Theme provider configured with portfolio theme
- UI components directory structure created
- Studio theme configuration set up

## Step 1: Set up Figma File

1. **Duplicate the AWS Amplify UI Kit:**
   - Go to [AWS Amplify UI Kit](https://www.figma.com/design/kIdPDTSkQcsvfn0hzHfR3O/AWS-Amplify-UI-Kit--Community-?node-id=2653-2886&p=f&t=jGcAHrk0CmA5WVug-0)
   - Click "Duplicate" to create your own copy
   - Example: Your duplicated file will look like: https://www.figma.com/design/9DPzMHAEGmxNKf8wQ77ktn/AWS-Amplify-UI-Kit--Community---Copy-?node-id=2653-2886&p=f&t=FWbjFxTfItL1AvBM-0
   - Rename it to match your project (e.g., "Portfolio UI Kit")

2. **Understand the Figma File Structure:**
   - **README**: Instructions for using the Figma file
   - **Theme**: Design tokens and theme values (read-only)
   - **Primitives**: Basic components like buttons, alerts, badges (read-only)
   - **My Components**: Your custom components built with primitives
   - **Examples**: Demonstration pages

## Step 2: Link Figma File in Amplify Studio

1. **Open Amplify Studio:**

   ```bash
   # Navigate to your AWS Console
   # Open Amplify Studio for your project
   ```

2. **Link Figma File:**
   - Go to the "UI Library" section
   - Click "Link Figma file"
   - Paste your Figma file URL
   - Authenticate with Figma when prompted

3. **Sync Components:**
   - Review the components detected from your Figma file
   - Click "Accept all" or review individually
   - Wait for the sync to complete

## Step 3: Configure Your Project

Your project is already configured with:

### Theme Provider Setup

```typescript
// pages/_app.tsx and ClientLayout.tsx are already configured
import { ThemeProvider } from "@aws-amplify/ui-react";
import studioTheme from './ui-components/studioTheme';

<ThemeProvider theme={studioTheme}>
  <App />
</ThemeProvider>
```

### Dependencies Installed

```json
{
  "@aws-amplify/ui-react": "^6.1.12",
  "aws-amplify": "^6.15.9"
}
```

### UI Components Structure

```
src/ui-components/
├── studioTheme.ts      # Theme configuration
├── index.ts           # Component exports
└── ExampleButton.tsx  # Example component
```

## Step 4: Import and Use Components

### Using the New CLI (ampx)

The new Amplify CLI uses `ampx` instead of `amplify pull`. For UI components:

```bash
# Generate UI components from Amplify Studio
npx ampx generate

# Or check available commands
npx ampx generate --help
```

### Import Components

```typescript
// Import components from your ui-components directory
import { YourFigmaComponent, AnotherComponent } from '@/ui-components';

export default function MyPage() {
  return (
    <div>
      <YourFigmaComponent prop1="value1" prop2="value2" />
      <AnotherComponent />
    </div>
  );
}
```

## Step 5: Design Your Components in Figma

### Optional: Programmatic token sync

You can programmatically pull color styles from your Figma file into the repo using the included script. This is a convenience when you want to keep color tokens in sync without manually editing `src/ui-components/studioTheme.ts`.

1. Export the following environment variables locally or in CI (don't check secrets into the repo):

```bash
export FIGMA_API_KEY="pk_figma_your_token_here"
export FIGMA_FILE_KEY="<your_file_key>" # optional, will default to the example file in docs
```

2. Run the sync script which writes tokens to `src/ui-components/figmaTokens.generated.ts`:

```bash
pnpm run sync:figma
```

3. (Optional) Run the Amplify generate step afterward to refresh generated components:

```bash
pnpm run sync:figma:generate
```

This script extracts FILL color styles and writes them to `src/ui-components/figmaTokens.generated.ts` so the project can merge them into the active theme.

## CI: Automated Figma sync

You can automate the Figma token sync and Amplify generation using the included GitHub Actions workflow at `.github/workflows/figma-sync.yml`. The workflow can be run manually or scheduled to run regularly and will:

- Run `pnpm run sync:figma` to fetch tokens from Figma and write `src/ui-components/figmaTokens.generated.ts`.
- Run `npx ampx generate outputs` and `npx ampx generate forms` to refresh generated artifacts (non-blocking by default).
- Commit any generated changes and open a pull request for review.

Required repository secrets (add in GitHub → Settings → Secrets → Actions):

- `FIGMA_API_KEY` — **Personal Access Token** (PAT) for a Figma account with access to the file. Keep this secret and rotate if compromised.
- `FIGMA_FILE_KEY` — (optional) Figma file key to use; the workflow and scripts will default to the example file if not provided.
- Additional secrets as needed for generation (for example, AWS credentials or profile if `ampx` generation needs them). The workflow uses the standard `GITHUB_TOKEN` for creating PRs.

Usage:

1. Add the secrets to your repository's Secrets store.
2. Trigger the workflow manually from the Actions tab ("Figma sync") or let it run on the configured schedule.
3. Review the generated PR and merge when acceptable.

Security note: Do not commit tokens into the repo. The workflow uses secrets so tokens do not appear in logs.

### Best Practices

1. **Use Amplify Primitives:**
   - Build components using the provided primitives
   - Don't modify primitive instances directly
   - Use the AWS Amplify UI Builder plugin

2. **Component Naming:**
   - Use clear, descriptive names
   - Follow React naming conventions (PascalCase)
   - Avoid special characters

3. **Design Tokens:**
   - Use theme values from the Theme page
   - Maintain consistency across components
   - Leverage the color palette and typography

### Example Workflow

1. **Create a New Component:**
   - Go to "My Components" page in Figma
   - Build your component using primitives
   - Add variants for different states (hover, active, disabled)

2. **Sync to Amplify Studio:**
   - Save your Figma file
   - Go to Amplify Studio
   - Click "Sync from Figma"

3. **Generate Code:**

   ```bash
   npx ampx generate
   ```

4. **Use in Your App:**
   ```typescript
   import { MyNewComponent } from "@/ui-components";
   ```

## Step 6: Customize Components

### Using Overrides

```typescript
import { MyComponent } from '@/ui-components';

function CustomizedComponent() {
  return (
    <MyComponent
      overrides={{
        Button: {
          // Override specific properties
          backgroundColor: '#custom-color',
          fontSize: '18px'
        },
        Text: {
          // Override text properties
          color: '#text-color'
        }
      }}
    />
  );
}
```

### Extending with Code

```typescript
import { MyComponent } from '@/ui-components';

function ExtendedComponent({ customProp, ...props }) {
  return (
    <div className="custom-wrapper">
      <MyComponent {...props} />
      {/* Additional custom elements */}
    </div>
  );
}
```

## Step 7: Testing

Visit `/figma-demo` to see the integration in action:

```bash
npm run dev
# Navigate to http://localhost:3003/figma-demo
```

## Troubleshooting

### Common Issues

1. **Components not appearing after sync:**
   - Check that components are on the "My Components" page
   - Ensure you're using Amplify primitives
   - Try re-syncing from Figma

2. **Theme not applying:**
   - Verify ThemeProvider is wrapping your app
   - Check that studioTheme is properly exported
   - Ensure CSS imports are present

3. **TypeScript errors:**
   - Run `npx ampx generate` to update types
   - Check component prop interfaces
   - Verify import paths

### Getting Help

- [Amplify Studio Documentation](https://docs.amplify.aws/console/uibuilder/)
- [Figma Integration Guide](https://docs.amplify.aws/console/uibuilder/figma/)
- [Amplify UI Components](https://ui.docs.amplify.aws/)

## Next Steps

1. Design your first component in Figma
2. Sync to Amplify Studio
3. Generate code with `npx ampx generate`
4. Import and use in your application
5. Customize with overrides or extensions

## File Structure After Integration

```
src/ui-components/
├── studioTheme.ts          # Theme configuration
├── index.ts               # Component exports
├── ComponentA.tsx         # Generated from Figma
├── ComponentB.tsx         # Generated from Figma
└── ExampleButton.tsx       # Example component
```

Your portfolio is now ready for Figma integration with AWS Amplify Studio!
