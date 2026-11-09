import test from 'node:test';
import assert from 'node:assert/strict';
import { exportOrderSummaryCsv } from '../lib/csv-export.mjs';
test('outputs CSV rows with escaped quotes', () => {
  const csv = exportOrderSummaryCsv([{ reference: 'A-1', customerName: 'John "JC"', status: 'pending', totalTzs: 2000 }]);
  assert.match(csv, /John ""JC""/);
  assert.match(csv, /2000/);
});
test('prefixes spreadsheet formula-shaped values', () => {
  const csv = exportOrderSummaryCsv([{ reference: '=HYPERLINK("x")', customerName: '+cmd', status: '@malicious', totalTzs: 0 }]);
  assert.match(csv, /"'=HYPERLINK/);
  assert.ok(csv.includes(`"'+cmd"`));
  assert.match(csv, /"'@malicious"/);
});
test('rejects invalid totals and non-arrays', () => {
  assert.throws(() => exportOrderSummaryCsv({}));
  assert.throws(() => exportOrderSummaryCsv([{ totalTzs: -1 }]));
});
test('neutralize zero-width-prefixed formulas', () => { assert.ok(exportOrderSummaryCsv([{reference:'\u200b=1+1',customerName:'John',status:'pending',totalTzs:1}]).includes('"\'\u200b=1+1"')); });
test('neutralize BOM-prefixed formulas', () => { assert.ok(exportOrderSummaryCsv([{reference:'\ufeff=1+1',customerName:'John',status:'pending',totalTzs:1}]).includes('"\'\ufeff=1+1"')); });
test('reject array order records', () => { assert.throws(() => exportOrderSummaryCsv([[]]),TypeError); });
test('reject oversized spreadsheet values', () => { assert.throws(() => exportOrderSummaryCsv([{reference:'a'.repeat(10001),customerName:'John',status:'pending',totalTzs:10}]),RangeError); });
test('reject missing order reference', () => { assert.throws(() => exportOrderSummaryCsv([{customerName:'John',status:'pending',totalTzs:10}]),TypeError); });
test('reject exotic order prototype', () => { assert.throws(() => exportOrderSummaryCsv([Object.assign(new Date(),{reference:'A',customerName:'John',status:'pending',totalTzs:1})]),TypeError); });

test('neutralize bidi-prefixed CSV formulas', () => { const csv=exportOrderSummaryCsv([{reference:'\u202e=1+1',customerName:'John',status:'pending',totalTzs:1}]); assert.ok(csv.includes('"\'\u202e=1+1"')); });

test('reject excessively high spreadsheet total', () => { assert.throws(() => exportOrderSummaryCsv([{reference:'A',customerName:'John',status:'pending',totalTzs:100_000_001}]),RangeError); });

test('reject oversized aggregate spreadsheet export', () => { const records=Array.from({length:600},(_,i)=>({reference:`A-${i}`,customerName:'x'.repeat(10000),status:'pending',totalTzs:1})); assert.throws(() => exportOrderSummaryCsv(records),RangeError); });
