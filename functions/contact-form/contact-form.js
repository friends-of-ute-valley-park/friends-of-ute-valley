import { Resend } from 'resend';

export async function onRequestPost(context) {
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
}

async function generateRequestData(request) {
  const contentType = request.headers.get('content-type');

  if (contentType && contentType.includes('application/json')) {
    const body = await request.json();
    return {
      email: body.payload.email,
      name: body.payload.name,
      category: body.payload.category,
      message: body.payload.message,
    };
  } else {
    throw new Error('Unsupported content type. Only application/json is allowed.');
  }
}
