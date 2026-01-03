import https from 'https';
import { createAnalytics } from './graphql/mutations';
export const handler = async (event) => {
    const { eventType, page, userAgent, referrer, metadata } = event.arguments || {};
    if (!eventType) {
        throw new Error('eventType is required');
    }
    try {
        // Store analytics event in DynamoDB via direct GraphQL call
        const postData = JSON.stringify({
            query: createAnalytics,
            variables: {
                input: {
                    eventType,
                    page,
                    userAgent,
                    referrer,
                    metadata: metadata ? JSON.stringify(metadata) : null,
                },
            },
        });
        const result = await new Promise((resolve, reject) => {
            const endpoint = process.env.AMPLIFY_DATA_GRAPHQL_ENDPOINT || 'https://kl4own6nqnegdfliofccu5klza.appsync-api.eu-central-1.amazonaws.com/graphql';
            const apiKey = process.env.AMPLIFY_DATA_API_KEY || 'da2-4sp2psirnncn7lgrly3bndxksy';
            const url = new URL(endpoint);
            const options = {
                hostname: url.hostname,
                path: url.pathname,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                    'Content-Length': Buffer.byteLength(postData),
                },
            };
            const req = https.request(options, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    try {
                        resolve(JSON.parse(data));
                    }
                    catch (e) {
                        reject(e);
                    }
                });
            });
            req.on('error', (e) => {
                reject(e);
            });
            req.write(postData);
            req.end();
        });
        if (result.errors) {
            throw new Error(`GraphQL error: ${JSON.stringify(result.errors)}`);
        }
        console.log(`✅ Analytics event tracked: ${eventType}`);
        return `Analytics event "${eventType}" tracked successfully`;
    }
    catch (error) {
        console.error('❌ Error tracking analytics event:', error);
        throw new Error(`Failed to track analytics event: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};
