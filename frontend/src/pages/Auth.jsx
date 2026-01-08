import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import illustration from "../assets/illustration.png";

import "../styles/Auth.css";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="auth-page">
      <div className="auth-container">

     
        <div className="auth-left">
          <h1 className="logo">TaxPal</h1>
          <p className="tagline">
            Personal Finance & Tax Estimator for Freelancers
          </p>

          <img
            src={illustration}
            alt="Illustration"
            className="illustration"
          />
        </div>

        
        <div className="auth-right">
          <h2>
            {isLogin ? "Sign in to your account" : "Create your account"}
          </h2>

          <form>

            {!isLogin && (
              <>
                <label>Full Name</label>
                <input type="text" placeholder="Your full name" />
              </>
            )}

            <label>Email</label>
            <input type="email" placeholder="username@gmail.com" />

            <label>Password</label>
            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            {!isLogin && (
              <>
                <label>Confirm Password</label>
                <div className="password-box">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm password"
                  />
                  <span
                    className="eye-icon"
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    {showConfirm ? <FiEyeOff /> : <FiEye />}
                  </span>
                </div>
              </>
            )}

            {isLogin && (
              <div className="forgot-wrapper">
                <button type="button" className="link-btn">
                  Forgot password?
                </button>
              </div>
            )}

            <button type="submit" className="primary-btn">
              {isLogin ? "Sign in" : "Sign up"}
            </button>
          </form>

          <p className="switch-text">
            {isLogin ? (
              <>
                Don’t have an account?
                <button
                  type="button"
                  className="link-btn inline"
                  onClick={() => setIsLogin(false)}
                >
                  Register for free
                </button>
              </>
            ) : (
              <>
                Already have an account?
                <button
                  type="button"
                  className="link-btn inline"
                  onClick={() => setIsLogin(true)}
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
