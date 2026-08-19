import assert from 'node:assert/strict';
import test from 'node:test';
import { runFormSubmission } from '../src/components/formLifecycle.ts';

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

await test('validation failure enters error without sending a request', async () => {
  const lifecycle = { value: 'idle' };
  let requested = false;

  const result = await runFormSubmission(lifecycle, {
    validate: () => false,
    request: async () => {
      requested = true;
      return jsonResponse({ status: true });
    },
  });

  assert.equal(lifecycle.value, 'error');
  assert.equal(requested, false);
  assert.deepEqual(result, { data: null, error: null, submitted: false });
});

await test('submission stays loading until a 200 status:true response succeeds', async () => {
  const lifecycle = { value: 'idle' };
  let resolveRequest;
  const response = new Promise((resolve) => {
    resolveRequest = resolve;
  });

  const submission = runFormSubmission(lifecycle, {
    validate: () => true,
    request: () => response,
  });

  assert.equal(lifecycle.value, 'submitting');
  resolveRequest(jsonResponse({ status: true }));
  const result = await submission;

  assert.equal(lifecycle.value, 'success');
  assert.deepEqual(result.data, { status: true });
});

await test('a 200 status:false response enters error', async () => {
  const lifecycle = { value: 'idle' };

  const result = await runFormSubmission(lifecycle, {
    validate: () => true,
    request: async () => jsonResponse({ status: false, message: 'Rejected' }),
  });

  assert.equal(lifecycle.value, 'error');
  assert.deepEqual(result.data, { status: false, message: 'Rejected' });
});

await test('a non-2xx response enters error even when the body says status:true', async () => {
  const lifecycle = { value: 'idle' };

  await runFormSubmission(lifecycle, {
    validate: () => true,
    request: async () => jsonResponse({ status: true }, 500),
  });

  assert.equal(lifecycle.value, 'error');
});

await test('a failed submission can be retried successfully', async () => {
  const lifecycle = { value: 'idle' };
  let attempt = 0;
  const options = {
    validate: () => true,
    request: async () => {
      attempt += 1;
      return attempt === 1 ? jsonResponse({ status: false }) : jsonResponse({ status: true });
    },
  };

  await runFormSubmission(lifecycle, options);
  assert.equal(lifecycle.value, 'error');

  await runFormSubmission(lifecycle, options);
  assert.equal(lifecycle.value, 'success');
  assert.equal(attempt, 2);
});
