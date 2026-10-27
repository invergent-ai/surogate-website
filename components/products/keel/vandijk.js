// One case, end to end: Van Dijk Freight (a demo business) paying a carrier invoice. The invoice, amount and
// supplier are the ones in our film public/media/films/vandijk-approval.mp4; the brief is the logistics one in
// lib/products.js. No other figure is stated.
export const CASE = { business: 'Van Dijk Freight', invoice: 'BWT-2026-10-0412', amount: '€12,400.00', supplier: 'Brandwijk Tankkaart B.V.' };

export const STAGES = [
  { name: 'Intake', who: 'System', step: 'The carrier invoice arrives', status: 'Received' },
  { name: 'Match', who: 'Agent', step: 'Matches it to the PO and the delivery', status: 'Matched' },
  { name: 'Approval', who: 'Person', step: 'Over the approval limit, so a person decides', status: 'Approved' },
  { name: 'Payment', who: 'System', step: 'Pays the carrier', status: 'Paid' },
];

export const AUDIT = [
  ['System', `Invoice ${CASE.invoice} received from ${CASE.supplier}`],
  ['Agent', 'Matched to the purchase order and the delivery'],
  ['Rule', `${CASE.amount} is over the approval limit: a person decides`],
  ['Person', `Approved payment of ${CASE.amount}`],
  ['System', 'Payment sent'],
];
