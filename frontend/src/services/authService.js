import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/users/login`, { email, password });
        const { token, user } = response.data;

        // Save token and user data to localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('current_user_id', user.user_id);   // <-- EKLE!

        return user;
    } catch (error) {
        throw error.response?.data?.message || 'Login failed!';
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('current_user_id');
};


export const getCurrentUserId = () => {
    return localStorage.getItem('current_user_id') || null;
};

