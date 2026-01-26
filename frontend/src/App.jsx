import { useState } from 'react';
import LeftSection from './components/LeftSection';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import Dashboard from './components/Dashboard';
import './index.css';

function App() {
  const [view, setView] = useState('login');

  if (view === 'dashboard') {
    return <Dashboard onLogout={() => setView('login')} />;
  }

  return (
    <div className="card">
      <LeftSection />
      {view === 'login' && <LoginForm onSwitch={setView} />}
      {view === 'signup' && <SignupForm onSwitch={setView} />}
      {view === 'forgot' && <ForgotPasswordForm onSwitch={setView} />}
    </div>
  );
}

export default App;
