export async function onRequestPost(context) {
  const { request, env } = context;

  const data = await generateRequestData(request);
  console.log('Signup request received');

  if (!data.email) {
    return new Response(JSON.stringify({ status: false, message: 'Email address required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!data.name) {
    return new Response(JSON.stringify({ status: false, message: 'Name required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const authResponse = await fetch('https://api.sendpulse.com/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: env.SENDPULSE_CLIENT_ID,
      client_secret: env.SENDPULSE_CLIENT_SECRET,
    }),
  });

  const authData = await authResponse.json();

  const sendpulseResponse = await fetch(`https://api.sendpulse.com/addressbooks/${env.SENDPULSE_MAILING_LIST_ID}/emails`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authData.access_token}`,
    },
    body: JSON.stringify({
      emails: [
        {
          email: data.email,
          variables: {
            name: data.name,
          },
        },
      ],
      confirmation: 'force',
      sender_email: 'contact@friendsofutevalleypark.com',
      template_id: env.SENDPULSE_CONFIRMATION_ID,
      message_lang: 'en',
    }),
  });

  const sendpulseData = await sendpulseResponse.json();

  if (sendpulseData.result === true) {
    return new Response(JSON.stringify({ status: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ status: false, message: sendpulseData.result }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

async function generateRequestData(request) {
  const contentType = request.headers.get('content-type');
  if (contentType.includes('application/json')) {
    const body = await request.json();
    return {
      email: body.payload.email,
      name: body.payload.name,
    };
  } else if (contentType.includes('application/x-www-form-urlencoded')) {
    const formData = await request.formData();
    const body = Object.fromEntries(formData);
    return {
      email: body.payload.email,
      name: body.payload.name,
    };
  }
  throw new Error('Unsupported content type');
}
