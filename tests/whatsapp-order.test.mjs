import test from 'node:test';
import assert from 'node:assert/strict';
import { createWhatsAppOrderLink } from '../lib/whatsapp-order.mjs';

test('uses business WhatsApp and URL-encodes order details', () => {
  const url = createWhatsAppOrderLink({ customerName: 'John & Mary', serviceName: 'HESLB appeal', reference: 'ORD-20' });
  const parsed = new URL(url);
  assert.equal(parsed.hostname, 'wa.me');
  assert.equal(parsed.pathname, '/255698170989');
  assert.match(parsed.searchParams.get('text'), /John & Mary/);
  assert.match(parsed.searchParams.get('text'), /ORD-20/);
});
test('rejects unbounded and malformed data', () => {
  assert.throws(() => createWhatsAppOrderLink({ customerName: 'A', serviceName: 'B', reference: '../' }));
  assert.throws(() => createWhatsAppOrderLink({ customerName: 'A', serviceName: '' }));
  assert.throws(() => createWhatsAppOrderLink({ customerName: 'A', serviceName: 'B' }, { businessNumber: '+invalid' }));
});
test('reject customer newline injection', () => { assert.throws(() => createWhatsAppOrderLink({customerName:'John\nPaid',serviceName:'CV'})); });
test('reject service newline injection', () => { assert.throws(() => createWhatsAppOrderLink({customerName:'John',serviceName:'CV\nApproved'})); });
test('reject NUL in service label', () => { assert.throws(() => createWhatsAppOrderLink({customerName:'John',serviceName:'CV\0'})); });
test('encode Swahili Unicode message', () => { assert.match(new URL(createWhatsAppOrderLink({customerName:'Juma',serviceName:'Maombi ya chuo'})).searchParams.get('text'),/Maombi ya chuo/); });
test('reject nonstring business number', () => { assert.throws(() => createWhatsAppOrderLink({customerName:'John',serviceName:'CV'},{businessNumber:255698170989}),TypeError); });
