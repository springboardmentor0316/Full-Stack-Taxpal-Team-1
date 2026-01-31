import { useState } from 'react';
import '../index.css';

function Budgets() {
  const [showForm, setShowForm] = useState(false);
  const [budgets, setBudgets] = useState([]);

  const [form, setForm] = useState({
    category: '',
    amount: '',
    month: '',
    description: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.category || !form.amount || !form.month) return;

    setBudgets([...budgets, { ...form, spent: 0 }]);
    setForm({ category: '', amount: '', month: '', description: '' });
    setShowForm(false);
  };

  return (
    <main className="dashboard-main">
      {/* ===== HEADER ===== */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          flexWrap: 'nowrap',
        }}
      >
        <h2>Budgets</h2>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            whiteSpace: 'nowrap',
          }}
        >
          {/* Budget Health — SINGLE LINE FIX */}
         <div className="budget-health-glass">
  <span>Budget Health:</span>
  <strong>Good</strong>
</div>


          <button className="primary-btn" onClick={() => setShowForm(true)}>
            + Create New Budget
          </button>
        </div>
      </div>

      {/* ===== CREATE FORM ===== */}
      {showForm && (
        <div className="transactions-card" style={{ marginBottom: '24px' }}>
          <h4 style={{ marginBottom: '16px' }}>Create New Budget</h4>

          <form onSubmit={handleSubmit}>
            {/* CATEGORY + AMOUNT */}
            <div className="form-grid">
              <div>
                <label>Category</label>
                <input
                  list="categories"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="Type or select category"
                />
                <datalist id="categories">
                  <option value="Food" />
                  <option value="Travel" />
                  <option value="Shopping" />
                  <option value="Rent" />
                </datalist>
              </div>

              <div>
                <label>Budget Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="₹ 0.00"
                />
              </div>
            </div>

            {/* MONTH — FULL WIDTH + DARK BG */}
            <div style={{ marginTop: '14px' }}>
              <label>Month</label>
              <input
                type="month"
                name="month"
                value={form.month}
                onChange={handleChange}
                className="full-input"
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff',
                  padding: '10px 12px',
                  borderRadius: '8px',
                }}
              />
            </div>

            {/* DESCRIPTION — FULL WIDTH + DARK BG */}
            <div style={{ marginTop: '14px' }}>
              <label>Description</label>
              <textarea
                name="description"
                rows="3"
                value={form.description}
                onChange={handleChange}
                placeholder="Optional"
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  resize: 'none',
                }}
              />
            </div>

            {/* ACTION BUTTONS — SMALL WIDTH */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '12px',
                marginTop: '20px',
              }}
            >
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="primary-btn"
                style={{
                  background: '#7f1d1d',
                  color: '#fff',
                  width: 'auto',
                  padding: '8px 16px',
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="primary-btn"
                style={{
                  width: 'auto',
                  padding: '8px 16px',
                }}
              >
                Create Budget
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ===== TABLE ===== */}
      <div className="transactions-card">
        <h4>Budgets Overview</h4>

        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Budget</th>
              <th>Spent</th>
              <th>Remaining</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {budgets.length === 0 ? (
              <tr>
                <td colSpan="5" className="muted" style={{ textAlign: 'center' }}>
                  No budgets created yet
                </td>
              </tr>
            ) : (
              budgets.map((b, i) => (
                <tr key={i}>
                  <td>{b.category}</td>
                  <td>₹{Number(b.amount).toLocaleString()}</td>
                  <td>₹{b.spent}</td>
                  <td>₹{b.amount - b.spent}</td>
                  <td>
                    <span className="txn-type-badge income">Good</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Budgets;
