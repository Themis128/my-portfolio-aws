import { InvokeCommand, LambdaClient } from '@aws-sdk/client-lambda';
import { NextRequest, NextResponse } from 'next/server';

const isDevelopment = process.env.NODE_ENV === 'development';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (isDevelopment) {
      // Use local serverless-offline endpoint
      const response = await fetch('http://localhost:3001/dev/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const result = await response.json();
      return NextResponse.json(result);
    } else {
      // Use AWS Lambda in production
      const lambdaClient = new LambdaClient({ region: 'eu-central-1' });

      const command = new InvokeCommand({
        FunctionName: 'contact-handler', // This will be the full ARN in production
        Payload: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      const result = await lambdaClient.send(command);

      if (result.StatusCode === 200) {
        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json(
          { success: false, error: 'Failed to process contact form' },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error('Error in contact API:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}