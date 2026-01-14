import { useState } from 'react';
import '../index.css';

function SignupForm({ onSwitch }) {
    const [step, setStep] = useState(1); // 1: Details, 2: OTP
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Form State
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [country, setCountry] = useState('');
    const [incomeBracket, setIncomeBracket] = useState('');
    const [otp, setOtp] = useState('');

    const toggleShow = () => setShowPassword((s) => !s);
    const toggleConfirmShow = () => setShowConfirmPassword((s) => !s);

    const handleInitialSignup = async () => {
        // Basic validation
        if (!email || !username || !fullName || !password || !confirmPassword || !country) {
            alert("Please fill in all required fields.");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    full_name: fullName,
                    email,
                    password,
                    country,
                    income_bracket: incomeBracket
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Registration Successful! Please Login.");
                onSwitch('login');
            } else {
                alert(data.message || "Registration failed");
            }
        } catch (error) {
            console.error("Signup Error:", error);
            // Construct a meaningful error message
            let msg = "An error occurred.";
            if (error.message) msg += " " + error.message;
            alert(msg);
        }
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

            <div className="container">
                <form onSubmit={(e) => e.preventDefault()}>
                    {step === 1 ? (
                        <>
                            <label htmlFor="signup-username">Username</label>
                            <div className="input-group">
                                <input
                                    id="signup-username"
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <label htmlFor="signup-fullname">Full Name</label>
                            <div className="input-group">
                                <input
                                    id="signup-fullname"
                                    type="text"
                                    placeholder="Aafthab Ali"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
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

                            <label htmlFor="signup-country">Country</label>
                            <div className="input-group">
                                <input
                                    id="signup-country"
                                    type="text"
                                    placeholder="India"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                />
                            </div>

                            <label htmlFor="signup-income">Income Bracket (Optional)</label>
                            <div className="input-group">
                                <select
                                    id="signup-income"
                                    value={incomeBracket}
                                    onChange={(e) => setIncomeBracket(e.target.value)}
                                    style={{ width: '100%', padding: '10px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '4px', color: 'white' }}
                                >
                                    <option value="" style={{ color: 'black' }}>Select Income Bracket</option>
                                    <option value="0-25k" style={{ color: 'black' }}>$0 - $25,000</option>
                                    <option value="25k-50k" style={{ color: 'black' }}>$25,000 - $50,000</option>
                                    <option value="50k-100k" style={{ color: 'black' }}>$50,000 - $100,000</option>
                                    <option value="100k+" style={{ color: 'black' }}>$100,000+</option>
                                </select>
                            </div>

                            <label htmlFor="signup-password">Password</label>
                            <div className="input-group password-group">
                                <input
                                    id="signup-password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
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

                            <button className="signin" onClick={handleInitialSignup}>Create Account</button>
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
        </div>
    );
}

export default SignupForm;
