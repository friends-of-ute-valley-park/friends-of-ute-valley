import { parse } from 'querystring';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
require('dotenv').config();

export async function handler(event, context, callback) {
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

  if (!data.message) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        status: false,
        message: 'Message required',
      }),
    };
  }

  const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

  const jwtFromEnv = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: SCOPES,
  });

  // spreadsheet key is the long id in the sheets URL
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, jwtFromEnv);

  await doc.loadInfo(); // loads document properties and worksheets

  const sheet = doc.sheetsByIndex[0];

  await sheet.addRow({
    Date: new Intl.DateTimeFormat('en-US').format(new Date()),
    Name: data.name,
    Email: data.email,
    Category: data.category,
    Message: data.message,
  });
  await sheet.saveUpdatedCells(); // save all updates in one call

  return {
    statusCode: 200,
    body: JSON.stringify({ status: true }),
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
    category: body.payload.category,
    message: body.payload.message,
  };
}
