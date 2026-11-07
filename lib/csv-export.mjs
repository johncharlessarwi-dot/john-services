function escapeCsv(value) {
  const text = String(value ?? '');
  const safe = /^[\s\u200b-\u200f\u2060\ufeff]*[=+@\-]/u.test(text) ? "'" + text : text;
  return '"' + safe.replaceAll('"', '""') + '"';
}
export function exportOrderSummaryCsv(orders) {
  if (!Array.isArray(orders) || orders.length > 10_000) throw new RangeError('Expected up to 10000 orders');
  const header = ['reference', 'customerName', 'status', 'totalTzs'];
  const rows = orders.map(order => {
    if (!order || typeof order !== 'object' || Array.isArray(order)) throw new TypeError('Invalid order');
    if (!Number.isSafeInteger(order.totalTzs) || order.totalTzs < 0) throw new RangeError('Invalid total');
    return header.map(key => escapeCsv(order[key])).join(',');
  });
  return '\uFEFF' + header.map(escapeCsv).join(',') + '\r\n' + rows.join('\r\n') + (rows.length ? '\r\n' : '');
}
