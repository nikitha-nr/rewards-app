import { monthLabel } from '../logic/dateUtils';
import "../styles/index.css";

export default function MonthlySummary({ customerId, monthly, total }) {
  return (
    <div className="card">
      <h3>Customer: {customerId}</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {monthly.map(m => (
            <tr key={m.month}>
              <td>{monthLabel(m.month)}</td>
              <td>{m.amount}</td>
            </tr>
          ))}
          <tr>
            <td><strong>Total</strong></td>
            <td><strong>{total}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
