const { parse } = require('querystring');
const { GoogleSpreadsheet } = require('google-spreadsheet');
require('dotenv').config();

exports.handler = async function (event, context, callback) {
  const data = generateRequestData(event.body);
  // eslint-disable-next-line no-console
  console.log(data);
  if (!data.email) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        status: false,
        message: 'Email address required',
      }),
    });
  }

  if (!data.name) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        status: false,
        message: 'Name required',
      }),
    });
  }

  if (!data.message) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        status: false,
        message: 'Message required',
      }),
    });
  }

  // spreadsheet key is the long id in the sheets URL
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

  // use service account creds
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  });

  await doc.loadInfo(); // loads document properties and worksheets

  const sheet = doc.sheetsByIndex[0];

  await sheet.addRow({
    Name: data.name,
    Email: data.email,
    Category: data.category,
    Message: data.message,
  });
  await sheet.saveUpdatedCells(); // save all updates in one call

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({ status: true }),
  });
};

function generateRequestData(eventBody) {
  let body = {};
  try {
    body = JSON.parse(eventBody);
  } catch (e) {
    body = parse(eventBody);
  }

  return {
    email: body.email,
    name: body.name,
    category: body.category,
    message: body.message,
  };
}
