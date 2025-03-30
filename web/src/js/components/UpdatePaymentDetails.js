import React, { useState } from 'react';
import { User, CreditCardIcon } from 'lucide-react';
import '../../css/UpdatePaymentDetails.css';
import axios from "axios";

function UpdatePaymentDetails() {
    const blankPaymentData = {
        nameOnCard: '',
        cardNumber: '',
        expiry: '',
        cvc: ''
    }
    const [paymentData, setPaymentData] = useState(blankPaymentData);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const validateAndFormatExpiry = (value) => {
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
            setError('Invalid expiry date format. Use MM/YY.');
            return '';
        }
        setError('');
        return value;
    };

    const handleExpiryBlur = (event) => {
        const value = event.target.value.trim();
        if (/^\d{4}$/.test(value)) {
            const formattedExpiry = `${value.slice(0, 2)}/${value.slice(2)}`;
            setPaymentData({ ...paymentData, expiry: formattedExpiry });
            setError('');
        } else if (/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
            setPaymentData({ ...paymentData, expiry: value });
            setError('');
        } else {
            setError('Invalid expiry date. Valid format is MM/YY');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSuccess('');
        setError('');

        const formattedExpiry = validateAndFormatExpiry(paymentData.expiry);
        if (!formattedExpiry) {
            return;
        }

        setSuccess("Updating...");
        try {
            const response = await axios.post('/api/payment', {
                nameOnCard: paymentData.nameOnCard,
                cardNumber: paymentData.cardNumber,
                expiry: paymentData.expiry,
                cvc: paymentData.cvc,
            });
            if (response.data.result === "success") {
                setPaymentData(blankPaymentData);
                setSuccess("Payment details updated successfully!");
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="update-payment-details-container">
            <form onSubmit={handleSubmit} className="payment-form">
                <div className="field-group">
                    <label className="payment-label">Name on Card</label>
                    <div className="payment-input-wrapper">
                        <User className="payment-input-icon" />
                        <input
                            type="text"
                            value={paymentData.nameOnCard}
                            onChange={(e) =>
                                setPaymentData({ ...paymentData, nameOnCard: e.target.value })
                            }
                            className="payment-input"
                            required
                        />
                    </div>
                </div>

                <div className="field-group">
                    <label className="payment-label">Card Information</label>
                    <div className="payment-input-wrapper">
                        <CreditCardIcon className="payment-input-icon" />
                        <input
                            type="text"
                            value={paymentData.cardNumber}
                            onChange={(e) =>
                                setPaymentData({ ...paymentData, cardNumber: e.target.value })
                            }
                            className="payment-input"
                            placeholder="Card number"
                            required
                        />
                    </div>
                    <div className="payment-input-grid">
                        <input
                            type="text"
                            value={paymentData.expiry}
                            onChange={(e) =>
                                setPaymentData({ ...paymentData, expiry: e.target.value })
                            }
                            className="payment-input-narrow"
                            placeholder="MM/YY"
                            onBlur={handleExpiryBlur}
                            required
                        />
                        <input
                            type="text"
                            value={paymentData.cvc}
                            onChange={(e) =>
                                setPaymentData({ ...paymentData, cvc: e.target.value })
                            }
                            className="payment-input-narrow"
                            placeholder="CVC"
                            required
                        />
                    </div>
                </div>

                <div className="success">{success}</div>
                <div className="error">{error}</div>
                <button type="submit" className="update-profile-setting-button">
                    Update Payment Details
                </button>
            </form>
        </div>
    );
}

export default UpdatePaymentDetails;
