// --- Helpers ---
function monthKeyFromDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0'); // 01..12
  return `${y}-${m}`;
}

// --- Points calculation (super-readable) ---
// Rules:
// - $50 or less: 0 points
// - $50..$100: 1 point per dollar over $50 (max 50 pts at $100)
// - Over $100: +2 points per dollar over $100
export function calculatePointsForAmount(amount) {
  if (amount <= 50) {
    return 0; // no points for $50 or less
  }

  let points = 0;

  // Dollars between $50 and $100 → 1 point per dollar
  if (amount > 50) {
    const dollarsBetween50And100 = Math.min(amount, 100) - 50; // clamp to 0..50
    points += dollarsBetween50And100;
  }

  // Dollars over $100 → 2 points per dollar
  if (amount > 100) {
    const dollarsOver100 = amount - 100;
    points += dollarsOver100 * 2;
  }

  return points;
}

// --- Aggregate per customer, per month (readable) ---
// - Only considers transactions within [startDateInclusive, endDateExclusive)
// - Creates a month entry even if points are 0 (when a tx exists in that month)
export function aggregateMonthlyPoints(transactions, startDateInclusive, endDateExclusive) {
  // customerId -> { monthly: { 'YYYY-MM': number }, total: number }
  const customers = {};

  for (const tx of transactions) {
    const txDate = new Date(tx.date);

    // Filter to the window
    if (txDate < startDateInclusive || txDate >= endDateExclusive) {
      continue;
    }

    const customerId = tx.customerId;
    const monthKey = monthKeyFromDate(txDate);

    // Ensure a record exists for the customer
    if (!customers[customerId]) {
      customers[customerId] = { monthly: {}, total: 0 };
    }

    // Ensure a record exists for the month (even if points = 0)
    if (customers[customerId].monthly[monthKey] == null) {
      customers[customerId].monthly[monthKey] = 0;
    }

    // Calculate and add points
    const points = calculatePointsForAmount(tx.amount);
    customers[customerId].monthly[monthKey] += points;
    customers[customerId].total += points;
  }

  // Convert to UI-friendly array shape
  const result = [];

  for (const [customerId, data] of Object.entries(customers)) {
    const monthlyArray = Object.entries(data.monthly)
      .map(([month, amount]) => ({ month, amount }))
      .sort((a, b) => a.month.localeCompare(b.month));

    result.push({ customerId, monthly: monthlyArray, total: data.total });
  }

  return result;
}
