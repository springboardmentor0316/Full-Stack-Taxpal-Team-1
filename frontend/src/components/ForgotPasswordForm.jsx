import { useState, useEffect } from 'react';
import '../index.css';

function ForgotPasswordForm({ onSwitch }) {
  const [step, setStep] = useState(1);

  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');

  const [otp, setOtp] = useState('');
  const [otpInput, setOtpInput] = useState('');

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /* ---------- CAPTCHA ---------- */
  const generateCaptcha = () => {
    const value = Math.floor(1000 + Math.random() * 9000).toString();
    setCaptcha(value);
    setCaptchaInput('');
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const isCaptchaValid = captchaInput === captcha;

  /* ---------- OTP ---------- */
  const sendOtp = () => {
    if (!isCaptchaValid) return;
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(generatedOtp);
    console.log('OTP (mock):', generatedOtp); // mock
    setStep(2);
  };

  const verifyOtp = () => {
    if (otpInput === otp) {
      setStep(3);
    } else {
      alert('Invalid OTP');
    }
  };

  const handleFinalReset = () => {
    alert('Password reset successfully (mock)');
    onSwitch('login');
  };

  const handleFilled = (e) => {
    e.target.classList.toggle('filled', e.target.value !== '');
  };

  return (
    <div className="right">
      <h2>
        {step === 1 && 'Forgot Password'}
        {step === 2 && 'Enter OTP'}
        {step === 3 && 'Reset Password'}
      </h2>

      <form onSubmit={(e) => e.preventDefault()}>
        {/* ================= STEP 1 : SEND OTP ================= */}
        {step === 1 && (
          <>
            <label>Email</label>
            <div className="input-group">
              <input
                type="email"
                placeholder="username@gmail.com"
                onChange={handleFilled}
              />
            </div>

            <label>Captcha</label>

            <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
              <input
                type="text"
                value={captcha}
                disabled
                className="filled"
                style={{
                  flex: 1,
                  height: '50px',
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
                }}
              >
                Refresh
              </button>
            </div>

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

            <button
              className="signin"
              onClick={sendOtp}
              disabled={!isCaptchaValid}
              style={{
                opacity: isCaptchaValid ? 1 : 0.5,
                cursor: isCaptchaValid ? 'pointer' : 'not-allowed',
              }}
            >
              Send OTP
            </button>
          </>
        )}

      {/* ================= STEP 2 : VERIFY OTP ================= */}
{step === 2 && (
  <>
    {/* <label>Enter OTP</label> */}

    {/* 🔧 DEV ONLY OTP DISPLAY */}
    <p
      style={{
        fontSize: '12px',
        color: '#000',
        marginBottom: '6px',
      }}
    >
      Dev OTP: <strong>{otp}</strong>
    </p>

    <div className="input-group">
      <input
        type="text"
        placeholder="6-digit OTP"
        value={otpInput}
        onChange={(e) => {
          setOtpInput(e.target.value);
          handleFilled(e);
        }}
      />
    </div>

    <button className="signin" onClick={verifyOtp}>
      Verify OTP
    </button>
  </>
)}

    

        {/* ================= STEP 3 : RESET PASSWORD ================= */}
        {step === 3 && (
          <>
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
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
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
