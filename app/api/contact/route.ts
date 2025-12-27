import { generateClient } from '@aws-amplify/api';
import { NextRequest, NextResponse } from 'next/server';
import { createContact } from '../../../lib/graphql/mutations';

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
      // Use local serverless-offline endpoint for development
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
      // Use Amplify GraphQL API in production
      const client = generateClient();
      await client.graphql({
        query: createContact,
        variables: {
          input: {
            name,
            email,
            message,
          },
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Message sent successfully'
      });
    }
  } catch (error) {
    console.error('Error in contact API:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}