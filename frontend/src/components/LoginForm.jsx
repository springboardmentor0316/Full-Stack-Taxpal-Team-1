import { useState } from 'react';
import '../index.css';
import api from '../api/axios'; // ✅ backend connector

function LoginForm({ onSwitch }) {
  const [showPassword, setShowPassword] = useState(false);
<<<<<<< HEAD
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

=======
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
>>>>>>> cbdc1c44439846860deaad55f40fdf0e59f1b4ec

  const handleFilled = (e) => {
    e.target.classList.toggle('filled', e.target.value !== '');
  };
  const handleLogin = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Login Successful ✅");
      localStorage.setItem("token", data.token);
      onSwitch("dashboard");
    } else {
      alert(data.message || "Login Failed ❌");
    }
  } catch (error) {
    alert("Server Error ❌");
  }
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
<<<<<<< HEAD
        type="email"
        placeholder="username@gmail.com"
        onChange={(e) => {
        handleFilled(e);
        setEmail(e.target.value);
  }}
/>

=======
          type="email"
          placeholder="username@gmail.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            handleFilled(e);
          }}
        />
>>>>>>> cbdc1c44439846860deaad55f40fdf0e59f1b4ec

        <label>Password</label>
        <div className="input-group password-group">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
<<<<<<< HEAD
            onChange={(e) => {
            handleFilled(e);
            setPassword(e.target.value);
  }}
/>

=======
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              handleFilled(e);
            }}
          />
>>>>>>> cbdc1c44439846860deaad55f40fdf0e59f1b4ec

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
          Don't have an account?{' '}
          <span onClick={() => onSwitch('signup')}>Register</span>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
