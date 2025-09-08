import { renderHook, waitFor } from '@testing-library/react';
import * as api from '../api/rewardsApi';
import useRewardsData from '../hooks/useRewardsData';

beforeEach(() => {
  jest.restoreAllMocks();
});

test('loads customers and computes rewards', async () => {
  jest.spyOn(api, 'getCustomers').mockResolvedValue([
    { id: 'C1', name: 'John' },
  ]);
  jest.spyOn(api, 'getTransactions').mockResolvedValue([
    { id: 'T1', customerId: 'C1', amount: 120, date: '2025-07-10' },
  ]);

  const { result } = renderHook(() => useRewardsData(null));

  await waitFor(() => expect(result.current.status).toBe('success'));

  expect(result.current.customers).toHaveLength(1);
  expect(result.current.transactions).toHaveLength(1);
  expect(result.current.rewardsByCustomer).toHaveLength(1);
  expect(result.current.rewardsByCustomer[0].total).toBe(90); // 120 -> 90 pts
});
