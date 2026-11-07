const transitions = Object.freeze({
  pending: ['reviewing', 'cancelled'],
  reviewing: ['awaiting_payment', 'cancelled'],
  awaiting_payment: ['processing', 'cancelled'],
  processing: ['completed', 'cancelled'],
  completed: [],
  cancelled: []
});
export function transitionOrderStatus(current, next, reason = '') {
  if (!Object.hasOwn(transitions, current) || !Object.hasOwn(transitions, next)) throw new TypeError('Unknown order status');
  if (!transitions[current].includes(next)) throw new RangeError(`Invalid transition: ${current} -> ${next}`);
  if (next === 'cancelled' && (typeof reason !== 'string' || reason.trim().length < 3 || reason.length > 500 || /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(reason))) {
    throw new RangeError('Cancellation requires a reason of 3–500 characters');
  }
  return Object.freeze({ from: current, to: next, reason: next === 'cancelled' ? reason.trim() : '' });
}
export function allowedOrderTransitions(status) {
  if (!Object.hasOwn(transitions, status)) throw new TypeError('Unknown order status');
  return [...transitions[status]];
}
