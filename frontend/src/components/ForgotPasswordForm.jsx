import { useState } from 'react';
import '../index.css';

function ForgotPasswordForm({ onSwitch }) {
    const [step, setStep] = useState(1); // 1: Email & Captcha, 2: OTP
    const [email, setEmail] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [generatedCaptcha, setGeneratedCaptcha] = useState(Math.floor(1000 + Math.random() * 9000).toString());
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleNewPassword = () => setShowNewPassword((s) => !s);
    const toggleConfirmPassword = () => setShowConfirmPassword((s) => !s);

    const handleSendOtp = async () => {
        if (captcha !== generatedCaptcha) {
            alert("Incorrect captcha!");
            return;
        }
        if (!email) {
            alert("Please enter your email.");
            return;
        }

        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (response.ok) {
                alert("OTP Sent! Check server console log (dev mode).");
                setStep(2);
            } else {
                alert(data.message || "Failed to send OTP");
            }
        } catch (error) {
            console.error("Forgot PW Error:", error);
            alert("Error sending OTP");
        }
    };

    const handleVerifyOtp = async () => {
        if (otp.length !== 6) {
            alert("Please enter 6-digit OTP");
            return;
        }

        try {
            const response = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp }),
            });
            const data = await response.json();
            if (response.ok) {
                alert("OTP Verified!");
                setStep(3);
            } else {
                alert(data.message || "Invalid OTP");
            }
        } catch (error) {
            console.error("Verify OTP Error:", error);
            alert("Error verifying OTP");
        }
    };

    const handleResetPassword = async () => {
        if (!newPassword || !confirmPassword) {
            alert("Please fill in all fields");
            return;
        }
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp, newPassword }),
            });

            const text = await response.text();
            let data;
            try { data = JSON.parse(text); } catch (e) { }

            if (response.ok) {
                alert("Password Reset Successful! Please Login.");
                onSwitch('login');
            } else {
                alert((data && data.message) || "Reset failed: " + text);
            }
        } catch (error) {
            console.error("Reset Error:", error);
            alert("An error occurred.");
        }
    };

    const refreshCaptcha = () => {
        setGeneratedCaptcha(Math.floor(1000 + Math.random() * 9000).toString());
    };

    return (
        <div className="right">
            <h2>Forgot Password</h2>

            <form onSubmit={(e) => e.preventDefault()}>
                {step === 1 && (
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
                )}

                {step === 2 && (
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

                {step === 3 && (
                    <>
                        <label htmlFor="new-password">New Password</label>
                        <div className="input-group password-group">
                            <input
                                id="new-password"
                                type={showNewPassword ? "text" : "password"}
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="eye-btn"
                                onClick={toggleNewPassword}
                                aria-label="Toggle password visibility"
                            >
                                {showNewPassword ? (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.94 17.94C16.24 19.06 14.21 19.75 12 19.75c-5 0-9.27-3.11-11-7.75 1.11-2.63 2.98-4.78 5.24-6.2" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M1 1l22 22" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                ) : (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                        <circle cx="12" cy="12" r="3" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        <label htmlFor="confirm-new-password">Confirm Password</label>
                        <div className="input-group password-group">
                            <input
                                id="confirm-new-password"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="eye-btn"
                                onClick={toggleConfirmPassword}
                                aria-label="Toggle password visibility"
                            >
                                {showConfirmPassword ? (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.94 17.94C16.24 19.06 14.21 19.75 12 19.75c-5 0-9.27-3.11-11-7.75 1.11-2.63 2.98-4.78 5.24-6.2" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M1 1l22 22" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                ) : (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                        <circle cx="12" cy="12" r="3" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        <button className="signin" onClick={handleResetPassword}>Reset Password</button>
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
