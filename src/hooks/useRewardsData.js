import { useEffect, useState } from 'react';
import { getCustomers, getTransactions } from '../api/rewardsApi';
import { aggregateMonthlyPoints } from '../logic/pointsCalculate';
import { threeMonthWindowFrom } from '../logic/dateUtils';

/**
 * Fetch customers + (optionally filtered) transactions
 * and return rewards aggregated per customer/month.
 */
export default function useRewardsData(selectedCustomerId) {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [status, setStatus] = useState('idle');   // 'idle' | 'loading' | 'success' | 'error'
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    (async () => {
      setStatus('loading');
      setError(null);
      try {
        const [c, tx] = await Promise.all([
          getCustomers(),
          getTransactions(selectedCustomerId || null),
        ]);
        if (!active) return;

        setCustomers(Array.isArray(c) ? c : []);
        setTransactions(Array.isArray(tx) ? tx : []);
        setStatus('success');
      } catch (e) {
        if (!active) return;
        setError(e);
        setStatus('error');
      }
    })();

    return () => { active = false; };
  }, [selectedCustomerId]);

  // Always treat as array to avoid undefined errors
  const tx = Array.isArray(transactions) ? transactions : [];

  const latestDate = tx.length
    ? tx.reduce((max, t) => (t.date > max ? t.date : max), '1970-01-01')
    : new Date().toISOString().slice(0, 10);

  const { start, end } = threeMonthWindowFrom(latestDate);
  const rewardsByCustomer = aggregateMonthlyPoints(tx, start, end);

  return { status, error, customers, transactions: tx, rewardsByCustomer };
}
