import React, { useState } from 'react';
import { X } from 'lucide-react';
import '../../css/ProfileSettings.css';
import UpdatePassword from "./UpdatePassword";
import UpdatePaymentDetails from "./UpdatePaymentDetails";
import UpdatePlan from "./UpdatePlan";

function ProfileSettings({ setShowProfileSettings }) {
    const [activeTab, setActiveTab] = useState('password');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'password':
                return <UpdatePassword />;
            case 'payment':
                return <UpdatePaymentDetails />;
            case 'plan':
                return <UpdatePlan />;
            default:
                return <UpdatePassword />;
        }
    };

    return (
        <div className="profile-settings-container">
            <div className="modal-container">
                <div className="modal-header">
                    <div className="modal-header-top">
                        <h2 className="modal-title">Profile Settings</h2>
                        <button
                            className="modal-close-button"
                            onClick={() => setShowProfileSettings(false)}
                        >
                            <X className="modal-close-icon"/>
                        </button>
                    </div>
                    <div className="tab-container">
                        <button className={`tab-button ${activeTab === 'password' ? "active" : ""}`}
                                onClick={() => setActiveTab('password')}>
                            Password
                        </button>
                        <button className={`tab-button ${activeTab === 'payment' ? "active" : ""}`}
                                onClick={() => setActiveTab('payment')}>
                            Payment Details
                        </button>
                        <button className={`tab-button ${activeTab === 'plan' ? "active" : ""}`}
                                onClick={() => setActiveTab('plan')}>
                            Plan
                        </button>
                    </div>
                </div>
                <div className="modal-body">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
}

export default ProfileSettings;
