import { randomBytes } from 'node:crypto';
export function createOrderReference(date = new Date(), random = randomBytes) {
  const d = new Date(date);
  if (!Number.isFinite(d.getTime())) throw new TypeError('Invalid order date');
  if (typeof random !== 'function') throw new TypeError('Invalid random source');
  const bytes = random(6);
  if (!Buffer.isBuffer(bytes) || bytes.length !== 6) throw new TypeError('Random source must return six bytes');
  const day = d.toISOString().slice(0, 10).replaceAll('-', '');
  return `JOS-${day}-${bytes.toString('hex').toUpperCase()}`;
}
