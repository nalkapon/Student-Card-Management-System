import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { setCurrentUserId } from '../utils/userUtils';  // Kullanıcı ID'sini saklamak için
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  // E-posta değişikliğini kontrol etme
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    checkFormValidity(e.target.value, password);
  };

  // Şifre değişikliğini kontrol etme
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    checkFormValidity(email, e.target.value);
  };

  // Form geçerliliğini kontrol etme
  const checkFormValidity = (email, password) => {
    if (email.trim() && password.trim()) {
      setIsButtonDisabled(false);  // Eğer her ikisi de doluysa butonu aktif et
    } else {
      setIsButtonDisabled(true);   // Eğer birisi eksikse butonu devre dışı bırak
    }
  };

  // Giriş yapma işlemi
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, {
        email: email.trim(),
        password: password.trim(),
      });

      const { userId } = response.data;
      setCurrentUserId(userId); // Kullanıcı ID'sini sakla

      // Giriş başarılıysa anasayfaya yönlendir
      navigate('/home');
    } catch (error) {
      console.error("Login Error:", error);

      if (error.response) {
        setErrorMessage(error.response.data.message || 'An unexpected error occurred.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  // Sign Up sayfasına yönlendirme
  const handleSignUpRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <h1>Welcome Back</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={handleEmailChange}
          required
        />
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
