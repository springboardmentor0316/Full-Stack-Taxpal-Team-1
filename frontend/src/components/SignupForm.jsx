import { useState } from 'react';
import '../index.css';

function SignupForm({ onSwitch }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    email: '',
    country: '',
    income: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    // 👇 ADD / REMOVE .filled class (for eye icon color & border)
    e.target.classList.toggle('filled', value !== '');

    setFormData({ ...formData, [name]: value });
  };

  const handleCreateAccount = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (
      !formData.username ||
      !formData.password ||
      !formData.fullName ||
      !formData.email ||
      !formData.country
    ) {
      setError('Please fill all required fields');
      return;
    }

    setError('');
    onSwitch('dashboard'); // ✅ DIRECT DASHBOARD
  };

  return (
    <div className="right signup-right">
      <h2>Create Account</h2>
      <p style={{ fontSize: '12px', opacity: 0.8, marginBottom: '12px' }}>
        Enter your information to create your TaxPal account
      </p>

      <form onSubmit={(e) => e.preventDefault()}>
        <div
          className="signup-grid"
          style={{ display: 'grid', gap: '15px', gridTemplateColumns: '1fr 1fr' }}
        >
          <div>
            <label>Username</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
            />
          </div>

          <div>
            <label>Password</label>
            <div className="input-group password-group">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="Choose a password"
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                👁
              </button>
            </div>
          </div>

          <div>
            <label>Full Name</label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label>Confirm Password</label>
            <div className="input-group password-group">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
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
          </div>

          <div>
            <label>Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
            />
          </div>

          <div>
            <label>Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="" disabled>Select your country</option>
              <option>India</option>
              <option>USA</option>
              <option>UK</option>
            </select>
          </div>

          <div>
            <label>Income Bracket (Optional)</label>
            <select
              name="income"
              value={formData.income}
              onChange={handleChange}
            >
              <option value="" disabled>Select your income bracket</option>
              <option>Low</option>
              <option>Middle</option>
              <option>High</option>
            </select>
          </div>
        </div>

        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

        <button
          className="signin"
          onClick={handleCreateAccount}
          style={{ marginTop: '20px' }}
        >
          Create Account
        </button>

        <p className="register">
          Already have an account?{' '}
          <span onClick={() => onSwitch('login')}>Login</span>
        </p>
      </form>
    </div>
  );
}

export default SignupForm;
