import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateServiceQuote } from '../lib/service-pricing.mjs';

test('calculates totals in integer TZS', () => {
  const quote = calculateServiceQuote([{ serviceId: 'rita', unitPriceTzs: 5000, quantity: 2 }], 1000);
  assert.equal(quote.subtotalTzs, 10000);
  assert.equal(quote.totalTzs, 9000);
  assert.equal(quote.currency, 'TZS');
});
test('rejects fractional, negative and invalid discounts', () => {
  assert.throws(() => calculateServiceQuote([{ serviceId: 'a', unitPriceTzs: 1.5, quantity: 1 }]));
  assert.throws(() => calculateServiceQuote([{ serviceId: 'a', unitPriceTzs: -1, quantity: 1 }]));
  assert.throws(() => calculateServiceQuote([{ serviceId: 'a', unitPriceTzs: 100, quantity: 1 }], 101));
});
test('rejects duplicate services and oversized quotes', () => {
  assert.throws(() => calculateServiceQuote([{ serviceId: 'a', unitPriceTzs: 1, quantity: 1 }, { serviceId: 'a', unitPriceTzs: 2, quantity: 1 }]));
  assert.throws(() => calculateServiceQuote([{ serviceId: 'a', unitPriceTzs: 100000000, quantity: 2 }]));
});
