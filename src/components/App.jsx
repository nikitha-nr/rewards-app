import { useState } from 'react';
import '../styles/index.css';
import useRewardsData from '../hooks/useRewardsData';
import CustomerList from './CustomerList';
import CustomerDetails from './CustomerDetails';

export default function App() {
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const { status, error, customers, rewardsByCustomer } = useRewardsData(selectedCustomerId);

  if (status === 'loading') {
    return <div className="container">Loading…</div>;
  }
  if (status === 'error') {
    return <div className="container" role="alert">Failed to load: {String(error)}</div>;
  }

  return (
    <div className="container">
      <h1>Customer Rewards (3-month view)</h1>
      <div className="layout">
        <CustomerList
          customers={customers}
          selectedCustomerId={selectedCustomerId}
          onSelect={setSelectedCustomerId}
        />
        <CustomerDetails
          selectedCustomerId={selectedCustomerId}
          rewardsByCustomer={rewardsByCustomer}
        />
      </div>
    </div>
  );
}
