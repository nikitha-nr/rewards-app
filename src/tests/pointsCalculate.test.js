import { calculatePointsForAmount, aggregateMonthlyPoints } from '../logic/pointsCalculate';

describe('calculatePointsForAmount', () => {
  it('returns 0 for amounts <= $50', () => {
    expect(calculatePointsForAmount(40)).toBe(0);
  });

  it('returns 50 for $100', () => {
    expect(calculatePointsForAmount(100)).toBe(50);
  });

  it('returns 90 for $120', () => {
    expect(calculatePointsForAmount(120)).toBe(90);
  });

  it('returns 25 for $75', () => {
    expect(calculatePointsForAmount(75)).toBe(25);
  });
});

describe('aggregateMonthlyPoints', () => {
  const tx = [
    { id: 'T1', customerId: 'C001', amount: 40,  date: '2025-07-10' }, // 0
    { id: 'T2', customerId: 'C001', amount: 120, date: '2025-08-15' }, // 90
    { id: 'T3', customerId: 'C002', amount: 100, date: '2025-07-20' }, // 50
    { id: 'T4', customerId: 'C003', amount: 75,  date: '2025-09-01' }, // 25
  ];

  const start = new Date('2025-07-01');
  const end   = new Date('2025-10-01');

  it('groups transactions by customer and month with correct totals', () => {
    const out = aggregateMonthlyPoints(tx, start, end);

    const c1 = out.find(r => r.customerId === 'C001');
    const c2 = out.find(r => r.customerId === 'C002');
    const c3 = out.find(r => r.customerId === 'C003');

    expect(c1.total).toBe(90);
    expect(c2.total).toBe(50);
    expect(c3.total).toBe(25);
  });
});
