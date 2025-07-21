import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { setCurrentUserId } from '../utils/userUtils';
import { EmailPasswordStrategy, PhonePasswordStrategy, AuthContext } from '../strategies/AuthStrategies';

const Login = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [loginType, setLoginType] = useState('email'); // 'email' veya 'phone'

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    checkFormValidity(e.target.value, phone, password);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    checkFormValidity(email, e.target.value, password);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    checkFormValidity(email, phone, e.target.value);
  };

  const checkFormValidity = (email, phone, password) => {
    if (loginType === 'email') {
      if (email.trim() && password.trim()) {
        setIsButtonDisabled(false);
      } else {
        setIsButtonDisabled(true);
      }
    } else {
      if (phone.trim() && password.trim()) {
        setIsButtonDisabled(false);
      } else {
        setIsButtonDisabled(true);
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let strategy;
      let userId;
      if (loginType === 'email') {
        strategy = new EmailPasswordStrategy();
        const authContext = new AuthContext(strategy);
        userId = await authContext.executeLogin(email.trim(), password.trim());
      } else {
        strategy = new PhonePasswordStrategy();
        const authContext = new AuthContext(strategy);
        userId = await authContext.executeLogin(phone.trim(), password.trim());
      }

      setCurrentUserId(userId);
      navigate('/home');
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMessage(
        error.response?.data?.message || 'An unexpected error occurred.'
      );
    }
  };

  const handleSignUpRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <h1>Welcome Back</h1>
      <div className="login-type-toggle">
        <button
          type="button"
          className={loginType === 'email' ? 'active' : ''}
          onClick={() => { setLoginType('email'); checkFormValidity(email, phone, password); }}
        >
          Email ile Giriş
        </button>
        <button
          type="button"
          className={loginType === 'phone' ? 'active' : ''}
          onClick={() => { setLoginType('phone'); checkFormValidity(email, phone, password); }}
        >
          Telefon ile Giriş
        </button>
      </div>
      <form className="login-form" onSubmit={handleLogin}>
        {loginType === 'email' ? (
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={handleEmailChange}
            required
          />
        ) : (
          <input
            type="tel"
            placeholder="Telefon Numarası"
            value={phone}
            onChange={handlePhoneChange}
            required
          />
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" disabled={isButtonDisabled}>
          Login
        </button>
      </form>
      <p>
        Don’t have an account?{' '}
        <button type="button" onClick={handleSignUpRedirect} className="signup-button">
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default Login;