import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeTanzaniaMobile } from '../lib/tz-phone.mjs';
test('normalizes local and international mobile formats', () => {
  for (const n of ['0698170989', '698170989', '255698170989', '+255 698 170 989']) {
    assert.equal(normalizeTanzaniaMobile(n).e164, '+255698170989');
  }
});
test('rejects foreign, malformed, fixed-line and unsafe input', () => {
  for (const n of ['+254712345678', '123', '0281234567', '0698170989x']) {
    assert.throws(() => normalizeTanzaniaMobile(n));
  }
  assert.throws(() => normalizeTanzaniaMobile(null));
});
test('reject very long telephone string', () => { assert.throws(() => normalizeTanzaniaMobile(' '.repeat(100)+'0698170989'),RangeError); });
