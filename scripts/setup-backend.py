#!/usr/bin/env python3
"""
AWS SDK Script to create Amplify Backend Resources
Creates GraphQL API, Lambda function, and DynamoDB table for contact form
"""

import boto3
import json
import zipfile
import io
from datetime import datetime

# Configuration
REGION = 'eu-central-1'
APP_ID = 'dcwmv1pw85f0j'
ENV_NAME = 'prod'

# GraphQL Schema
GRAPHQL_SCHEMA = """
type Contact @model {
  id: ID!
  name: String!
  email: String!
  message: String!
  createdAt: AWSDateTime!
  updatedAt: AWSDateTime
}

type Mutation {
  sendContact(name: String!, email: String!, message: String!): String
}
"""

# Lambda Function Code
LAMBDA_CODE = """
const AWS = require('aws-sdk');
const SES = require('aws-sdk/clients/ses');
const DynamoDB = require('aws-sdk/clients/dynamodb');

const ses = new SES({ region: 'eu-central-1' });
const dynamodb = new DynamoDB.DocumentClient({ region: 'eu-central-1' });

exports.handler = async (event) => {
    try {
        const { name, email, message } = JSON.parse(event.body || '{}');

        // Store in DynamoDB
        const contact = {
            id: Date.now().toString(),
            name,
            email,
            message,
            createdAt: new Date().toISOString()
        };

        await dynamodb.put({
            TableName: 'Contact',
            Item: contact
        }).promise();

        // Send email notification
        await ses.sendEmail({
            Source: 'noreply@yourdomain.com',
            Destination: { ToAddresses: ['your@email.com'] },
            Message: {
                Subject: { Data: 'New Contact Form Submission' },
                Body: {
                    Text: { Data: `Name: ${name}\nEmail: ${email}\nMessage: ${message}` }
                }
            }
        }).promise();

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            body: JSON.stringify({ success: true, message: 'Contact form submitted successfully' })
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: JSON.stringify({ success: false, error: error.message })
        };
    }
};
"""

def create_dynamodb_table():
    """Create DynamoDB table for contacts"""
    dynamodb = boto3.client('dynamodb', region_name=REGION)

    try:
        response = dynamodb.create_table(
            TableName='Contact',
            KeySchema=[
                {
                    'AttributeName': 'id',
                    'KeyType': 'HASH'
                }
            ],
            AttributeDefinitions=[
                {
                    'AttributeName': 'id',
                    'AttributeType': 'S'
                }
            ],
            BillingMode='PAY_PER_REQUEST'
        )
        print(f"✅ Created DynamoDB table: {response['TableDescription']['TableName']}")
        return response['TableDescription']['TableArn']
    except Exception as e:
        print(f"❌ Failed to create DynamoDB table: {e}")
        return None

def create_lambda_function():
    """Create Lambda function for contact form processing"""
    lambda_client = boto3.client('lambda', region_name=REGION)
    iam_client = boto3.client('iam', region_name=REGION)

    # Create IAM role for Lambda
    assume_role_policy = {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Principal": {
                    "Service": "lambda.amazonaws.com"
                },
                "Action": "sts:AssumeRole"
            }
        ]
    }

    try:
        # Create IAM role
        role_response = iam_client.create_role(
            RoleName='contactHandlerLambdaRole',
            AssumeRolePolicyDocument=json.dumps(assume_role_policy),
            Description='Role for contact handler Lambda function'
        )
        role_arn = role_response['Role']['Arn']
        print(f"✅ Created IAM role: {role_arn}")

        # Attach basic execution role
        iam_client.attach_role_policy(
            RoleName='contactHandlerLambdaRole',
            PolicyArn='arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole'
        )

        # Attach DynamoDB and SES policies
        iam_client.attach_role_policy(
            RoleName='contactHandlerLambdaRole',
            PolicyArn='arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess'
        )

        iam_client.attach_role_policy(
            RoleName='contactHandlerLambdaRole',
            PolicyArn='arn:aws:iam::aws:policy/AmazonSESFullAccess'
        )

        # Wait for role to propagate
        import time
        time.sleep(10)

        # Create Lambda function
        zip_buffer = io.BytesIO()
        with zipfile.ZipFile(zip_buffer, 'w') as zip_file:
            zip_file.writestr('index.js', LAMBDA_CODE)
        zip_buffer.seek(0)

        lambda_response = lambda_client.create_function(
            FunctionName='contactHandler',
            Runtime='nodejs20.x',
            Role=role_arn,
            Handler='index.handler',
            Code={'ZipFile': zip_buffer.read()},
            Description='Contact form handler function',
            Timeout=30,
            MemorySize=256
        )

        print(f"✅ Created Lambda function: {lambda_response['FunctionArn']}")
        return lambda_response['FunctionArn']

    except Exception as e:
        print(f"❌ Failed to create Lambda function: {e}")
        return None

def create_appsync_api():
    """Create AppSync GraphQL API"""
    appsync = boto3.client('appsync', region_name=REGION)

    try:
        # Create GraphQL API
        api_response = appsync.create_graphql_api(
            name='my-portfolio-api',
            authenticationType='API_KEY'
        )
        api_id = api_response['graphqlApi']['apiId']
        print(f"✅ Created AppSync API: {api_id}")

        # Create API key
        key_response = appsync.create_api_key(
            apiId=api_id,
            description='Contact form API key',
            expires=int((datetime.now().timestamp() + 365*24*60*60) * 1000)  # 1 year
        )
        api_key = key_response['apiKey']['id']
        print(f"✅ Created API key: {api_key}")

        # Start schema creation
        appsync.start_schema_creation(
            apiId=api_id,
            definition=GRAPHQL_SCHEMA
        )
        print("✅ Started schema creation")

        return {
            'apiId': api_id,
            'apiKey': api_key,
            'endpoint': api_response['graphqlApi']['uris']['GRAPHQL']
        }

    except Exception as e:
        print(f"❌ Failed to create AppSync API: {e}")
        return None

def main():
    print("🚀 Setting up Amplify Backend Resources via AWS SDK")
    print("=" * 50)

    # Create resources
    dynamodb_arn = create_dynamodb_table()
    lambda_arn = create_lambda_function()
    appsync_info = create_appsync_api()

    if dynamodb_arn and lambda_arn and appsync_info:
        print("\n" + "=" * 50)
        print("✅ Backend Resources Created Successfully!")
        print(f"📊 DynamoDB Table ARN: {dynamodb_arn}")
        print(f"⚡ Lambda Function ARN: {lambda_arn}")
        print(f"🔗 AppSync API ID: {appsync_info['apiId']}")
        print(f"🔑 API Key: {appsync_info['apiKey']}")
        print(f"🌐 GraphQL Endpoint: {appsync_info['endpoint']}")

        # Generate amplify_outputs.json
        amplify_outputs = {
            "data": {
                "url": appsync_info['endpoint'],
                "aws_region": REGION,
                "api_key": appsync_info['apiKey'],
                "default_authorization_type": "API_KEY",
                "authorization_types": ["AWS_IAM"],
                "model_introspection": {
                    "version": 1,
                    "models": {
                        "Contact": {
                            "name": "Contact",
                            "fields": {
                                "id": {"name": "id", "isArray": False, "type": "ID", "isRequired": True},
                                "name": {"name": "name", "isArray": False, "type": "String", "isRequired": True},
                                "email": {"name": "email", "isArray": False, "type": "String", "isRequired": True},
                                "message": {"name": "message", "isArray": False, "type": "String", "isRequired": True},
                                "createdAt": {"name": "createdAt", "isArray": False, "type": "AWSDateTime", "isRequired": True},
                                "updatedAt": {"name": "updatedAt", "isArray": False, "type": "AWSDateTime", "isRequired": False}
                            },
                            "syncable": True,
                            "pluralName": "Contacts"
                        }
                    }
                }
            },
            "version": "1.4"
        }

        with open('amplify_outputs.json', 'w') as f:
            json.dump(amplify_outputs, f, indent=2)
        print("📄 Generated amplify_outputs.json")

    else:
        print("\n❌ Some resources failed to create. Check permissions.")

if __name__ == '__main__':
    main()
