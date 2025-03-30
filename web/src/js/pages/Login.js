import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/Login.css';
import { Mail, Lock } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const validateEmail = () => {
        if (!email) {
            setError('Email is required');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Invalid email address');
            return false;
        }
        setError('');
        return true;
    };

    const validatePassword = () => {
        if (!password) {
            setError('Password is required');
            return false;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        if (!isEmailValid || !isPasswordValid) {
            return;
        }

        try {
            const response = await axios.post('/api/login', {
                email: email,
                password: password,
            });
            console.log('Login successful:', response.data);
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="input-field-group">
                    <label className="input-field-label">Email Address</label>
                    <div className="input-field-icon-wrapper">
                        <Mail className="input-field-icon"/>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-field-input"
                            placeholder="you@company.com"
                            required
                        />
                    </div>
                </div>
                <div className="input-field-group">
                    <label className="input-field-label">Password</label>
                    <div className="input-field-icon-wrapper">
                        <Lock className="input-field-icon"/>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field-input"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </div>
                <div className="error">{error}</div>
                <button type="submit" className="submit-button">Sign In</button>
                <div className="text-center">
                    <button type="button" onClick={() => navigate('/signup')} className="signup-button">
                        Don't have an account? Sign up
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
