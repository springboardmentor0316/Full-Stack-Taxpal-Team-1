import { useState } from 'react';
import '../index.css';

function ForgotPasswordForm({ onSwitch }) {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleReset = () => {
    alert('Password reset successfully (mock)');
    onSwitch('login');
  };

  return (
    <div className="right">
      <h2>Forgot Password</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        {/* Email */}
        <label>Email</label>
        <div className="input-group">
          <input
            type="email"
            placeholder="username@gmail.com"
          />
        </div>

        {/* New Password */}
        <label>New Password</label>
        <div className="input-group password-group">
          <input
            type={showNewPassword ? 'text' : 'password'}
            placeholder="New Password"
          />
          <button
            type="button"
            className="eye-btn"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            👁
          </button>
        </div>

        {/* Confirm Password */}
        <label>Confirm Password</label>
        <div className="input-group password-group">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
          />
          <button
            type="button"
            className="eye-btn"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            👁
          </button>
        </div>

        <button className="signin" onClick={handleReset}>
          Reset Password
        </button>

        <p className="register">
          Back to <span onClick={() => onSwitch('login')}>Login</span>
        </p>
      </form>
    </div>
  );
}

export default ForgotPasswordForm;
