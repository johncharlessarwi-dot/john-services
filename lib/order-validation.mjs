const MAX_NAME = 120;
const MAX_NOTES = 1000;
const MAX_ITEMS = 20;

export function validateOrderDraft(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { ok: false, errors: ['Order must be an object'] };
  }
  const errors = [];
  const name = typeof input.customerName === 'string' ? input.customerName.trim() : '';
  const phone = typeof input.phone === 'string' ? input.phone.trim() : '';
  const notes = typeof input.notes === 'string' ? input.notes.trim() : '';
  const services = input.services;
  if (name.length < 2 || name.length > MAX_NAME) errors.push('Customer name must be 2–120 characters');
  if (!/^\+?[0-9]{9,15}$/.test(phone)) errors.push('Phone must have 9–15 digits and optional leading +');
  if (notes.length > MAX_NOTES) errors.push('Notes exceed 1000 characters');
  if (!Array.isArray(services) || services.length < 1 || services.length > MAX_ITEMS ||
      services.some(s => typeof s !== 'string' || !/^[a-z0-9][a-z0-9_-]{0,63}$/i.test(s))) {
    errors.push('Services must contain 1–20 valid service identifiers');
  } else if (new Set(services).size !== services.length) {
    errors.push('Duplicate service identifiers');
  }
  return errors.length ? { ok: false, errors } :
    { ok: true, value: { customerName: name, phone, notes, services: [...services] } };
}
