import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { waitForMapLoad } from '../src/utils/waitForMapLoad.ts';

class FakeMap {
  #loaded;
  #listeners = new Map();

  constructor({ loaded = false } = {}) {
    this.#loaded = loaded;
  }

  loaded() {
    return this.#loaded;
  }

  once(event, listener) {
    this.#listeners.set(event, listener);
  }

  off(event, listener) {
    if (this.#listeners.get(event) === listener) this.#listeners.delete(event);
  }

  emit(event, payload) {
    this.#listeners.get(event)?.(payload);
  }

  listenerCount() {
    return this.#listeners.size;
  }
}

await describe('waitForMapLoad', async () => {
  await it('resolves immediately when a cached map already finished loading', async () => {
    const map = new FakeMap({ loaded: true });

    await waitForMapLoad(map, new AbortController().signal);

    assert.equal(map.listenerCount(), 0);
  });

  await it('resolves on load and removes setup listeners', async () => {
    const map = new FakeMap();
    const pending = waitForMapLoad(map, new AbortController().signal);

    map.emit('load');
    await pending;

    assert.equal(map.listenerCount(), 0);
  });

  await it('rejects map errors and removes setup listeners', async () => {
    const map = new FakeMap();
    const pending = waitForMapLoad(map, new AbortController().signal);

    map.emit('error', { error: new Error('basemap unavailable') });

    await assert.rejects(pending, /basemap unavailable/);
    assert.equal(map.listenerCount(), 0);
  });

  await it('rejects aborts and removes setup listeners', async () => {
    const map = new FakeMap();
    const controller = new AbortController();
    const pending = waitForMapLoad(map, controller.signal);

    controller.abort();

    await assert.rejects(pending, { name: 'AbortError' });
    assert.equal(map.listenerCount(), 0);
  });
});
