import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { DataContext } from "../shared/DataContext";
import axios from "axios";
import loading_icon from "../../assets/loading.gif";
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import '../../css/Payment.css';

const Payment = () => {
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const { currentUser, reloadCurrentUser } = useContext(DataContext);
    const [plan, setPlan] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        setSubmitting(true);
        const cardNumberElement = elements.getElement(CardNumberElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardNumberElement,
        });

        if (error) {
            setError(error.message);
            setSubmitting(false);
        } else {
            try {
                const response = await axios.post('/api/purchase', {payment_method_id: paymentMethod.id});
                if (response.data.result === "success") {
                    await reloadCurrentUser();
                    navigate('/');
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                console.error('Error while storing payment method:', error);
            } finally {
                setSubmitting(false);
            }
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
                            <label className="payment-label">Card Number</label>
                            <div className="payment-input-wrapper">
                                <CardNumberElement
                                    id="card-number"
                                    options={{
                                        style: {
                                            base: {
                                                fontSize: '18px',
                                                color: '#424770',
                                                '::placeholder': { color: '#aab7c4' },
                                            },
                                            invalid: { color: '#9e2146' },
                                        },
                                    }}
                                />
                            </div>
                        </div>

                        <div className="payment-input-grid">
                            <div className="payment-field-group">
                                <label className="payment-label">Expiry Date</label>
                                <CardExpiryElement
                                    id="card-expiry"
                                    options={{
                                        style: {
                                            base: {
                                                fontSize: '18px',
                                                color: '#424770',
                                                '::placeholder': { color: '#aab7c4' },
                                            },
                                            invalid: { color: '#9e2146' },
                                        },
                                    }}
                                />
                            </div>
                            <div className="payment-field-group">
                                <label className="payment-label">CVC</label>
                                <CardCvcElement
                                    id="card-cvc"
                                    options={{
                                        style: {
                                            base: {
                                                fontSize: '18px',
                                                color: '#424770',
                                                '::placeholder': { color: '#aab7c4' },
                                            },
                                            invalid: { color: '#9e2146' },
                                        },
                                    }}
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
                        disabled={submitting}
                    >
                        Complete Signup
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Payment;
