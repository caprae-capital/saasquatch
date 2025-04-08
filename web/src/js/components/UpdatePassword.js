import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import '../../css/UpdatePassword.css';
import axios from "axios";

function UpdatePassword() {
    const blankFormData = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    }
    const [formData, setFormData] = useState(blankFormData);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSuccess('');
        setError('');

        if (formData.newPassword !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (formData.newPassword.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        setSuccess("Updating...");
        try {
            const response = await axios.post('/api/password', {
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword,
                confirmPassword: formData.confirmPassword,
            });
            if (response.data.result === "success") {
                setFormData(blankFormData);
                setSuccess("Password updated successfully!");
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="update-passwordcontainer">
            <form onSubmit={handleSubmit} className="password-form">
                <div className="field-group">
                    <label className="password-label">Current Password</label>
                    <div className="input-wrapper">
                        <Lock className="input-icon"/>
                        <input
                            type="password"
                            value={formData.currentPassword}
                            onChange={(e) =>
                                setFormData({...formData, currentPassword: e.target.value})
                            }
                            className="password-input"
                            required
                        />
                    </div>
                </div>

                <div className="field-group">
                    <label className="password-label">New Password</label>
                    <div className="input-wrapper">
                        <Lock className="input-icon"/>
                        <input
                            type="password"
                            value={formData.newPassword}
                            onChange={(e) =>
                                setFormData({...formData, newPassword: e.target.value})
                            }
                            className="password-input"
                            required
                        />
                    </div>
                </div>

                <div className="field-group">
                    <label className="password-label">Confirm New Password</label>
                    <div className="input-wrapper">
                        <Lock className="input-icon"/>
                        <input
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) =>
                                setFormData({...formData, confirmPassword: e.target.value})
                            }
                            className="password-input"
                            required
                        />
                    </div>
                </div>

                <div className="success">{success}</div>
                <div className="error">{error}</div>
                <button type="submit" className="update-profile-setting-button">
                    Update Password
                </button>
            </form>
        </div>
    );
}

export default UpdatePassword;
