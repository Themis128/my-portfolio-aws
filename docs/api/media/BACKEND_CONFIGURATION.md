# AWS Amplify Gen 2 Portfolio Backend

This portfolio uses AWS Amplify Gen 2 for its backend services with a custom S3 bucket configuration.

## Backend Services

### Authentication (Cognito)

- User pool with email-based authentication
- Configured for future admin features

### Data API (AppSync GraphQL)

- Contact form submissions stored in DynamoDB
- Public API key authentication for contact forms

### Functions (Lambda)

- **Contact Handler**: Processes contact form submissions with email/Slack notifications
- **Analytics Handler**: Tracks user interactions and custom events
- **Slack Handler**: Sends notifications to Slack channels
- **Say Hello**: Demonstration function with full configuration options
- **Weekly Digest**: Scheduled function generating weekly analytics (every Sunday at midnight)
- **Daily Reminder**: Scheduled function with multiple daily reminders (9 AM, 6 PM, every 2 hours, weekdays at noon)

### Lambda Layers

Amplify offers the ability to add layers to your functions which contain your library dependencies. Lambda layers allow you to separate your function code from its dependencies, enabling easier management of shared components across multiple functions and reducing deployment package sizes.

**Note**: Configuring or adding layers in `defineFunction` is not supported for Custom Functions.

To add a Lambda layer to your function:

1. **Create and set up your Lambda layer in AWS** through the AWS Console or AWS CLI. Refer to AWS documentation on creating Lambda layers.

2. **Reference the layer in your Amplify project** by specifying the `layers` property in `defineFunction`:

   ```typescript
   // amplify/functions/my-function/resource.ts
   import { defineFunction } from '@aws-amplify/backend';

   export const myFunction = defineFunction({
     name: 'my-function',
     layers: {
       '@aws-lambda-powertools/logger':
         'arn:aws:lambda:us-east-1:094274105915:layer:AWSLambdaPowertoolsTypeScriptV2:12',
     },
   });
   ```

   The Lambda layer is represented by an object of key/value pairs where:

   - **Key**: The module name exported from your layer (used to externalize the dependency)
   - **Value**: The ARN of the layer
   - **Limit**: Maximum of 5 layers per function, must be in the same region

3. **Alternatively, use layer name and version**:

   ```typescript
   export const myFunction = defineFunction({
     name: 'my-function',
     layers: {
       'some-module': 'myLayer:1',
     },
   });
   ```

   Amplify will automatically convert this to the full ARN format using your account ID and region.

4. **Use the layer in your function handler**:

   ```typescript
   // amplify/functions/my-function/handler.ts
   import { Logger } from '@aws-lambda-powertools/logger';
   import type { Handler } from 'aws-lambda';

   const logger = new Logger({ serviceName: 'serverlessAirline' });

   export const handler: Handler = async (event, context) => {
     logger.info('Hello World');
   };
   ```

**Versioning Considerations**: The ARN includes a version number (e.g., `:12`). Ensure you're using the appropriate version and have a strategy for updating layers when new versions are released.

For more information, refer to the [AWS documentation for Lambda layers](https://docs.aws.amazon.com/lambda/latest/dg/chapter-layers.html).

### Resource Access & Permissions

Amplify Functions must be granted access to interact with other AWS resources. There are two primary methods to grant permissions:

#### Using the `access` Property

The `access` property in `define*` functions allows you to specify permissions using common language. When you grant a function access to another Amplify resource, it automatically configures environment variables for SDK calls.

**Example: Function accessing Storage**

```typescript
// amplify/storage/resource.ts
import { defineStorage } from '@aws-amplify/backend';
import { generateMonthlyReports } from '../functions/generate-monthly-reports/resource';

export const storage = defineStorage({
  name: 'myReports',
  access: (allow) => ({
    'reports/*': [
      allow.resource(generateMonthlyReports).to(['read', 'write', 'delete']),
    ],
  }),
});
```

This creates the environment variable `MY_REPORTS_BUCKET_NAME` in the function.

**Usage in Function Handler:**

```typescript
// amplify/functions/generate-monthly-reports/handler.ts
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { env } from '$amplify/env/generate-monthly-reports';

const s3Client = new S3Client();

export const handler = async () => {
  const command = new PutObjectCommand({
    Bucket: env.MY_REPORTS_BUCKET_NAME,
    Key: `reports/${new Date().toISOString()}.csv`,
    Body: new Blob([''], { type: 'text/csv;charset=utf-8;' }),
  });

  await s3Client.send(command);
};
```

#### Using AWS Cloud Development Kit (CDK)

For permissions beyond the `access` property capabilities, use CDK to extend the function's execution role.

**Example: Granting SNS Publish Permissions**

```typescript
// amplify/backend.ts
import { defineBackend } from '@aws-amplify/backend';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as sns from 'aws-cdk-lib/aws-sns';
import { weeklyDigest } from './functions/weekly-digest/resource';

const backend = defineBackend({
  weeklyDigest,
});

const weeklyDigestLambda = backend.weeklyDigest.resources.lambda;

const topicStack = backend.createStack('WeeklyDigest');
const topic = new sns.Topic(topicStack, 'Topic', {
  displayName: 'digest',
});

const statement = new iam.PolicyStatement({
  sid: 'AllowPublishToDigest',
  actions: ['sns:Publish'],
  resources: [topic.topicArn],
});

weeklyDigestLambda.addToRolePolicy(statement);
```

**Using grant\* Methods (Recommended)**

Many AWS constructs provide `grant*` methods for common permissions:

```typescript
// amplify/backend.ts
import { defineBackend } from '@aws-amplify/backend';
import * as sns from 'aws-cdk-lib/aws-sns';
import { weeklyDigest } from './functions/weekly-digest/resource';

const backend = defineBackend({
  weeklyDigest,
});

const weeklyDigestLambda = backend.weeklyDigest.resources.lambda;

const topicStack = backend.createStack('WeeklyDigest');
const topic = new sns.Topic(topicStack, 'Topic', {
  displayName: 'digest',
});

topic.grantPublish(weeklyDigestLambda);
```

#### Current Implementation in Portfolio

The portfolio functions use both access patterns:

- **Contact Handler**: Uses direct API calls (no additional permissions needed)
- **Analytics Handler**: May need storage access for data persistence
- **Weekly Digest**: Uses EventBridge scheduling (built-in permissions)
- **Daily Reminder**: Uses EventBridge scheduling (built-in permissions)

**Current Storage Access Example:**

```typescript
// amplify/storage/resource.ts
import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'portfolioStorage',
  access: (allow) => ({
    'images/*': [allow.guest.to(['read', 'write'])],
  }),
});
```

This configuration allows guest users to read and write images to the `images/*` path in the S3 bucket, which is used for portfolio images and assets.

For production deployments requiring additional resource access, implement the appropriate `access` properties or CDK permissions as shown above.

### Modifying Amplify-Generated Lambda Resources with CDK

Amplify Functions utilize the `NodejsFunction` construct from the AWS Cloud Development Kit (CDK). The underlying resources can be modified, overridden, or extended using CDK after setting the resource on your backend.

**Accessing CDK Constructs:**

```typescript
// amplify/backend.ts
import { defineBackend } from '@aws-amplify/backend';
import { myFunction } from './functions/my-function/resource';

const backend = defineBackend({
  myFunction,
});

// CDK constructs can be accessed via
const lambdaFunction = backend.myFunction.resources.lambda;
```

The Lambda resource available is a representation of `IFunction`, which provides access to the underlying CDK construct.

**Common Modifications:**

1. **Adding Environment Variables:**

```typescript
lambdaFunction.addEnvironment('CUSTOM_VAR', 'value');
```

2. **Modifying Memory/Timeout:**

```typescript
// Note: These are typically set in defineFunction, but can be overridden
lambdaFunction.addEnvironment('AWS_LAMBDA_FUNCTION_MEMORY_SIZE', '1024');
```

3. **Adding Layers (Alternative to defineFunction):**

```typescript
import * as lambda from 'aws-cdk-lib/aws-lambda';

const layer = lambda.LayerVersion.fromLayerVersionArn(
  backend.stack,
  'MyLayer',
  'arn:aws:lambda:eu-central-1:123456789012:layer:my-layer:1'
);

lambdaFunction.addLayers(layer);
```

4. **Customizing VPC Configuration:**

```typescript
import * as ec2 from 'aws-cdk-lib/aws-ec2';

// Assuming you have a VPC defined
const vpc = ec2.Vpc.fromLookup(backend.stack, 'Vpc', { vpcId: 'vpc-12345' });
lambdaFunction.connections.allowTo(vpc, ec2.Port.tcp(443));
```

**Current Portfolio CDK Usage:**

The portfolio backend currently uses minimal CDK modifications, relying primarily on `defineFunction` configurations. For advanced use cases requiring VPC access, custom layers, or complex IAM permissions, the CDK modification patterns above can be applied.

**Note:** Most common Lambda configurations (memory, timeout, environment variables, layers) should be set directly in the `defineFunction` call rather than modified via CDK. Use CDK modifications for advanced scenarios not supported by the Amplify `defineFunction` API.

### Custom functions

**Implementation Note**: A Python function example was attempted but removed due to Docker requirements in sandbox environments. The documentation below shows the complete implementation approach for Python functions, which requires Docker for bundling in sandbox environments.

AWS Amplify Gen 2 functions are AWS Lambda functions that can be used to perform tasks and customize workflows in your Amplify app. Functions can be written in Node.js, Python, Go, or any other language supported by AWS Lambda.

Note: Fullstack Git-based environments do not support Docker for functions bundling out of the box. To learn more skip to the Docker section.

Note: The following options in defineFunction are not supported for Custom Functions:

Environment variables and secrets
Scheduling configuration
Lambda layers
Function options
You'll need to configure these options directly in your CDK Function definition instead. However, resourceGroupName property is supported and can be used to group related resources together in your defineFunction definition.

In this guide, you will learn how to create Python and Go functions with Amplify functions. The examples shown in this guide do not use Docker to build functions. Instead, the examples use commands that run on your host system to build, and as such require the necessary tooling for the language you are using for your functions.

#### Python

To get started, create a new directory and a resource file, amplify/functions/say-hello/resource.ts. Then, define the function with defineFunction:

amplify/functions/say-hello/resource.ts

```typescript
import { execSync } from 'node:child_process';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineFunction } from '@aws-amplify/backend';
import { DockerImage, Duration } from 'aws-cdk-lib';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';

const functionDir = path.dirname(fileURLToPath(import.meta.url));

export const sayHelloFunctionHandler = defineFunction(
  (scope) =>
    new Function(scope, 'say-hello', {
      handler: 'index.handler',
      runtime: Runtime.PYTHON_3_9, // or any other python version
      timeout: Duration.seconds(20), //  default is 3 seconds
      code: Code.fromAsset(functionDir, {
        bundling: {
          image: DockerImage.fromRegistry('dummy'), // replace with desired image from AWS ECR Public Gallery
          local: {
            tryBundle(outputDir: string) {
              execSync(
                `python3 -m pip install -r ${path.join(
                  functionDir,
                  'requirements.txt'
                )} -t ${path.join(
                  outputDir
                )} --platform manylinux2014_x86_64 --only-binary=:all:`
              );
              execSync(`cp -r ${functionDir}/* ${path.join(outputDir)}`);
              return true;
            },
          },
        },
      }),
    }),
  {
    resourceGroupName: 'auth', // Optional: Groups this function with auth resource
  }
);
```

Next, create the corresponding handler file at amplify/functions/say-hello/index.py. This is where your function code will go.

amplify/functions/say-hello/index.py

```python
import json

def handler(event, context):
  return {
      "statusCode": 200,
      "body": json.dumps({
          "message": "Hello World",
      }),
  }
```

The handler file must export a function named "handler". This is the entry point to your function. For more information on writing functions, refer to the AWS documentation for Lambda function handlers using Python.

If you need Python packages, you can add them to a requirements.txt file in the same directory as your handler file. The bundling option in the Code.fromAsset method will install these packages for you. Create a requirements.txt file in the same directory as your handler file. This file should contain the names of the packages you want to install. For example:

amplify/functions/say-hello/requirements.txt

```
request==2.25.1
some-other-package>=1.0.0
```

You're now ready to deploy your python function. Next is the same process as the Node.js/TypeScript function. Go to Common steps for all languages to continue.

#### Go

To get started, Create a new directory and a resource file, amplify/functions/say-hello/resource.ts. Then, define the function with defineFunction:

amplify/functions/say-hello/resource.ts

```typescript
import { execSync } from 'node:child_process';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineFunction } from '@aws-amplify/backend';
import { DockerImage, Duration } from 'aws-cdk-lib';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';

const functionDir = path.dirname(fileURLToPath(import.meta.url));

export const sayHelloFunctionHandler = defineFunction(
  (scope) =>
    new Function(scope, 'say-hello', {
      handler: 'bootstrap',
      runtime: Runtime.PROVIDED_AL2023,
      timeout: Duration.seconds(3), //  default is 3 seconds
      code: Code.fromAsset(functionDir, {
        bundling: {
          image: DockerImage.fromRegistry('dummy'),
          local: {
            tryBundle(outputDir: string) {
              execSync(`rsync -rLv ${functionDir}/* ${path.join(outputDir)}`);
              execSync(
                `cd ${path.join(
                  outputDir
                )} && GOARCH=amd64 GOOS=linux go build -tags lambda.norpc -o ${path.join(
                  outputDir
                )}/bootstrap ${functionDir}/main.go`
              );
              return true;
            },
          },
        },
      }),
    }),
  {
    resourceGroupName: 'auth', // Optional: Groups this function with auth resource
  }
);
```

Next, create the corresponding handler file at amplify/functions/say-hello/main.go. This is where your function code will go.

amplify/functions/say-hello/main.go

```go
package main

import (
	"context"
	"fmt"

	"github.com/aws/aws-lambda-go/lambda"
)

type Event struct {
	Arguments Arguments `json:"arguments"`
}

type Arguments struct {
	Title string `json:"phone"`
	Msg   string `json:"msg"`
}

func HandleRequest(ctx context.Context, event Event) (string, error) {
	fmt.Println("Received event: ", event)

	// fmt.Println("Message sent to: ", event.Arguments.Msg)
	// You can use lambda arguments in your code

	return "Hello World!", nil
}

func main() {
	lambda.Start(HandleRequest)
}
```

Then you should run the following command to build the go function:

terminal

```bash
go mod init lambda
```

then run to install the dependencies.

terminal

```bash
go mod tidy
```

You're now ready to deploy your golang function. Next is the same process as the Node.js/TypeScript function.

#### Common steps for all languages

Regardless of the language used, your function needs to be added to your backend.

amplify/backend.ts

```typescript
import { sayHelloFunctionHandler } from './functions/say-hello/resource';

defineBackend({
  sayHelloFunctionHandler,
});
```

Now when you run npx ampx sandbox or deploy your app on Amplify, it will include your function.

To invoke your function, we recommend adding your function as a handler for a custom query with your Amplify Data resource. To get started, open your amplify/data/resource.ts file and specify a new query in your schema:

amplify/data/resource.ts

```typescript
import { sayHelloFunctionHandler } from '../functions/say-hello/resource';

const schema = a.schema({
  sayHello: a
    .query()
    .arguments({
      name: a.string(),
    })
    .returns(a.string())
    .handler(a.handler.function(sayHelloFunctionHandler)),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'iam',
  },
});
```

#### Docker

Custom function may require Docker in order to build and bundle function's code. A deployment failing with CustomFunctionProviderDockerError error indicates that a custom function requires Docker but the Docker daemon was not found. In that case you need to provide a working Docker installation at runtime.

##### Personal sandboxes

Ensure that Docker is installed on your computer and that Docker daemon is running. You can check if Docker daemon is running using the following command:

terminal

```bash
docker info
```

##### Fullstack Git-based environments

Amplify does not provide Docker daemon out of the box in branch deployments. However, you have an option to provide your own image that meets Amplify requirements and includes a Docker installation.

For example, the aws/codebuild/amazonlinux-x86_64-standard:5.0 image (see definition) meets Amplify requirements and includes Docker installation.

### Scheduled Functions (EventBridge)

The portfolio includes automated scheduled functions powered by Amazon EventBridge:

#### Weekly Digest Function

- **Schedule**: `"every week"` (Sundays at midnight)
- **Purpose**: Generate weekly analytics and activity summaries
- **Configuration**: 5-minute timeout, 512MB memory, Node.js 20 runtime
- **Environment**: `DIGEST_TYPE=weekly`, `TIMEZONE=UTC`

#### Daily Reminder Function

- **Schedule**: Multiple intervals using cron expressions and natural language
  - `0 9 * * ? *` - Every day at 9:00 AM UTC
  - `0 18 * * ? *` - Every day at 6:00 PM UTC
  - `"every 2h"` - Every 2 hours during business hours
  - `0 12 ? * 2-6 *` - Every weekday at 12:00 PM UTC
- **Purpose**: Send daily reminders and notifications
- **Configuration**: 1-minute timeout, 256MB memory, Node.js 20 runtime
- **Environment**: `REMINDER_TYPE=daily`, `TIMEZONE=UTC`, business hours configuration

### Storage (Custom S3 Bucket)

- **Bucket**: `baltzakisthemis.com`
- **Region**: `eu-central-1`
- **Access**: Public read access for images
- **CORS**: Configured for localhost:3000 (development) and production domains

## Scheduled Functions

### Testing Scheduled Functions

Scheduled functions can be tested locally using the provided test script:

```bash
# Test all scheduled functions
pnpm run test:scheduled -- --all

# Test individual functions
pnpm run test:scheduled -- --weekly
pnpm run test:scheduled -- --daily
```

### Monitoring Scheduled Functions

- **CloudWatch Logs**: All execution logs and errors
- **CloudWatch Metrics**: Function performance and error rates
- **EventBridge Rules**: Schedule execution history and status
- **Lambda Metrics**: Duration, invocations, and error counts

### Adding New Scheduled Functions

1. Create a new directory under `amplify/functions/`
2. Create `resource.ts` with `defineFunction` and `schedule` property
3. Create `handler.ts` with `EventBridgeHandler` type
4. Import and add to `amplify/backend.ts`

Example:

```typescript
// resource.ts
export const myScheduledFunction = defineFunction({
  name: 'my-scheduled-function',
  schedule: 'every day', // natural language or cron
  entry: './handler.ts',
});

// handler.ts
export const handler: EventBridgeHandler<
  'Scheduled Event',
  null,
  void
> = async (event) => {
  // Your scheduled logic here
};
```

## Image Storage

All portfolio images are served from the `baltzakisthemis.com` S3 bucket:

- Profile pictures: `https://baltzakisthemis.com/images/[filename]`
- Project screenshots: `https://baltzakisthemis.com/images/portfolio/[filename]`
- Icons and assets: `https://baltzakisthemis.com/images/[category]/[filename]`

## Development

### Local Development

```bash
npm run dev
```

### Backend Deployment

```bash
npx @aws-amplify/backend-cli sandbox --once
```

### Production Deployment

```bash
npx @aws-amplify/backend-cli pipeline-deploy
```

## Configuration

- **Amplify Outputs**: `amplify_outputs.json` (contains API endpoints and configuration)
- **Environment Variables**: None required (using public bucket access)
- **CORS**: Already configured on the S3 bucket for development and production

## Security

- Contact form uses public API key (safe for contact submissions)
- Images are served with public read access
- Authentication is ready for future admin features
- No sensitive credentials exposed in frontend

## File Structure

```
amplify/
├── backend.ts              # Main backend configuration
├── data/
│   └── resource.ts         # Contact model and API
├── auth/
│   └── resource.ts         # Authentication setup
├── tsconfig.json           # TypeScript configuration
└── package.json            # Backend dependencies

lib/
├── amplify.ts              # Frontend Amplify configuration
├── custom-storage.ts       # Custom storage utilities
└── personal-data.ts        # Portfolio data with S3 URLs
```

## Contact Form

The contact form submits data to the Amplify GraphQL API and stores submissions in DynamoDB. The form is fully functional and ready for production use.
