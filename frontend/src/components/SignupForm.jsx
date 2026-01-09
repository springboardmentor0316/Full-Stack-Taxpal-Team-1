import { useState } from 'react';
import '../index.css';

function SignupForm({ onSwitch }) {
    const [step, setStep] = useState(1); // 1: Details, 2: OTP
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Form State
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');

    const toggleShow = () => setShowPassword((s) => !s);
    const toggleConfirmShow = () => setShowConfirmPassword((s) => !s);

    const handleInitialSignup = () => {
        // Basic validation
        if (!email) {
            alert("Please enter an email address.");
            return;
        }
        // Proceed to OTP step
        setStep(2);
    };

    const handleVerifyOtp = () => {
        if (otp.length === 6) {
            alert("Email is validated!");
            onSwitch('login'); // Redirect to login
        } else {
            alert("Please enter a valid 6-digit code.");
        }
    };

    return (
        <div className="right">
            <h2>Sign Up</h2>

            <form onSubmit={(e) => e.preventDefault()}>
                {step === 1 ? (
                    <>
                        <label htmlFor="name">Name</label>
                        <div className="input-group">
                            <input id="name" type="text" placeholder="Aafthab Ali" />
                        </div>

                        <label htmlFor="signup-email">Email</label>
                        <div className="input-group">
                            <input
                                id="signup-email"
                                type="email"
                                placeholder="username@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <label htmlFor="signup-password">Password</label>
                        <div className="input-group password-group">
                            <input
                                id="signup-password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                            />
                            <button
                                type="button"
                                className="eye-btn"
                                onClick={toggleShow}
                                aria-label="Toggle password visibility"
                            >
                                {showPassword ? (
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

                        <label htmlFor="confirm-password">Confirm Password</label>
                        <div className="input-group password-group">
                            <input
                                id="confirm-password"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                            />
                            <button
                                type="button"
                                className="eye-btn"
                                onClick={toggleConfirmShow}
                                aria-label="Toggle confirm password visibility"
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

                        <button className="signin" onClick={handleInitialSignup}>Sign Up</button>
                    </>
                ) : (
                    <>
                        <div style={{ textAlign: 'center', marginBottom: '20px', fontSize: '14px', color: '#d0e8ff' }}>
                            We have sent a 6-digit code to <br /> <strong>{email}</strong>
                        </div>

                        <label htmlFor="signup-otp">Enter 6-Digit Code</label>
                        <div className="input-group">
                            <input
                                id="signup-otp"
                                type="text"
                                placeholder="123456"
                                maxLength="6"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                style={{ letterSpacing: '6px', textAlign: 'center' }}
                            />
                        </div>

                        <button className="signin" onClick={handleVerifyOtp}>Verify Email</button>
                    </>
                )}

                <p className="register">
                    Already have an account? <span onClick={() => onSwitch('login')}>Login</span>
                </p>
            </form>
        </div>
    );
}

export default SignupForm;
