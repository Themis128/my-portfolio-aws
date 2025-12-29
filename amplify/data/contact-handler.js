export const request = async (ctx) => {
  const { name, email, message } = ctx.arguments;

  // Validate required fields
  if (!name || !email || !message) {
    throw new Error('Name, email, and message are all required');
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Please provide a valid email address');
  }

  // Create contact record in DynamoDB
  const contact = await ctx.data.Contact.create({
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
  });

  const contactId = contact.data.id;

  // Log the contact submission
  console.log(`📬 NEW CONTACT FORM SUBMISSION: ${contactId} - ${name} (${email})`);

  // Send Slack notification to the user
  try {
    const slackMessage = `🚀 New contact form submission!\n👤 Name: ${name}\n📧 Email: ${email}\n💬 Message: ${message.substring(0, 200)}${message.length > 200 ? '...' : ''}\n🆔 ID: ${contactId}`;

    await ctx.data.sendSlackNotification({
      message: slackMessage,
      channel: '#general'
    });

    console.log(`✅ Slack notification sent for contact ${contactId}`);
  } catch (slackError) {
    console.warn(`⚠️ Slack notification failed for contact ${contactId}:`, slackError);
    // Don't fail the contact submission if Slack fails
  }

  // Send email reply to the user via SES
  try {
    const emailSubject = `Thank you for contacting me, ${name}!`;
    const emailBody = `
Dear ${name},

Thank you for reaching out! I've received your message and will get back to you within 24 hours.

Your message:
"${message}"

Best regards,
Themistoklis Baltzakis
Portfolio Contact Form
Contact ID: ${contactId}

---
This is an automated response. Please do not reply to this email.
    `.trim();

    // Send actual email via SES
    await ctx.data.sendEmail({
      to: email,
      subject: emailSubject,
      body: emailBody
    });

    console.log(`✅ Email sent to ${email} for contact ${contactId}`);
  } catch (emailError) {
    console.warn(`⚠️ Email sending failed for contact ${contactId}:`, emailError);
    // Don't fail the contact submission if email fails
    // Log the email that would have been sent for debugging
    console.log(`📧 Email that failed to send - To: ${email}, Subject: Thank you for contacting me, ${name}!`);
  }

  return `Contact form submitted successfully! We will get back to you within 24 hours. (ID: ${contactId})`;
};

export const response = (ctx) => {
  return ctx.result;
};
