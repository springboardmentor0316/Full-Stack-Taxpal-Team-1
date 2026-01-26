import { useState, useEffect } from 'react';
import '../index.css';

function ForgotPasswordForm({ onSwitch }) {
  const [step, setStep] = useState(1);

  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // generate 4-digit captcha
  const generateCaptcha = () => {
    const value = Math.floor(1000 + Math.random() * 9000).toString();
    setCaptcha(value);
    setCaptchaInput('');
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const isCaptchaValid = captchaInput === captcha;

  const handleGoToReset = () => {
    if (isCaptchaValid) {
      setStep(2);
    }
  };

  const handleFinalReset = () => {
    alert('Password reset successfully (mock)');
    onSwitch('login');
  };

  // 👇 COMMON HANDLER JUST FOR FILLED CLASS
  const handleFilled = (e) => {
    e.target.classList.toggle('filled', e.target.value !== '');
  };

  return (
    <div className="right">
      <h2>Forgot Password</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        {step === 1 && (
          <>
            {/* Email */}
            <label>Email</label>
            <div className="input-group">
              <input
                type="email"
                placeholder="username@gmail.com"
                onChange={handleFilled}
              />
            </div>

            {/* Captcha */}
            <label>Captcha</label>

            {/* CAPTCHA + REFRESH */}
            <div
              style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                marginTop: '6px',
              }}
            >
              <input
                type="text"
                value={captcha}
                disabled
                className="filled"
                style={{
                  flex: 1,
                  height: '50px',
                  borderRadius: '10px',
                  textAlign: 'center',
                  fontWeight: '600',
                }}
              />

              <button
                type="button"
                onClick={generateCaptcha}
                style={{
                  flex: 1,
                  height: '50px',
                  borderRadius: '10px',
                  background: 'rgba(0,0,0,0.35)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.25)',
                  cursor: 'pointer',
                }}
              >
                Refresh
              </button>
            </div>

            {/* ENTER CAPTCHA */}
            <div className="input-group" style={{ marginTop: '16px' }}>
              <input
                type="text"
                placeholder="Enter verification code"
                value={captchaInput}
                onChange={(e) => {
                  setCaptchaInput(e.target.value);
                  handleFilled(e);
                }}
              />
            </div>

            {/* RESET BUTTON */}
            <button
              className="signin"
              onClick={handleGoToReset}
              disabled={!isCaptchaValid}
              style={{
                opacity: isCaptchaValid ? 1 : 0.5,
                cursor: isCaptchaValid ? 'pointer' : 'not-allowed',
              }}
            >
              Reset Password
            </button>
          </>
        )}

        {step === 2 && (
          <>
            {/* New Password */}
            <label>New Password</label>
            <div className="input-group password-group">
              <input
                type={showNewPassword ? 'text' : 'password'}
                placeholder="New Password"
                onChange={handleFilled}
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
                onChange={handleFilled}
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                👁
              </button>
            </div>

            <button className="signin" onClick={handleFinalReset}>
              Reset Password
            </button>
          </>
        )}

        <p className="register">
          Remember your password?{' '}
          <span onClick={() => onSwitch('login')}>Back to Login</span>
        </p>
      </form>
    </div>
  );
}

export default ForgotPasswordForm;
