import { useState } from 'react';
import '../index.css';

function LoginForm({ onSwitch }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleFilled = (e) => {
    e.target.classList.toggle('filled', e.target.value !== '');
  };

  return (
    <div className="right">
      <h2>Login</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <label>Email</label>
        <input
          type="email"
          placeholder="username@gmail.com"
          onChange={handleFilled}
        />

        <label>Password</label>
        <div className="input-group password-group">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            onChange={handleFilled}
          />

          <button
            type="button"
            className="eye-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            👁
          </button>
        </div>

        <a href="#" className="forgot" onClick={() => onSwitch('forgot')}>
          Forgot Password?
        </a>

        <button className="signin">Sign in</button>

        <p className="register">
          Don’t have an account?{' '}
          <span onClick={() => onSwitch('signup')}>Register</span>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
