const BUSINESS_WHATSAPP = '255698170989';

export function createWhatsAppOrderLink(order, { businessNumber = BUSINESS_WHATSAPP } = {}) {
  if (typeof businessNumber !== 'string' || !/^\d{9,15}$/.test(businessNumber)) throw new TypeError('Invalid WhatsApp destination');
  if (/^0+$/.test(businessNumber)) throw new TypeError('Invalid WhatsApp destination');
  if (!order || typeof order !== 'object' ||
      typeof order.customerName !== 'string' || typeof order.serviceName !== 'string') {
    throw new TypeError('Order requires customerName and serviceName');
  }
  const customerName = order.customerName.trim();
  const serviceName = order.serviceName.trim();
  if (/[\r\n\x00-\x1f\x7f]/.test(customerName)) throw new RangeError('Customer name must be one line');
  if (!customerName || customerName.length > 120 || !serviceName || serviceName.length > 160) {
    throw new RangeError('Invalid order message fields');
  }
  if (/[\r\n\x00-\x1f\x7f]/.test(serviceName)) throw new RangeError('Service name must be one line');
  const reference = typeof order.reference === 'string' ? order.reference.trim() : '';
  if (reference && !/^[a-z0-9-]{1,40}$/i.test(reference)) throw new RangeError('Invalid reference');
  const lines = [
    'Habari JOHN ONLINE SERVICES AND APPLICATIONS,',
    `Mteja: ${customerName}`,
    `Huduma: ${serviceName}`,
    ...(reference ? [`Kumbukumbu: ${reference}`] : []),
    'Naomba maelezo zaidi kuhusu huduma hii.'
  ];
  return `https://wa.me/${businessNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
}
