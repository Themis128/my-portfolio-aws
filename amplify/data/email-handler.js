import https from 'https';

export const request = async (ctx) => {
  const { to, subject, body, from } = ctx.arguments;

  if (!to || !subject || !body) {
    throw new Error('Missing required fields: to, subject, body');
  }

  try {
    // Get EmailJS configuration from environment variables (costless alternative to SES)
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.warn('EmailJS not configured - Email sending disabled');
      console.log('📧 Email details:', { to, subject, body }); // Log to console as fallback
      return 'Email sending skipped (EmailJS not configured) - logged to console';
    }

    // Prepare EmailJS payload
    const payload = JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        to_email: to,
        from_name: from || 'Portfolio Contact',
        subject: subject,
        message: body,
        reply_to: to
      }
    });

    // Send to EmailJS API
    const result = await new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.emailjs.com',
        path: '/api/v1.0/email/send',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload)
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          if (res.statusCode === 200) {
            resolve({ statusCode: res.statusCode, body: data });
          } else {
            reject(new Error(`EmailJS failed: ${res.statusCode} ${data}`));
          }
        });
      });

      req.on('error', reject);
      req.write(payload);
      req.end();
    });

    console.log('Email sent successfully via EmailJS:', result.statusCode);
    return `Email sent successfully to ${to}`;

  } catch (error) {
    console.error('Error sending email:', error);
    console.log('📧 Fallback - Email details:', { to, subject, body }); // Always log as fallback
    return `Email sending failed - logged to console: ${to}`;
  }
};

export const response = (ctx) => {
  return ctx.result;
};
