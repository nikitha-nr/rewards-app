// Build a 3-month window ending after the latest transaction month

// Example: latest = 2025-09-15
//   → start = 2025-07-01, end = 2025-10-01 (exclusive)
export function threeMonthWindowFrom(latestDateStr) {
  const latest = new Date(latestDateStr);

  // Normalize to start of month
  const end = new Date(latest.getFullYear(), latest.getMonth() + 1, 1);
  // "end" is the first day of the month AFTER the latest transaction

  // Start = 3 months before "end"
  const start = new Date(end.getFullYear(), end.getMonth() - 3, 1);

  return { start, end };
}

// Format "YYYY-MM" into a readable month label
// Example: "2025-07" → "Jul 2025"
export function monthLabel(yyyyMm) {
  const [year, month] = yyyyMm.split('-').map(Number);

  const date = new Date(year, month - 1, 1);
  return date.toLocaleString(undefined, {
    month: 'short', // "Jul"
    year: 'numeric' // "2025"
  });
}
