import { useState } from 'react';
import '../index.css';

function SignupForm({ onSwitch }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleShow = () => setShowPassword((s) => !s);
    const toggleConfirmShow = () => setShowConfirmPassword((s) => !s);

    return (
        <div className="right">
            <h2>Sign Up</h2>

            <form onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="name">Name</label>
                <div className="input-group">
                    <input id="name" type="text" placeholder="Aafthab Ali" />
                </div>

                <label htmlFor="signup-email">Email</label>
                <div className="input-group">
                    <input id="signup-email" type="email" placeholder="username@gmail.com" />
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

                <button className="signin">Sign Up</button>

                <p className="register">
                    Already have an account? <span onClick={() => onSwitch('login')}>Login</span>
                </p>
            </form>
        </div>
    );
}

export default SignupForm;
