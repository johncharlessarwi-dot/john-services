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
test('reject mixed-case duplicate service quotes', () => { assert.throws(() => calculateServiceQuote([{serviceId:'HESLB',unitPriceTzs:10,quantity:1},{serviceId:'heslb',unitPriceTzs:20,quantity:1}])); });
test('normalize quote item identifiers', () => { assert.equal(calculateServiceQuote([{serviceId:'RITA',unitPriceTzs:100,quantity:1}]).items[0].serviceId,'rita'); });
test('reject fractional quantities', () => { assert.throws(() => calculateServiceQuote([{serviceId:'rita',unitPriceTzs:100,quantity:1.2}])); });
test('reject zero quantity', () => { assert.throws(() => calculateServiceQuote([{serviceId:'rita',unitPriceTzs:100,quantity:0}])); });
test('reject discount over subtotal', () => { assert.throws(() => calculateServiceQuote([{serviceId:'rita',unitPriceTzs:100,quantity:1}],101)); });
