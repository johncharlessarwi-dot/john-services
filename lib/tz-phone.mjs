export function normalizeTanzaniaMobile(input) {
  if (typeof input !== 'string') throw new TypeError('Phone must be text');
  if (input.length > 40) throw new RangeError('Phone input is too long');
  if (/[^\x00-\x7f]/.test(input) && /[^\S\r\n\t ]/u.test(input)) throw new RangeError('Unsupported phone separator');
  const compact = input.replace(/[\s()-]/g, '');
  let national;
  if (/^\+255[67]\d{8}$/.test(compact)) national = compact.slice(4);
  else if (/^255[67]\d{8}$/.test(compact)) national = compact.slice(3);
  else if (/^0[67]\d{8}$/.test(compact)) national = compact.slice(1);
  else if (/^[67]\d{8}$/.test(compact)) national = compact;
  else throw new RangeError('Expected a Tanzanian 06/07 mobile number');
  return Object.freeze({ e164: '+255' + national, whatsapp: '255' + national, local: '0' + national });
}
