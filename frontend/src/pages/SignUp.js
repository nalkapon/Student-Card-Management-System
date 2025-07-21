import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';
import { setCurrentUserId } from '../utils/userUtils';

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        password: '',
        name: '',
        contact_details: '',
    });
    const [error, setError] = useState('');
    const [signUpType, setSignUpType] = useState('email'); // 'email' veya 'phone'
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const navigate = useNavigate();

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        checkFormValidity({ ...formData, [name]: value });
    };

    const checkFormValidity = (data) => {
        if (signUpType === 'email') {
            if (data.email.trim() && data.password.trim() && data.name.trim()) {
                setIsButtonDisabled(false);
            } else {
                setIsButtonDisabled(true);
            }
        } else {
            if (data.phone.trim() && data.password.trim() && data.name.trim()) {
                setIsButtonDisabled(false);
            } else {
                setIsButtonDisabled(true);
            }
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        let payload = {
            password: formData.password,
            name: formData.name,
            contact_details: formData.contact_details,
        };
        if (signUpType === 'email') {
            payload.email = formData.email;
        } else {
            payload.phone = formData.phone;
        }
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/users`, payload);
            if (response.status === 201) {
                alert('Sign-Up Successful!');
                navigate('/login'); // Redirect to login
            }
        } catch (error) {
            console.error('Sign-Up Failed:', error);
            setError(error.response?.data?.message || 'Sign-Up failed.');
        }
    };

    return (
        <div className="signup-container">
            <h1>Create an Account</h1>
            <div className="login-type-toggle">
                <button
                    type="button"
                    className={signUpType === 'email' ? 'active' : ''}
                    onClick={() => { setSignUpType('email'); checkFormValidity(formData); }}
                >
                    Email ile Kayıt
                </button>
                <button
                    type="button"
                    className={signUpType === 'phone' ? 'active' : ''}
                    onClick={() => { setSignUpType('phone'); checkFormValidity(formData); }}
                >
                    Telefon ile Kayıt
                </button>
            </div>
            <form className="signup-form" onSubmit={handleSignUp}>
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                {signUpType === 'email' ? (
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                ) : (
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Telefon Numarası"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                )}
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="contact_details"
                    placeholder="Contact Details (Optional)"
                    value={formData.contact_details}
                    onChange={handleChange}
                />
                <button type="submit" disabled={isButtonDisabled}>Sign Up</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <p>
                Already have an account?{' '}
                <button type="button" onClick={() => navigate('/login')} className="login-button">
                    Log In
                </button>
            </p>
        </div>
    );
};

export default SignUp;
