const { parse } = require('querystring')
require('dotenv').config()
const axios = require('axios').default

exports.handler = async function (event, context, callback) {
  const data = generateRequestData(event.body)
  // eslint-disable-next-line no-console
  console.log(data)
  if (!data.email) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        status: false,
        message: 'Email address required'
      })
    })
  }

  if (!data.name) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        status: false,
        message: 'Name required'
      })
    })
  }
  const { access_token: accessToken } = await axios.post('https://api.sendpulse.com/oauth/access_token', {
    grant_type: 'client_credentials',
    client_id: process.env.SENDPULSE_CLIENT_ID,
    client_secret: process.env.SENDPULSE_CLIENT_SECRET
  })

  const config = {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  }

  await axios.post(`https://api.sendpulse.com/addressbooks/${process.env.SENDPULSE_MAILING_LIST_ID}/emails`, {
    emails: [
      {
        email: data.email,
        variables: {
          name: data.name
        }
      }
    ],
    confirmation: 'force',
    sender_email: 'contact@friendsofutevalleypark.com',
    template_id: process.env.SENDPULSE_CONFIRMATION_ID,
    message_lang: 'en'
  }, config)
}

function generateRequestData (eventBody) {
  let body = {}
  try {
    body = JSON.parse(eventBody)
  } catch (e) {
    body = parse(eventBody)
  }

  return {
    email: body.email,
    name: body.name
  }
}
