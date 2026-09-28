import test from 'node:test';
import assert from 'node:assert/strict';
import { isProdHost } from './analytics.js';

test('analytics runs on the live site only, so local and preview visits never pollute the data', () => {
  for (const h of ['surogate.ai', 'www.surogate.ai']) assert.equal(isProdHost(h), true, h);
  for (const h of ['localhost', '127.0.0.1', '', 'surogate.ai.evil.com', 'invergent-ai.github.io', 'preview.surogate.ai'])
    assert.equal(isProdHost(h), false, h);
});
