import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import LeftSection from './components/LeftSection';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import Dashboard from './components/Dashboard';
import TransactionsPage from './components/TransactionsPage';

import './index.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setIsLoggedIn(!!userId);
  }, []);

  const user = {
    name: localStorage.getItem('userName') || '',
    email: localStorage.getItem('userEmail') || '',
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  // ---------- AUTH PAGES ----------
  if (!isLoggedIn) {
    return (
      <div className="card">
        <LeftSection />
        <Routes>
          <Route
            path="/"
            element={<LoginForm onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/forgot" element={<ForgotPasswordForm />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    );
  }

  // ---------- PROTECTED PAGES ----------
  return (
    <Routes>
      {/* Redirect root to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" />} />

      <Route
        path="/dashboard"
        element={
          <Dashboard
            onLogout={handleLogout}
            userName={user.name}
            userEmail={user.email}
          />
        }
      />

      <Route
        path="/transactions"
        element={
          <TransactionsPage
            onLogout={handleLogout}
            userName={user.name}
            userEmail={user.email}
          />
        }
      />

      {/* fallback */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;
