import { useState } from 'react';
import LeftSection from './components/LeftSection';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import './index.css';

function App() {
  const [currentView, setCurrentView] = useState('login'); // 'login', 'signup', 'forgot'

  return (
    <div className="card">
      <LeftSection />
      {currentView === 'login' && <LoginForm onSwitch={setCurrentView} />}
      {currentView === 'signup' && <SignupForm onSwitch={setCurrentView} />}
      {currentView === 'forgot' && <ForgotPasswordForm onSwitch={setCurrentView} />}
    </div>
  );
}

export default App;
