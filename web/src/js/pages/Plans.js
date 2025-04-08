import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import axios from 'axios';
import loading_icon from '../../assets/loading.gif';
import '../../css/Plans.css';
import {DataContext} from "../shared/DataContext";

const Plans = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(DataContext);
    const [selectedPlan, setSelectedPlan] = useState('');
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axios.get('/api/plans');
                setPlans(response.data.plans);
                setLoading(false);
            } catch (err) {
                setError('Failed to load plans. Please try again later.');
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    useEffect(() => {
        if (currentUser) {
            setSelectedPlan(currentUser.plan_type);
        }
    }, [currentUser]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/plan_type', {
                planType: selectedPlan,
            });
            if (response.data.result === "success") {
                navigate('/payment');
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="plan-section">
            <form onSubmit={handleSubmit} className="plans-form-spacing">
                <div className="plans-form-spacing">
                    <div className="payment-header">
                        <div className="payment-header-top">
                            <h2 className="payment-title">Choose Your Plan</h2>
                            <div className="payment-progress">
                                <div className="payment-progress-circle active"></div>
                                <div className="payment-progress-circle active"></div>
                                <div className="payment-progress-circle"></div>
                            </div>
                        </div>
                    </div>

                    {loading ? <div className="loading-gif"><img src={loading_icon || ""} alt="Loading..."/></div> : (
                        <div className="plan-grid">
                            {plans.map((plan) => (
                                <div
                                    key={plan.name}
                                    className={`plan-card ${
                                        selectedPlan === plan.stripe_plan_id
                                            ? 'plan-card-selected'
                                            : 'plan-card-default'
                                    }`}
                                    onClick={() =>
                                        setSelectedPlan(plan.stripe_plan_id)
                                    }
                                >
                                    {selectedPlan === plan.stripe_plan_id && (
                                        <div className="plan-check">
                                            <CheckCircle2 className="plan-check-icon"/>
                                        </div>
                                    )}
                                    <div className="plan-details">
                                        <div className="plan-name">{plan.name}</div>
                                        <div className="plan-price-container">
                                            <span className="plan-price-amount">${plan.price}</span>
                                            <span className="plan-price-period">/month</span>
                                        </div>
                                        <p className="plan-hours">{plan.hours} hours included</p>
                                        <div className="plan-features">
                                            {plan.features.map((feature, index) => (
                                                <div key={index} className="plan-feature">
                                                    <CheckCircle2 className="feature-check-icon"/>
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="error">{error}</div>
                <div className="plan-navigation">
                    <button type="submit" className="nav-button continue-button plan-continue-button" onClick={handleSubmit} disabled={!selectedPlan}>
                        Continue
                        <ArrowRight className="nav-icon"/>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Plans;
