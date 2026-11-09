import test from 'node:test';
import assert from 'node:assert/strict';
import { createQuoteValidity, isQuoteExpired } from '../lib/quote-expiry.mjs';
test('creates deterministic expiry and checks boundary', () => {
  const q = createQuoteValidity('2026-11-04T10:00:00Z', 30);
  assert.equal(q.expiresAt, '2026-11-04T10:30:00.000Z');
  assert.equal(isQuoteExpired(q.expiresAt, '2026-11-04T10:29:59Z'), false);
  assert.equal(isQuoteExpired(q.expiresAt, '2026-11-04T10:30:00Z'), true);
});
test('rejects invalid dates and excessive validity', () => {
  assert.throws(() => createQuoteValidity('invalid'));
  assert.throws(() => createQuoteValidity('2026-11-04', 50000));
  assert.throws(() => isQuoteExpired('not-a-date'));
});
test('reject expiring outside date limits', () => { assert.throws(() => createQuoteValidity(8.64e15,60),RangeError); });

test('reject boolean issue timestamp coercion', () => { assert.throws(() => createQuoteValidity(true),TypeError); });
