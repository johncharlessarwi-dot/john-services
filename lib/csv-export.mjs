function escapeCsv(value) {
  const text = String(value ?? '');
  if (text.length > 10_000) throw new RangeError('CSV field too long');
  const safe = /^[\s\u200b-\u200f\u202a-\u202e\u2060\u2066-\u2069\ufeff]*[=+@\-]/u.test(text) ? "'" + text : text;
  return '"' + safe.replaceAll('"', '""') + '"';
}
export function exportOrderSummaryCsv(orders) {
  if (!Array.isArray(orders) || orders.length > 10_000) throw new RangeError('Expected up to 10000 orders');
  const header = ['reference', 'customerName', 'status', 'totalTzs'];
  const rows = ['\uFEFF' + header.map(escapeCsv).join(',') + '\r\n'];
  let bytes = Buffer.byteLength(rows[0], 'utf8');
  for (const order of orders) {
    if (!order || typeof order !== 'object' || Array.isArray(order) || (Object.getPrototypeOf(order) !== Object.prototype && Object.getPrototypeOf(order) !== null)) throw new TypeError('Invalid order');
    if (typeof order.reference !== 'string' || typeof order.customerName !== 'string' || typeof order.status !== 'string') throw new TypeError('Missing order fields');
    if (!Number.isSafeInteger(order.totalTzs) || order.totalTzs < 0 || order.totalTzs > 100_000_000) throw new RangeError('Invalid total');
    const row = header.map(key => escapeCsv(order[key])).join(',') + '\r\n';
    bytes += Buffer.byteLength(row, 'utf8');
    if (bytes > 5 * 1024 * 1024) throw new RangeError('CSV export exceeds size budget');
    rows.push(row);
  }
  return rows.join('');
}
