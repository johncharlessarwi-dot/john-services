import test from 'node:test';
import assert from 'node:assert/strict';
import { validateOrderDraft } from '../lib/order-validation.mjs';

test('accepts a valid order and trims text', () => {
  const result = validateOrderDraft({ customerName: '  John  ', phone: '+255698170989', services: ['heslb'], notes: '  Follow up  ' });
  assert.equal(result.ok, true);
  assert.equal(result.value.customerName, 'John');
  assert.equal(result.value.notes, 'Follow up');
});
test('rejects malformed and duplicate service IDs', () => {
  assert.equal(validateOrderDraft({ customerName: 'John', phone: '255698170989', services: ['x', 'x'] }).ok, false);
  assert.equal(validateOrderDraft({ customerName: 'John', phone: '255698170989', services: ['../path'] }).ok, false);
});
test('rejects malformed phone, excessive notes and arrays', () => {
  assert.equal(validateOrderDraft([]).ok, false);
  assert.equal(validateOrderDraft({ customerName: 'John', phone: 'abc', services: ['valid'] }).ok, false);
  assert.equal(validateOrderDraft({ customerName: 'John', phone: '255698170989', services: ['valid'], notes: 'x'.repeat(1001) }).ok, false);
});

test('rejects case-insensitive duplicate service IDs', () => {
  const result = validateOrderDraft({ customerName: 'John', phone: '255698170989', services: ['HESLB', 'heslb'] });
  assert.equal(result.ok, false);
  assert.ok(result.errors.includes('Duplicate service identifiers'));
});

test('accepts distinct mixed-case service identifiers', () => {
  const result = validateOrderDraft({ customerName: 'John', phone: '255698170989', services: ['HESLB', 'rita'] });
  assert.equal(result.ok, true);
});
