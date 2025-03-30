import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from "../shared/DataContext";
import axios from "axios";
import loading_icon from "../../assets/loading.gif";
import { CheckCircle2, ArrowLeft, User, CreditCard } from 'lucide-react';
import '../../css/Payment.css';

const Payment = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(DataContext);
    const [plan, setPlan] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [paymentData, setPaymentData] = useState({
        nameOnCard: '',
        cardNumber: '',
        expiry: '',
        cvc: ''
    });
    const [error, setError] = useState('');

    const isFormValid = Object.values(paymentData).every((value) => value.trim() !== '');

    useEffect(() => {
        const fetchPlan = async () => {
            try {
                const response = await axios.get('/api/plan');
                setPlan(response.data.plan);
                setLoading(false);
            } catch (err) {
                setError('Failed to load plans. Please try again later.');
                setLoading(false);
            }
        };

        fetchPlan();
    }, [currentUser]);

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
            setError(
                'Invalid expiry date. Valid format is MM/YY'
            );
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formattedExpiry = validateAndFormatExpiry(paymentData.expiry);
        if (!formattedExpiry) {
            return;
        }

        setSubmitting(true);
        try {
            const response = await axios.post('/api/payment', {
                nameOnCard: paymentData.nameOnCard,
                cardNumber: paymentData.cardNumber,
                expiry: paymentData.expiry,
                cvc: paymentData.cvc,
            });
            if (response.data.result === "success") {
                navigate('/');
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="payment-container">
            <div className="payment-header">
                <div className="payment-header-top">
                    <h2 className="payment-title">Payment Details</h2>
                    <div className="payment-progress">
                        <div className="payment-progress-circle active"></div>
                        <div className="payment-progress-circle active"></div>
                        <div className="payment-progress-circle active"></div>
                    </div>
                </div>
                <div className="payment-form-header">
                    <p className="payment-form-subtitle">
                        Enter your payment information to complete signup
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="payment-form">
                <div className="payment-form-section">
                    {loading ? (
                        <div className="loading-gif">
                            <img src={loading_icon || ""} alt="Loading..." />
                        </div>
                    ) : (
                        <div className="payment-plan-card">
                            <div className="payment-plan-card-top">
                                <div className="payment-plan-info">
                                    <CheckCircle2 className="payment-check-icon" />
                                    <div>
                                        <div className="payment-plan-name">
                                            Selected Plan: {plan.name}
                                        </div>
                                        <div className="payment-plan-price">
                                            ${plan.price}/month
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="payment-input-group">
                        <div className="payment-field-group">
                            <label className="payment-label">Name on Card</label>
                            <div className="payment-input-wrapper">
                                <User className="payment-input-icon" />
                                <input
                                    type="text"
                                    value={paymentData.nameOnCard}
                                    onChange={(e) =>
                                        setPaymentData({
                                            ...paymentData,
                                            nameOnCard: e.target.value,
                                        })
                                    }
                                    className="payment-input"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                        </div>

                        <div className="payment-field-group">
                            <label className="payment-label">Card Number</label>
                            <div className="payment-input-wrapper">
                                <CreditCard className="payment-input-icon" />
                                <input
                                    type="text"
                                    value={paymentData.cardNumber}
                                    onChange={(e) =>
                                        setPaymentData({
                                            ...paymentData,
                                            cardNumber: e.target.value,
                                        })
                                    }
                                    className="payment-input"
                                    placeholder="1234 5678 9012 3456"
                                    required
                                />
                            </div>
                        </div>

                        <div className="payment-input-grid">
                            <div className="payment-field-group">
                                <label className="payment-label">Expiry Date</label>
                                <input
                                    type="text"
                                    value={paymentData.expiry}
                                    onChange={(e) =>
                                        setPaymentData({
                                            ...paymentData,
                                            expiry: e.target.value,
                                        })
                                    }
                                    onBlur={handleExpiryBlur}
                                    className="payment-input-narrow"
                                    placeholder="MM/YY"
                                    required
                                />
                            </div>
                            <div className="payment-field-group">
                                <label className="payment-label">CVC</label>
                                <input
                                    type="text"
                                    value={paymentData.cvc}
                                    onChange={(e) =>
                                        setPaymentData({
                                            ...paymentData,
                                            cvc: e.target.value,
                                        })
                                    }
                                    className="payment-input-narrow"
                                    placeholder="123"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="error">{error}</div>
                {submitting && (
                    <div className="loading-gif">
                        <img src={loading_icon || ""} alt="Loading..." />
                    </div>
                )}
                <div className="payment-navigation">
                    <button
                        type="button"
                        onClick={() => navigate('/plans')}
                        className="payment-nav-button back-button"
                    >
                        <ArrowLeft className="payment-nav-icon" />
                        Back
                    </button>

                    <button
                        type="submit"
                        className="payment-nav-button continue-button"
                        disabled={!isFormValid || submitting}
                    >
                        Complete Signup
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Payment;
