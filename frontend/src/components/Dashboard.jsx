import { useState, useEffect, useRef } from 'react';
import { getTransactions } from '../api/transactions';

import '../index.css';
import RecordIncomeModal from './RecordIncomeModal';
import RecordExpenseModal from './RecordExpenseModal';

function Dashboard({
  onLogout,
  userName = 'User',
  userEmail = 'user@email.com',
}) {
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [activeNav, setActiveNav] = useState('dashboard'); // ✅ default

  const transactionsRef = useRef(null);
  const dashboardRef = useRef(null);

  const loadTransactions = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) return;

      const data = await getTransactions(userId);
      setTransactions(data);
    } catch (error) {
      console.error('Failed to load transactions:', error);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  useEffect(() => {
    let income = 0;
    let expense = 0;

    transactions.forEach((txn) => {
      if (txn.type === 'income') income += Number(txn.amount);
      if (txn.type === 'expense') expense += Number(txn.amount);
    });

    setTotalIncome(income);
    setTotalExpense(expense);
  }, [transactions]);

  // ✅ Scroll logic: if user scrolls UP, activate Dashboard
  useEffect(() => {
    const handleScroll = () => {
      if (!transactionsRef.current) return;

      const txnTop =
        transactionsRef.current.getBoundingClientRect().top;

      if (txnTop > 120) {
        setActiveNav('dashboard');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTransactionClick = () => {
    setActiveNav('transactions');
    transactionsRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div className="dashboard-root">
      {/* ===== SIDEBAR ===== */}
      <aside className="dashboard-sidebar">
        <div>
          <h2 className="brand">TaxPal</h2>

          <ul className="nav-list">
            <li
              className={activeNav === 'dashboard' ? 'active' : ''}
              onClick={() => {
                setActiveNav('dashboard');
                dashboardRef.current?.scrollIntoView({
                  behavior: 'smooth',
                });
              }}
            >
              Dashboard
            </li>

            <li
              className={activeNav === 'transactions' ? 'active' : ''}
              onClick={handleTransactionClick}
            >
              Transactions
            </li>

            <li>Budgets</li>
            <li>Tax Estimator</li>
            <li>Reports</li>
          </ul>
        </div>

        {/* ===== USER PROFILE (BOTTOM) ===== */}
        <div className="sidebar-user">
          <p className="sidebar-username">{userName}</p>
          <p className="sidebar-email">{userEmail}</p>

          <p className="sidebar-settings">Settings</p>

          <button className="sidebar-logout" onClick={onLogout}>
            Logout
          </button>
        </div>
      </aside>

      {/* ===== MAIN ===== */}
      <main className="dashboard-main" ref={dashboardRef}>
        {/* HEADER */}
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
          </div>
        </div>

        {/* STATS */}
        <div className="stats-grid">
          {[
            {
              label: 'Monthly Income',
              value: `₹${totalIncome.toLocaleString()}`,
              icon: '⬆',
              bg: '#dcfce7',
              color: '#16a34a',
            },
            {
              label: 'Monthly Expenses',
              value: `₹${totalExpense.toLocaleString()}`,
              icon: '⬇',
              bg: '#fee2e2',
              color: '#dc2626',
            },
            {
              label: 'Estimated Tax Due',
              value: '₹0.00',
              icon: '⚠',
              bg: '#fef9c3',
              color: '#ca8a04',
            },
            {
              label: 'Savings Rate',
              value: '0%',
              icon: '🎯',
              bg: '#f3f4f6',
              color: '#374151',
            },
          ].map((item, i) => (
            <div className="stat-card" key={i} style={{ position: 'relative' }}>
              <span
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: item.bg,
                  color: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                  fontWeight: 'bold',
                }}
              >
                {item.icon}
              </span>

              <p>{item.label}</p>
              <h3>{item.value}</h3>
              <span>0% from last month</span>
            </div>
          ))}
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
        <div
          ref={transactionsRef}
          className={`transactions-card ${
            activeNav === 'transactions' ? 'transactions-focus' : ''
          }`}
        >
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
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="muted" style={{ textAlign: 'center' }}>
                    No transactions yet
                  </td>
                </tr>
              ) : (
                transactions.map((txn) => (
                  <tr key={txn.id}>
                    <td>{new Date(txn.date).toLocaleDateString()}</td>
                    <td>{txn.category}</td>
                    <td>{txn.category}</td>
                    <td>₹{Number(txn.amount).toLocaleString()}</td>
                    <td>{txn.type}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* MODALS */}
      {showIncomeModal && (
        <RecordIncomeModal
          onClose={() => setShowIncomeModal(false)}
          onSuccess={loadTransactions}
        />
      )}

      {showExpenseModal && (
        <RecordExpenseModal
          onClose={() => setShowExpenseModal(false)}
          onSuccess={loadTransactions}
        />
      )}
    </div>
  );
}

export default Dashboard;
