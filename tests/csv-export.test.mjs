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
  assert.match(csv, /"'+cmd"/);
  assert.match(csv, /"'@malicious"/);
});
test('rejects invalid totals and non-arrays', () => {
  assert.throws(() => exportOrderSummaryCsv({}));
  assert.throws(() => exportOrderSummaryCsv([{ totalTzs: -1 }]));
});
