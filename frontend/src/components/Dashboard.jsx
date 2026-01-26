import '../index.css';

function Dashboard({ onLogout }) {
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

      {/* ===== MAIN CONTENT ===== */}
      <main className="dashboard-main">

        {/* TOP BAR */}
        <div className="dashboard-header">
          <h2>Dashboard</h2>
          <button className="logout-small" onClick={onLogout}>
            Logout
          </button>
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
    </div>
  );
}

export default Dashboard;
