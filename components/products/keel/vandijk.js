// One case, end to end: Van Dijk Freight (a demo business) paying a carrier invoice. The invoice, amount and
// supplier are the ones in our film public/media/films/vandijk-approval.mp4; the brief is the logistics one in
// lib/products.js. No other figure is stated: the approval limit has no amount on purpose.
export const CASE = { business: 'Van Dijk Freight', invoice: 'BWT-2026-10-0412', amount: '€12,400.00', supplier: 'Brandwijk Tankkaart B.V.' };

// The board: a row of stages, each holding its steps. Check is the stage the board opens into its flow.
export const STAGES = [
  { name: 'Intake', steps: [['Invoice arrives', 'System'], ['Find the supplier', 'System']] },
  { name: 'Check', steps: [['Match to the PO', 'Agent'], ['Approval limit', 'Rule'], ['Finance approves', 'Person']] },
  { name: 'Payment', steps: [['Pay the carrier', 'System'], ['Send remittance', 'System']] },
  { name: 'Close', steps: [['Book the payment', 'System']] },
];

// What the case card says as it moves: received, matched by the agent, waiting at the limit, approved, paid.
export const STATUS = ['Received', 'Matching', 'Waiting for a person', 'Approved', 'Paid'];

export const AUDIT = [
  ['System', `Invoice ${CASE.invoice} received from ${CASE.supplier}`],
  ['Agent', 'Matched to the purchase order and the delivery'],
  ['Rule', `${CASE.amount} is over the approval limit: a person decides`],
  ['Person', `Approved payment of ${CASE.amount}`],
  ['System', 'Payment sent'],
];
