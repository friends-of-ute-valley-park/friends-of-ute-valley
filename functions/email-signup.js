export async function onRequestPost(context) {
  try {
    const { request, env } = context;

    const data = await generateRequestData(request);

    if (!isValidEmail(data.email)) {
      return jsonResponse({ status: false, message: 'A valid email address is required.' }, 400);
    }

    if (!data.name) {
      return jsonResponse({ status: false, message: 'Name is required.' }, 400);
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

    if (!authResponse.ok) {
      return jsonResponse({ status: false, message: 'Newsletter service authentication failed. Please try again later.' }, 502);
    }

    const authData = await authResponse.json();
    if (!authData.access_token) {
      return jsonResponse({ status: false, message: 'Newsletter service authentication failed. Please try again later.' }, 502);
    }

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
        sender_email: 'contact@fuvp.org',
        template_id: env.SENDPULSE_CONFIRMATION_ID,
        message_lang: 'en',
      }),
    });

    const sendpulseData = await sendpulseResponse.json();

    if (sendpulseResponse.ok && sendpulseData.result === true) {
      return jsonResponse({ status: true });
    }

    return jsonResponse({ status: false, message: 'Newsletter signup failed. Please try again later.' }, 502);
  } catch (error) {
    console.error('Newsletter signup failed:', error);
    return jsonResponse({ status: false, message: 'Newsletter signup failed. Please try again later.' }, 400);
  }
}

async function generateRequestData(request) {
  const contentType = request.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    const body = await request.json();
    return {
      email: normalizeField(body.payload?.email),
      name: normalizeField(body.payload?.name),
    };
  } else if (contentType.includes('application/x-www-form-urlencoded')) {
    const formData = await request.formData();
    return {
      email: normalizeField(formData.get('email') ?? formData.get('payload.email')),
      name: normalizeField(formData.get('name') ?? formData.get('payload.name')),
    };
  }
  throw new Error('Unsupported content type');
}

function normalizeField(value) {
  return value?.toString().trim() || '';
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
