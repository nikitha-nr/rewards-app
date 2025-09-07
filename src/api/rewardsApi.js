// --- Mock Customers ---
const customers = [
  { id: 'C1', name: 'John Doe' },
  { id: 'C2', name: 'Noel' },
  { id: 'C3', name: 'Stalin' },
];

// --- Mock Transactions ---
// Each case chosen to demonstrate reward rules
const transactions = [
  // John: one small, one large
  { id: 'T1', customerId: 'C1', amount: 40,  date: '2025-07-10' },  // <50 → 0 pts
  { id: 'T2', customerId: 'C1', amount: 120, date: '2025-08-15' },  // 90 pts

  // Noel: exactly 100
  { id: 'T3', customerId: 'C2', amount: 100, date: '2025-07-20' },  // 50 pts

  // Stalin: one mid-range
  { id: 'T4', customerId: 'C3', amount: 75,  date: '2025-09-01' },  // 25 pts
];

// --- Helper to simulate API delay ---
function fakeDelay(ms = 300) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// --- API Functions ---
// GET /customers
export async function getCustomers() {
  await fakeDelay();
  return customers;
}

// GET /transactions (all or filtered by customerId)
export async function getTransactions(customerId = null) {
  await fakeDelay();
  return customerId
    ? transactions.filter(t => t.customerId === customerId)
    : transactions;
}

// GET /rewards (bundle customers + transactions)
export async function getRewards() {
  await fakeDelay();
  return { customers, transactions };
}
