import { useEffect, useState } from 'react';
import { getTransactions, deleteTransaction } from '../api/transactions';
import '../index.css';

function TransactionsPage({
  onLogout,
  userName = 'User',
  userEmail = 'user@email.com',
}) {
  const [transactions, setTransactions] = useState([]);

  const loadTransactions = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) return;

      const data = await getTransactions(userId);
      setTransactions(data);
    } catch (err) {
      console.error('Failed to load transactions', err);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this transaction?')) return;

    try {
      await deleteTransaction(id);
      loadTransactions();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  return (
    <div className="dashboard-root">
      {/* ===== SIDEBAR (UNCHANGED) ===== */}
      <aside className="dashboard-sidebar">
        <div>
          <h2 className="brand">TaxPal</h2>

          <ul className="nav-list">
            <li onClick={() => (window.location.href = '/dashboard')}>
              Dashboard
            </li>
            <li className="active">Transactions</li>
            <li>Budgets</li>
            <li>Tax Estimator</li>
            <li>Reports</li>
          </ul>
        </div>

        <div className="sidebar-user">
          <p className="sidebar-username">{userName}</p>
          <p className="sidebar-email">{userEmail}</p>

          <p className="sidebar-settings">Settings</p>

          <button className="sidebar-logout" onClick={onLogout}>
            Logout
          </button>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main className="dashboard-main">
        <h2 style={{ marginBottom: '20px' }}>All Transactions</h2>

        <div className="transactions-card">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Type</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="muted" style={{ textAlign: 'center' }}>
                    No transactions found
                  </td>
                </tr>
              ) : (
                transactions.map((txn) => (
                  <tr key={txn.id}>
                    <td>{new Date(txn.date).toLocaleDateString()}</td>
                    <td>{txn.category}</td>
                    <td>₹{Number(txn.amount).toLocaleString()}</td>
                   <td>
  <span className={`txn-type ${txn.type}`}>
    {txn.type}
  </span>
</td>


                    <td style={{ textAlign: 'right' }}>
  <div className="txn-actions">
    <button className="txn-edit-btn">Edit</button>
    <button
      className="txn-delete-btn"
      onClick={() => handleDelete(txn.id)}
    >
      Delete
    </button>
  </div>
</td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default TransactionsPage;
