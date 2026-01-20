import { useState } from 'react';
import '../index.css';
import RecordIncomeModal from './RecordIncomeModal';
import RecordExpenseModal from './RecordExpenseModal';

function Dashboard({ onLogout, userName = 'User' }) {
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  return (
    <div className="dashboard-root">
      {/* ===== SIDEBAR ===== */}
      <aside className="dashboard-sidebar">
        <h2 className="brand">TaxPal</h2>

        <ul className="nav-list">
          <li className="active">Dashboard</li>
          <li>Transactions</li>
          <li>Budgets</li>
          <li>Tax Estimator</li>
          <li>Reports</li>
        </ul>
      </aside>

      {/* ===== MAIN ===== */}
      <main className="dashboard-main">
        {/* HEADER ROW */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <div>
            <h2 style={{ marginBottom: '4px' }}>Financial Dashboard</h2>
            <p style={{ opacity: 0.7, fontSize: '14px' }}>
              Welcome back, {userName}! Here's your financial summary.
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              className="logout-small"
              onClick={() => setShowIncomeModal(true)}
            >
              <span
                style={{
                  background: '#1fa971',
                  borderRadius: '50%',
                  padding: '2px 7px',
                  marginRight: '6px',
                }}
              >
                +
              </span>
              Record Income
            </button>

            <button
              className="logout-small"
              onClick={() => setShowExpenseModal(true)}
            >
              <span
                style={{
                  background: '#e5533d',
                  borderRadius: '50%',
                  padding: '2px 8px',
                  marginRight: '6px',
                }}
              >
                −
              </span>
              Record Expense
            </button>

            <button className="logout-small" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="stats-grid">
          <div className="stat-card">
            <p>Monthly Income</p>
            <h3>₹0.00</h3>
            <span>0% from last month</span>
          </div>

          <div className="stat-card">
            <p>Monthly Expenses</p>
            <h3>₹0.00</h3>
            <span>0% from last month</span>
          </div>

          <div className="stat-card">
            <p>Estimated Tax Due</p>
            <h3>₹0.00</h3>
            <span>No upcoming taxes</span>
          </div>

          <div className="stat-card">
            <p>Savings Rate</p>
            <h3>0%</h3>
            <span>0% from your goal</span>
          </div>
        </div>

        {/* CHARTS */}
        <div className="chart-grid">
          <div className="chart-large">
            <h4>Income vs Expenses</h4>
            <div className="chart-placeholder">Bar chart</div>
          </div>

          <div className="chart-small">
            <h4>Expense Breakdown</h4>
            <div className="chart-placeholder">Pie chart</div>
          </div>
        </div>

        {/* TRANSACTIONS */}
        <div className="transactions-card">
          <div className="txn-header">
            <h4>Recent Transactions</h4>
            <span className="muted">View All</span>
          </div>

          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="5" className="muted" style={{ textAlign: 'center' }}>
                  No transactions yet
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>

      {/* MODALS */}
      {showIncomeModal && (
        <RecordIncomeModal onClose={() => setShowIncomeModal(false)} />
      )}
      {showExpenseModal && (
        <RecordExpenseModal onClose={() => setShowExpenseModal(false)} />
      )}
    </div>
  );
}

export default Dashboard;
