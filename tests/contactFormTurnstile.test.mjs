import assert from 'node:assert/strict';
import test from 'node:test';
import { resetTurnstileAfterSubmission } from '../src/components/contactFormTurnstile.ts';
import { runFormSubmission } from '../src/components/formLifecycle.ts';

function jsonResponse(body) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

await test('contact retry resets the retained widget and sends a fresh Turnstile token', async () => {
  const lifecycle = { value: 'idle' };
  const submittedTokens = [];
  const resetWidgetIds = [];
  let currentToken = 'token-1';
  let attempt = 0;

  const turnstile = {
    reset(widgetId) {
      resetWidgetIds.push(widgetId);
      currentToken = 'token-2';
    },
  };
  const options = {
    validate: () => Boolean(currentToken),
    request: async () => {
      submittedTokens.push(currentToken);
      attempt += 1;
      return jsonResponse({ status: attempt > 1 });
    },
  };

  const failedResult = await runFormSubmission(lifecycle, options);
  resetTurnstileAfterSubmission(turnstile, 'contact-widget', failedResult.submitted);

  assert.equal(lifecycle.value, 'error');
  assert.deepEqual(resetWidgetIds, ['contact-widget']);
  assert.equal(currentToken, 'token-2');

  await runFormSubmission(lifecycle, options);

  assert.equal(lifecycle.value, 'success');
  assert.deepEqual(submittedTokens, ['token-1', 'token-2']);
});
