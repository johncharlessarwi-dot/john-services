const MAX_VALIDITY_MINUTES = 30 * 24 * 60;
export function createQuoteValidity(issuedAt, minutes = 60) {
  if (typeof issuedAt === 'boolean' || (typeof issuedAt === 'object' && !(issuedAt instanceof Date))) throw new TypeError('Invalid issue timestamp type');
  const issued = new Date(issuedAt);
  if (!Number.isFinite(issued.getTime())) throw new TypeError('Invalid issue timestamp');
  if (!Number.isSafeInteger(minutes) || minutes < 1 || minutes > MAX_VALIDITY_MINUTES) throw new RangeError('Invalid quote validity');
  const expires = new Date(issued.getTime() + minutes * 60_000);
  if (!Number.isFinite(expires.getTime())) throw new RangeError('Quote expiry is outside the supported date range');
  return Object.freeze({ issuedAt: issued.toISOString(), expiresAt: expires.toISOString() });
}
export function isQuoteExpired(expiresAt, now = Date.now()) {
  if (typeof expiresAt === 'boolean' || (typeof expiresAt === 'object' && !(expiresAt instanceof Date))) throw new TypeError('Invalid expiry timestamp type');
  const expiry = new Date(expiresAt).getTime();
  const current = new Date(now).getTime();
  if (!Number.isFinite(expiry) || !Number.isFinite(current)) throw new TypeError('Invalid timestamp');
  return current >= expiry;
}
