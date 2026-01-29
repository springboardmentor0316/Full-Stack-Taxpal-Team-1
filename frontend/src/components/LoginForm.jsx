import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import api from '../api/axios';

function LoginForm({ onLoginSuccess, onSwitch }) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleFilled = (e) => {
    e.target.classList.toggle('filled', e.target.value !== '');
  };

  // 🔐 LOGIN HANDLER
  const handleLogin = async (e) => {
    e.preventDefault();

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

      // ✅ SAVE AUTH DATA
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.user.id);
      localStorage.setItem('userName', res.data.user.name);
      localStorage.setItem('userEmail', res.data.user.email);

      // ✅ UPDATE LOGIN STATE
      onLoginSuccess();

      // ✅ ROUTE TO DASHBOARD
      navigate('/');

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="right">
      <h2>Login</h2>

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

        {error && (
          <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>
        )}

        <a
          href="#"
          className="forgot"
          onClick={() => onSwitch('forgot')}
        >
          Forgot Password?
        </a>

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
