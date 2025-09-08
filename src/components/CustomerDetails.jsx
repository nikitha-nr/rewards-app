import MonthlySummary from './MonthlySummary';

export default function CustomerDetails({ selectedCustomerId, rewardsByCustomer }) {
  const data = selectedCustomerId
    ? rewardsByCustomer.filter(r => r.customerId === selectedCustomerId)
    : rewardsByCustomer;

  if (!data.length) {
    return (
      <section>
        <h2>Summary</h2>
        <p>No data.</p>
      </section>
    );
  }

  const overallTotal = data.reduce((sum, r) => sum + r.total, 0);

  return (
    <section>
      <h2>Summary</h2>
      {data.map(d => (
        <MonthlySummary
          key={d.customerId}
          customerId={d.customerId}
          monthly={d.monthly}
          total={d.total}
        />
      ))}
      {data.length > 1 && (
        <p><strong>All customers total:</strong> {overallTotal}</p>
      )}
    </section>
  );
}
