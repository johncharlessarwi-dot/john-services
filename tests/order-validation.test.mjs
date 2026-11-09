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
test('reject NUL in customer name', () => { assert.equal(validateOrderDraft({customerName:'Jo\0hn',phone:'255698170989',services:['web']}).ok,false); });
test('reject newline in customer name', () => { assert.equal(validateOrderDraft({customerName:'John\nAdmin',phone:'255698170989',services:['web']}).ok,false); });
test('lowercase service IDs', () => { assert.deepEqual(validateOrderDraft({customerName:'John',phone:'255698170989',services:['HESLB']}).value.services,['heslb']); });
test('reject phone with newline', () => { assert.equal(validateOrderDraft({customerName:'John',phone:'255698\n170989',services:['web']}).ok,false); });
test('reject too many services', () => { assert.equal(validateOrderDraft({customerName:'John',phone:'255698170989',services:Array.from({length:21},(_,i)=>`svc${i}`)}).ok,false); });
test('reject overlong customer identity', () => { assert.equal(validateOrderDraft({customerName:'J'.repeat(121),phone:'255698170989',services:['web']}).ok,false); });
test('reject Date masquerading as an order', () => { assert.equal(validateOrderDraft(Object.assign(new Date(),{customerName:'John',phone:'255698170989',services:['web']})).ok,false); });

test('reject customer notes with NUL control', () => { assert.equal(validateOrderDraft({customerName:'John',phone:'255698170989',services:['web'],notes:'test\x00hidden'}).ok,false); });
