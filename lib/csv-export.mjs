function escapeCsv(value) {
  const text = String(value ?? '');
  const safe = /^[\s]*[=+@\-]/.test(text) ? "'" + text : text;
  return '"' + safe.replaceAll('"', '""') + '"';
}
export function exportOrderSummaryCsv(orders) {
  if (!Array.isArray(orders) || orders.length > 10_000) throw new RangeError('Expected up to 10000 orders');
  const header = ['reference', 'customerName', 'status', 'totalTzs'];
  const rows = orders.map(order => {
    if (!order || typeof order !== 'object') throw new TypeError('Invalid order');
    if (!Number.isSafeInteger(order.totalTzs) || order.totalTzs < 0) throw new RangeError('Invalid total');
    return header.map(key => escapeCsv(order[key])).join(',');
  });
  return '\uFEFF' + header.map(escapeCsv).join(',') + '\r\n' + rows.join('\r\n') + (rows.length ? '\r\n' : '');
}
