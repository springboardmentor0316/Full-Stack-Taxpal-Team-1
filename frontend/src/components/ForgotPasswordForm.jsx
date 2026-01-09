import { useState } from 'react';
import '../index.css';

function ForgotPasswordForm({ onSwitch }) {
    const [step, setStep] = useState(1); // 1: Email & Captcha, 2: OTP
    const [email, setEmail] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [generatedCaptcha, setGeneratedCaptcha] = useState(Math.floor(1000 + Math.random() * 9000).toString());
    const [otp, setOtp] = useState('');

    const handleSendOtp = () => {
        if (captcha !== generatedCaptcha) {
            alert("Incorrect captcha!");
            return;
        }
        if (!email) {
            alert("Please enter your email.");
            return;
        }
        // Simulate sending OTP
        setStep(2);
    };

    const handleVerifyOtp = () => {
        if (otp.length === 6) {
            alert("OTP Verified! (Mock)");
            onSwitch('login'); // Return to login after success
        } else {
            alert("Please enter a 6-digit OTP.");
        }
    };

    const refreshCaptcha = () => {
        setGeneratedCaptcha(Math.floor(1000 + Math.random() * 9000).toString());
    };

    return (
        <div className="right">
            <h2>Forgot Password</h2>

            <form onSubmit={(e) => e.preventDefault()}>
                {step === 1 ? (
                    <>
                        <label htmlFor="forgot-email">Email</label>
                        <div className="input-group">
                            <input
                                id="forgot-email"
                                type="email"
                                placeholder="username@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <label htmlFor="captcha">Captcha</label>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '6px', gap: '10px' }}>
                            <div style={{
                                background: 'rgba(255,255,255,0.1)',
                                padding: '10px',
                                borderRadius: '6px',
                                letterSpacing: '4px',
                                fontWeight: 'bold',
                                userSelect: 'none'
                            }}>
                                {generatedCaptcha}
                            </div>
                            <button type="button" onClick={refreshCaptcha} style={{ width: 'auto', marginTop: 0, padding: '8px 12px', fontSize: '12px' }}>
                                Refresh
                            </button>
                        </div>
                        <div className="input-group">
                            <input
                                id="captcha"
                                type="text"
                                placeholder="Enter verification code"
                                value={captcha}
                                onChange={(e) => setCaptcha(e.target.value)}
                            />
                        </div>

                        <button className="signin" onClick={handleSendOtp}>Send OTP</button>
                    </>
                ) : (
                    <>
                        <div style={{ textAlign: 'center', marginBottom: '20px', fontSize: '14px', color: '#d0e8ff' }}>
                            We have sent a 6-digit code to <br /> <strong>{email}</strong>
                        </div>

                        <label htmlFor="otp">Enter 6-Digit Code</label>
                        <div className="input-group">
                            <input
                                id="otp"
                                type="text"
                                placeholder="123456"
                                maxLength="6"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                style={{ letterSpacing: '6px', textAlign: 'center' }}
                            />
                        </div>

                        <button className="signin" onClick={handleVerifyOtp}>Verify & Proceed</button>
                    </>
                )}

                <p className="register">
                    Remember your password? <span onClick={() => onSwitch('login')}>Back to Login</span>
                </p>
            </form>
        </div>
    );
}

export default ForgotPasswordForm;
