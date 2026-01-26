import { useState } from 'react';
import '../index.css';

function LoginForm({ onSwitch }) {
  const [showPassword, setShowPassword] = useState(false);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");


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

  return (
    <div className="right">
      <h2>Login</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <label>Email</label>
        <input
        type="email"
        placeholder="username@gmail.com"
        onChange={(e) => {
        handleFilled(e);
        setEmail(e.target.value);
  }}
/>


        <label>Password</label>
        <div className="input-group password-group">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            onChange={(e) => {
            handleFilled(e);
            setPassword(e.target.value);
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

        <a href="#" className="forgot" onClick={() => onSwitch('forgot')}>
          Forgot Password?
        </a>

        <button className="signin" onClick={handleLogin}>
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
