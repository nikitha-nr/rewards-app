import { threeMonthWindowFrom, monthLabel } from '../logic/dateUtils';

test('monthLabel formats YYYY-MM correctly', () => {
  expect(monthLabel('2025-07')).toBe('Jul 2025');
});

test('threeMonthWindowFrom handles mid-year date', () => {
  const { start, end } = threeMonthWindowFrom('2025-09-15');

  expect(start.toISOString().slice(0, 10)).toBe('2025-07-01'); // July 1
  expect(end.toISOString().slice(0, 10)).toBe('2025-10-01');   // Oct 1
});
