import test from 'node:test';
import assert from 'node:assert/strict';
import { transitionOrderStatus, allowedOrderTransitions } from '../lib/order-status.mjs';
test('allows ordered lifecycle changes', () => {
  assert.equal(transitionOrderStatus('pending', 'reviewing').to, 'reviewing');
  assert.deepEqual(allowedOrderTransitions('completed'), []);
});
test('rejects skipping statuses and reversing completed orders', () => {
  assert.throws(() => transitionOrderStatus('pending', 'completed'));
  assert.throws(() => transitionOrderStatus('completed', 'processing'));
});
test('requires cancellation explanation', () => {
  assert.throws(() => transitionOrderStatus('reviewing', 'cancelled', 'x'));
  assert.equal(transitionOrderStatus('reviewing', 'cancelled', 'Customer request').reason, 'Customer request');
});
test('reject NUL in cancellation reason', () => { assert.throws(() => transitionOrderStatus('pending','cancelled','Customer\0cancelled')); });
test('terminal state remains closed', () => { assert.deepEqual(allowedOrderTransitions('cancelled'),[]); });
test('reject object current state', () => { assert.throws(() => transitionOrderStatus({},'completed'),TypeError); });
