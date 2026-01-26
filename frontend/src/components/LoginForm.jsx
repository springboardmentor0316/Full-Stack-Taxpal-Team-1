import { useState } from 'react';
import '../index.css';
import api from '../api/axios'; // ✅ backend connector

function LoginForm({ onSwitch }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleFilled = (e) => {
    e.target.classList.toggle('filled', e.target.value !== '');
  };

  // 🔐 LOGIN HANDLER
  const handleLogin = async (e) => {
    e.preventDefault(); // 🚨 required

    if (!email || !password) {
      setError('Email and password required');
      return;
    }

    try {
      setError('');

      const res = await api.post('/auth/login', {
        email,
        password,
      });

      // ✅ Save JWT
      localStorage.setItem('token', res.data.token);

      // ✅ Go to dashboard
      onSwitch('dashboard');

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="right">
      <h2>Login</h2>

      {/* 🔥 FORM CONNECTED TO BACKEND */}
      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input
          type="email"
          placeholder="username@gmail.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            handleFilled(e);
          }}
        />

        <label>Password</label>
        <div className="input-group password-group">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              handleFilled(e);
            }}
          />

          <button
            type="button"
            className="eye-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            👁
          </button>
        </div>

        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

        <a href="#" className="forgot" onClick={() => onSwitch('forgot')}>
          Forgot Password?
        </a>

        {/* ✅ SUBMIT */}
        <button type="submit" className="signin">
          Sign in
        </button>

        <p className="register">
          Don’t have an account?{' '}
          <span onClick={() => onSwitch('signup')}>Register</span>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
