import { parse } from 'querystring';
import { Resend } from 'resend';

export async function onRequestPost(context) {
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

  const resend = new Resend(context.env.RESEND_API_KEY);

  const emailContent = `
Name: ${data.name}
Email: ${data.email}
Category: ${data.category}
Message: ${data.message}
  `;

  try {
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
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({
        status: false,
        message: 'Failed to send email',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}

async function generateRequestData(request) {
  let body = {};
  const contentType = request.headers.get('content-type');

  if (contentType && contentType.includes('application/json')) {
    body = await request.json();
  } else {
    const text = await request.text();
    body = parse(text);
  }

  return {
    email: body.payload.email,
    name: body.payload.name,
    category: body.payload.category,
    message: body.payload.message,
  };
}
