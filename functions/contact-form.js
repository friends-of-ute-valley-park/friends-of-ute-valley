import { Resend } from 'resend';
import turnstilePlugin from '@cloudflare/pages-plugin-turnstile';
import { isValidEmail, jsonResponse, normalizeField } from '../src/utils/http.js';

export const onRequestPost = [
  async (context) => {
    return turnstilePlugin({ secret: context.env.TURNSTILE_SECRET_KEY })(context);
  },
  async (context) => {
    try {
      const data = await generateRequestData(context.request);

      if (!data.email || !data.name || !data.message) {
        return jsonResponse(
          {
            status: false,
            message: 'Email, name, and message are required.',
          },
          400,
        );
      }

      if (!isValidEmail(data.email)) {
        return jsonResponse(
          {
            status: false,
            message: 'A valid email address is required.',
          },
          400,
        );
      }

      if (!context.data?.turnstile?.success) {
        return jsonResponse(
          {
            status: false,
            message: 'CAPTCHA validation failed. Please try again.',
          },
          400,
        );
      }

      const resend = new Resend(context.env.RESEND_API_KEY);
      const subjectName = data.name.replace(/[\r\n]+/g, ' ');

      const emailContent = `
  Name: ${data.name}
  Email: ${data.email}
  Category: ${data.category}
  Message: ${data.message}
    `;

      const emailResult = await resend.emails.send({
        from: 'contact@fuvp.org',
        to: 'contact@fuvp.org',
        subject: `New Contact Form Submission from ${subjectName}`,
        text: emailContent,
      });

      if (emailResult.error) {
        throw new Error(emailResult.error.message);
      }

      return jsonResponse({ status: true });
    } catch (error) {
      console.error('Error processing request:', error);
      return jsonResponse(
        {
          status: false,
          message: 'Failed to process request. Please try again later.',
        },
        400,
      );
    }
  },
];

async function generateRequestData(request) {
  const contentType = request.headers.get('content-type') || '';

  // Check for supported content types
  if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
    const formData = await request.formData();

    // Get data directly from formData fields.
    return {
      email: normalizeField(formData.get('email')),
      name: normalizeField(formData.get('name')),
      category: normalizeField(formData.get('category')),
      message: normalizeField(formData.get('message')),
    };
  } else {
    throw new Error('Unsupported content type. Only FormData is allowed.');
  }
}
