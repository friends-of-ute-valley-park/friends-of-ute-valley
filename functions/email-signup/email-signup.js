import { parse } from 'querystring';
import axios from 'axios';
require('dotenv').config();

export async function handler(event) {
  const data = generateRequestData(event.body);
  // eslint-disable-next-line no-console
  console.log(data);
  if (!data.email) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        status: false,
        message: 'Email address required',
      }),
    };
  }

  if (!data.name) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        status: false,
        message: 'Name required',
      }),
    };
  }
  const authRequest = await axios.post('https://api.sendpulse.com/oauth/access_token', {
    grant_type: 'client_credentials',
    client_id: process.env.SENDPULSE_CLIENT_ID,
    client_secret: process.env.SENDPULSE_CLIENT_SECRET,
  });

  const config = {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${authRequest.data.access_token}`,
    },
  };

  const res = await axios.post(
    `https://api.sendpulse.com/addressbooks/${process.env.SENDPULSE_MAILING_LIST_ID}/emails`,
    {
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
      template_id: process.env.SENDPULSE_CONFIRMATION_ID,
      message_lang: 'en',
    },
    config,
  );

  if (res.data.result === true) {
    return {
      statusCode: 200,
      body: JSON.stringify({ status: true }),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ status: false, message: res.data.result }),
  };
}

function generateRequestData(eventBody) {
  let body = {};
  try {
    body = JSON.parse(eventBody);
  } catch (e) {
    body = parse(eventBody);
  }

  return {
    email: body.payload.email,
    name: body.payload.name,
  };
}
