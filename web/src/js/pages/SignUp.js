import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/SignUp.css';
import { User, Mail, Lock } from 'lucide-react';

const Signup = () => {
    const navigate = useNavigate();
    const [signupData, setSignupData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (signupData.password !== signupData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (signupData.password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        try {
            const response = await axios.post('/api/signup', {
                firstName: signupData.firstName,
                lastName: signupData.lastName,
                email: signupData.email,
                password: signupData.password,
            });
            if (response.data.result === "success") {
                navigate('/plans');
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="signup-container">
            <div className="payment-header">
                <div className="payment-header-top">
                    <h2 className="payment-title">Create Account</h2>
                    <div className="payment-progress">
                        <div className="payment-progress-circle active"></div>
                        <div className="payment-progress-circle"></div>
                        <div className="payment-progress-circle"></div>
                    </div>
                </div>
            </div>
            <div className="signup-grid">
                <div className="signup-field-group">
                    <label className="signup-label">First Name</label>
                    <div className="signup-input-wrapper">
                        <User className="signup-icon"/>
                        <input
                            type="text"
                            value={signupData.firstName}
                            onChange={(e) => setSignupData({...signupData, firstName: e.target.value})}
                            className="signup-input"
                            placeholder="John"
                            required
                        />
                    </div>
                </div>
                <div className="signup-field-group">
                    <label className="signup-label">Last Name</label>
                    <div className="signup-input-wrapper">
                        <User className="signup-icon"/>
                        <input
                            type="text"
                            value={signupData.lastName}
                            onChange={(e) => setSignupData({...signupData, lastName: e.target.value})}
                            className="signup-input"
                            placeholder="Doe"
                            required
                        />
                    </div>
                </div>
            </div>
            <div className="signup-field-group">
                <label className="signup-label">Email Address</label>
                <div className="signup-input-wrapper">
                    <Mail className="signup-icon"/>
                    <input
                        type="email"
                        value={signupData.email}
                        onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                        className="signup-input"
                        placeholder="you@company.com"
                        required
                    />
                </div>
            </div>
            <div className="signup-field-group">
                <label className="signup-label">Password</label>
                <div className="signup-input-wrapper">
                    <Lock className="signup-icon"/>
                    <input
                        type="password"
                        value={signupData.password}
                        onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                        className="signup-input"
                        placeholder="••••••••"
                        required
                    />
                </div>
            </div>
            <div className="signup-field-group">
                <label className="signup-label">Confirm Password</label>
                <div className="signup-input-wrapper">
                    <Lock className="signup-icon"/>
                    <input
                        type="password"
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                        className="signup-input"
                        placeholder="••••••••"
                        required
                    />
                </div>
            </div>
            <div className="error">{error}</div>
            <button type="submit" className="submit-button">Sign Up</button>
            <div className="text-center">
                <button type="button" onClick={() => navigate('/login')} className="login-button">
                    Already have an account? Sign in
                </button>
            </div>
        </form>
    );
};

export default Signup;
