import test from 'node:test';
import assert from 'node:assert/strict';
import { createOrderReference } from '../lib/order-reference.mjs';
test('generates stable format with injected entropy for tests', () => {
  assert.equal(createOrderReference('2026-11-04T10:00:00Z', () => Buffer.from('aabbccddeeff', 'hex')), 'JOS-20261104-AABBCCDDEEFF');
});
test('uses random references by default', () => {
  const first = createOrderReference('2026-11-04');
  const second = createOrderReference('2026-11-04');
  assert.match(first, /^JOS-20261104-[0-9A-F]{12}$/);
  assert.notEqual(first, second);
});
test('rejects invalid date or random source', () => {
  assert.throws(() => createOrderReference('bad'));
  assert.throws(() => createOrderReference('2026-11-04', () => Buffer.alloc(2)));
});
