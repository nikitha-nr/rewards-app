export default function CustomerList({ customers, selectedCustomerId, onSelect }) {
  return (
    <aside>
      <h2>Customers</h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {customers.map(c => (
          <li key={c.id} style={{ marginBottom: 6 }}>
            <button
              aria-pressed={selectedCustomerId === c.id}
              onClick={() => onSelect(c.id)}
            >
              {c.name}
            </button>
          </li>
        ))}
        <li style={{ marginTop: 10 }}>
          <button
            aria-pressed={selectedCustomerId === null}
            onClick={() => onSelect(null)}
          >
            All Customers
          </button>
        </li>
      </ul>
    </aside>
  );
}
