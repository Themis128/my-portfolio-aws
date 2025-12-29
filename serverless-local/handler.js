"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const api_1 = require("@aws-amplify/api");
const client_ses_1 = require("@aws-sdk/client-ses");
const mutations_1 = require("./graphql/mutations");
const sesClient = new client_ses_1.SESClient({ region: 'eu-central-1' });
// Check if we're running locally (serverless offline)
const isLocal = process.env.IS_LOCAL === 'true' || !process.env.LAMBDA_TASK_ROOT;
const handler = async (event) => {
    try {
        // Handle both Amplify and serverless-offline event formats
        let body = {};
        if (typeof event.body === 'string') {
            body = JSON.parse(event.body);
        }
        else if (event.body) {
            body = event.body;
        }
        const { name, email, message } = body;
        if (!name || !email || !message) {
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                },
                body: JSON.stringify({ error: 'Missing required fields' }),
            };
        }
        console.log('Processing contact form submission:', { name, email, message: message.substring(0, 50) + '...' });
        if (isLocal) {
            // Local development mode - simulate success without calling real AWS services
            console.log('🧪 LOCAL MODE: Simulating contact form processing');
            // Simulate DynamoDB storage
            console.log('📝 Simulating DynamoDB storage...');
            console.log('✅ Contact data would be stored:', { name, email, messageLength: message.length });
            // Simulate SES email
            console.log('📧 Simulating SES email send...');
            console.log('✅ Email would be sent to:', email);
            // Simulate Slack notification
            console.log('💬 Simulating Slack notification...');
            console.log('✅ Slack message would be posted');
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                },
                body: JSON.stringify({
                    message: 'Message sent successfully (LOCAL MODE)',
                    success: true,
                    mode: 'local'
                }),
            };
        }
        // Production mode - use real AWS services
        console.log('🏭 PRODUCTION MODE: Using real AWS services');
        // Store in DynamoDB via GraphQL
        const client = (0, api_1.generateClient)();
        await client.graphql({
            query: mutations_1.createContact,
            variables: {
                input: {
                    name,
                    email,
                    message,
                },
            },
        });
        // Send confirmation email via SES
        const emailParams = {
            Source: 'noreply@cloudless.gr',
            Destination: {
                ToAddresses: [email],
            },
            Message: {
                Subject: {
                    Data: 'Thank you for your message - Baltzakis Themis',
                },
                Body: {
                    Text: {
                        Data: `Dear ${name},

Thank you for reaching out to me!

I have received your message and appreciate you taking the time to contact me. I will review your inquiry and get back to you within 24 hours.

For your reference, here's a copy of your message:
"${message}"

Best regards,
Themis Baltzakis
www.baltzakisthemis.com

---
This is an automated response. Please do not reply to this email.`,
                    },
                    Html: {
                        Data: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Message Received - Baltzakis Themis</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb;">Thank you for your message!</h2>

        <p>Dear ${name},</p>

        <p>Thank you for reaching out to me!</p>

        <p>I have received your message and appreciate you taking the time to contact me. I will review your inquiry and get back to you within 24 hours.</p>

        <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #2563eb; margin: 20px 0;">
            <strong>Your message:</strong><br>
            ${message.replace(/\n/g, '<br>').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;')}
        </div>

        <p>Best regards,<br>
        <strong>Themis Baltzakis</strong><br>
        <a href="https://www.baltzakisthemis.com" style="color: #2563eb;">www.baltzakisthemis.com</a></p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="font-size: 12px; color: #666;">
            This is an automated response. Please do not reply to this email.
        </p>
    </div>
</body>
</html>`,
                    },
                },
            },
        };
        await sesClient.send(new client_ses_1.SendEmailCommand(emailParams));
        // Send to Slack webhook
        const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
        if (!slackWebhookUrl) {
            console.warn('SLACK_WEBHOOK_URL not set, skipping Slack notification');
        }
        else {
            const slackPayload = {
                channel: '#personal-website',
                username: 'Contact Form Bot',
                icon_emoji: ':email:',
                attachments: [
                    {
                        fallback: `New contact form submission from ${name}`,
                        color: '#36a64f',
                        title: 'New Contact Form Submission',
                        fields: [
                            {
                                title: 'Name',
                                value: name,
                                short: true,
                            },
                            {
                                title: 'Email',
                                value: email,
                                short: true,
                            },
                            {
                                title: 'Message',
                                value: message,
                                short: false,
                            },
                        ],
                        footer: 'Baltzakis Themis Contact Form',
                        ts: Math.floor(Date.now() / 1000),
                    },
                ],
            };
            await fetch(slackWebhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(slackPayload),
            });
        }
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
            },
            body: JSON.stringify({
                message: 'Message sent successfully',
                success: true
            }),
        };
    }
    catch (error) {
        console.error('Error processing contact form:', error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
            },
            body: JSON.stringify({
                error: 'Internal server error',
                success: false
            }),
        };
    }
};
exports.handler = handler;
