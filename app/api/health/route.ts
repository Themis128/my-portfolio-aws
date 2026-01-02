import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Basic health checks
    const checks: {
      timestamp: string;
      status: string;
      uptime: number;
      environment: string;
      version: string;
      amplify?: string;
      database?: string;
    } = {
      timestamp: new Date().toISOString(),
      status: 'healthy',
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
    };

    // Check if we're in production and can access Amplify
    if (process.env.NODE_ENV === 'production') {
      try {
        // Check if Amplify config is available
        const amplifyConfig = process.env.AMPLIFY_ENV;
        if (amplifyConfig) {
          checks.amplify = 'configured';
        } else {
          checks.amplify = 'not_configured';
        }
      } catch (error) {
        checks.amplify = 'error';
      }
    }

    // Check database/API connectivity (if applicable)
    try {
      // This would be where you'd check database connections
      // For now, we'll just mark it as available
      checks.database = 'available';
    } catch (error) {
      checks.database = 'unavailable';
    }

    // Determine overall health
    const isHealthy = checks.amplify !== 'error' && checks.database !== 'unavailable';

    return NextResponse.json({
      ...checks,
      status: isHealthy ? 'healthy' : 'unhealthy',
    }, {
      status: isHealthy ? 200 : 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: 'Health check failed',
    }, {
      status: 500,
    });
  }
}