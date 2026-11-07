const MAX_TZS = 100_000_000;
function validMoney(n) { return Number.isSafeInteger(n) && n >= 0 && n <= MAX_TZS; }

export function calculateServiceQuote(items, discountTzs = 0) {
  if (!Array.isArray(items) || items.length < 1 || items.length > 20) {
    throw new RangeError('Quote requires 1–20 service items');
  }
  if (!validMoney(discountTzs)) throw new RangeError('Invalid discount in TZS');
  let subtotalTzs = 0;
  const normalized = items.map(item => {
    if (!item || typeof item !== 'object' || Array.isArray(item) ||
        typeof item.serviceId !== 'string' || !/^[a-z0-9][a-z0-9_-]{0,63}$/i.test(item.serviceId) ||
        !validMoney(item.unitPriceTzs) || !Number.isSafeInteger(item.quantity) ||
        item.quantity < 1 || item.quantity > 100) {
      throw new RangeError('Invalid quote item');
    }
    const lineTotalTzs = item.unitPriceTzs * item.quantity;
    if (!Number.isSafeInteger(lineTotalTzs)) throw new RangeError('Quote overflow');
    subtotalTzs += lineTotalTzs;
    if (!Number.isSafeInteger(subtotalTzs) || subtotalTzs > MAX_TZS) throw new RangeError('Quote exceeds limit');
    return { serviceId: item.serviceId.toLowerCase(), unitPriceTzs: item.unitPriceTzs, quantity: item.quantity, lineTotalTzs };
  });
  if (new Set(normalized.map(i => i.serviceId.toLowerCase())).size !== normalized.length) throw new RangeError('Duplicate service');
  if (discountTzs > subtotalTzs) throw new RangeError('Discount exceeds subtotal');
  return { items: normalized, subtotalTzs, discountTzs, totalTzs: subtotalTzs - discountTzs, currency: 'TZS' };
}
