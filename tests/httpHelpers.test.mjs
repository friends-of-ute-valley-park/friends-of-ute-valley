import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { isValidEmail, jsonResponse, normalizeField } from '../src/utils/http.js';

await describe('Cloudflare function HTTP helpers', async () => {
  await it('normalizes optional form fields to trimmed strings', () => {
    assert.equal(normalizeField('  hello  '), 'hello');
    assert.equal(normalizeField(42), '42');
    assert.equal(normalizeField(null), '');
  });

  await it('accepts ordinary email addresses and rejects malformed ones', () => {
    assert.equal(isValidEmail('volunteer@example.com'), true);
    assert.equal(isValidEmail('not-an-email'), false);
    assert.equal(isValidEmail('missing-domain@'), false);
  });

  await it('creates JSON responses with the requested status', async () => {
    const response = jsonResponse({ status: false }, 400);

    assert.equal(response.status, 400);
    assert.equal(response.headers.get('Content-Type'), 'application/json');
    assert.deepEqual(await response.json(), { status: false });
  });
});
