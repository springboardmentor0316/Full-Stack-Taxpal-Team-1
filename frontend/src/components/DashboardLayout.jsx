import { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import {
  Home,
  RefreshCcw,
  FileText,
  BarChart3,
  Wallet,
} from 'lucide-react';

import '../index.css';

function DashboardLayout({ onLogout, userName = 'User', userEmail = 'user@email.com' }) {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('dashboard');

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
                navigate('/dashboard');
              }}
            >
              <Home size={18} /> Dashboard
            </li>

            <li
              className={activeNav === 'transactions' ? 'active' : ''}
              onClick={() => {
                setActiveNav('transactions');
                navigate('/transactions');
              }}
            >
              <RefreshCcw size={18} /> Transactions
            </li>

            {/* ✅ SAME BUDGET ICON – NOT CHANGED */}
            <li
              className={activeNav === 'budgets' ? 'active' : ''}
              onClick={() => {
                setActiveNav('budgets');
                navigate('/budgets');
              }}
            >
              <Wallet size={18} /> Budgets
            </li>

            <li>
              <FileText size={18} /> Tax Estimator
            </li>

            <li>
              <BarChart3 size={18} /> Reports
            </li>
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

      {/* ===== PAGE CONTENT ===== */}
      <Outlet />
    </div>
  );
}

export default DashboardLayout;
