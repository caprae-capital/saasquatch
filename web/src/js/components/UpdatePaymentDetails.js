import React, {useEffect, useState} from 'react';
import {CreditCardIcon} from 'lucide-react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../../css/UpdatePaymentDetails.css';
import axios from "axios";
import loading_icon from "../../assets/loading.gif";

function UpdatePaymentDetails() {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentDetailsLoading, setPaymentDetailsLoading] = useState(true);
    const [paymentDetails, setPaymentDetails] = useState({});
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const fetchPaymentMethod = async () => {
        try {
            const response = await axios.get('/api/payment');
            setPaymentDetails(response.data.payment_method);
            setPaymentDetailsLoading(false);
        } catch (err) {
            setError('Failed to load payment method. Please try again later.');
            setPaymentDetailsLoading(false);
        }
    };

    useEffect(() => {
        fetchPaymentMethod();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSuccess('');
        setError('');

        setSuccess("Updating...");
        const cardNumberElement = elements.getElement(CardNumberElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardNumberElement,
        });

        if (error) {
            setError(error.message);
        } else {
            try {
                const response = await axios.post('/api/payment', {payment_method_id: paymentMethod.id});
                setSuccess("");
                if (response.data.result === "success") {
                    setPaymentDetailsLoading(true)
                    fetchPaymentMethod();
                    setSuccess('Payment Details saved successfully!');
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                console.error('Error while storing payment method:', error);
            } finally {
                setPaymentDetailsLoading(false);
            }
        }
    };

    return (
        <div className="update-payment-details-container">
            <form onSubmit={handleSubmit} className="payment-form">
                {paymentDetailsLoading ?
                    <div className="loading-gif"><img src={loading_icon || ""} alt="Loading..."/></div> : (
                        <div className="current-plan-card">
                            <div className="current-plan-info">
                                <div className="current-plan-icon-container">
                                    <CreditCardIcon class="current-plan-icon"/>
                                </div>
                                <div className="current-plan-text">
                                    <div className="current-plan-name">Last 4 Digits: {paymentDetails.card.last4}</div>
                                    <div className="current-plan-price">Exp: {paymentDetails.card.exp_month}/{paymentDetails.card.exp_year}</div>
                                </div>
                            </div>
                        </div>
                    )}

                <div className="field-group">
                    <label className="payment-label">Card Information</label>
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
                    <div className="payment-input-grid">
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
