import { Resend } from 'resend';
import turnstilePlugin from "@cloudflare/pages-plugin-turnstile";

export const onRequestPost = [
  async (context) => {
    return turnstilePlugin({ secret: context.env.TURNSTILE_SECRET_KEY })(context);
  },
  (async (context) => {
    try {
      const data = await generateRequestData(context.request);

      // Validate form data
      if (!data.email || !data.name || !data.message) {
        return new Response(
          JSON.stringify({
            status: false,
            message: 'Email, name, and message are required',
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          },
        );
      }

      // Check if Turnstile validation passed (the plugin adds this)
      if (!context.data.turnstile.success) {
         return new Response(
          JSON.stringify({
            status: false,
            message: 'CAPTCHA validation failed. Please try again.',
          }),
          {
            status: 400, // Use 403 Forbidden or 400 Bad Request
            headers: { 'Content-Type': 'application/json' },
          },
        );
      }

      const resend = new Resend(context.env.RESEND_API_KEY);

      const emailContent = `
  Name: ${data.name}
  Email: ${data.email}
  Category: ${data.category}
  Message: ${data.message}
    `;

      // Send email using Resend
      await resend.emails.send({
        from: 'contact@friendsofutevalleypark.com',
        to: 'contact@friendsofutevalleypark.com',
        subject: `New Contact Form Submission from ${data.name}`,
        text: emailContent,
      });

      return new Response(JSON.stringify({ status: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error processing request:', error);
      return new Response(
        JSON.stringify({
          status: false,
          message: error.message || 'Failed to process request',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  })
];

async function generateRequestData(request) {
  const contentType = request.headers.get('content-type') || '';

  // Check for supported content types
  if (
    contentType.includes('application/x-www-form-urlencoded') ||
    contentType.includes('multipart/form-data')
  ) {
    const formData = await request.formData();
    
    // Get data directly from formData fields.
    return {
      email: formData.get('email')?.toString() || '',
      name: formData.get('name')?.toString() || '',
      category: formData.get('category')?.toString() || '',
      message: formData.get('message')?.toString() || '',
    };
  } else {
    throw new Error('Unsupported content type. Only FormData is allowed.');
  }
}
