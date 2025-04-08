import React, {useEffect, useState} from 'react';
import { CheckCircle2, Calendar } from 'lucide-react';
import '../../css/UpdatePlan.css';
import axios from "axios";
import loading_icon from "../../assets/loading.gif";

function UpdatePlan() {
    const [currentPlan, setCurrentPlan] = useState('');
    const [selectedPlan, setSelectedPlan] = useState('');
    const [plans, setPlans] = useState([]);
    const [planLoading, setPlanLoading] = useState(true);
    const [plansLoading, setPlansLoading] = useState(true);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPlan = async () => {
            try {
                const response = await axios.get('/api/plan');
                setCurrentPlan(response.data.plan);
                setSelectedPlan(response.data.plan);
                setPlanLoading(false);
            } catch (err) {
                setError('Failed to load plan. Please try again later.');
                setPlanLoading(false);
            }
        };
        const fetchPlans = async () => {
            try {
                const response = await axios.get('/api/plans');
                setPlans(response.data.plans);
                setPlansLoading(false);
            } catch (err) {
                setError('Failed to load plans. Please try again later.');
                setPlansLoading(false);
            }
        };

        fetchPlan();
        fetchPlans();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        setSuccess("Updating...");
        try {
            const response = await axios.post('/api/plan', {
                planType: selectedPlan.stripe_plan_id,
            });
            if (response.data.result === "success") {
                setCurrentPlan(selectedPlan);
                setSuccess("Plan updated successfully!");
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="update-plan-container">
            <form onSubmit={handleSubmit} className="plans-space-y-6">
                {planLoading ?
                    <div className="loading-gif"><img src={loading_icon || ""} alt="Loading..."/></div> : (
                        <div className="current-plan-card">
                            <div className="current-plan-info">
                                <div className="current-plan-icon-container">
                                    <Calendar class="current-plan-icon"/>
                                </div>
                                <div className="current-plan-text">
                                    <div className="current-plan-name">Current Plan: {currentPlan.name}</div>
                                    <div className="current-plan-price">${currentPlan.price}/month</div>
                                </div>
                            </div>
                        </div>
                    )}

                <div className="available-plans-section">
                    <h3 className="available-plans-title">Available Plans</h3>
                    {plansLoading ?
                        <div className="loading-gif"><img src={loading_icon || ""} alt="Loading..."/></div> : (
                            <div className="available-plans-grid">
                                {plans.map((plan) => (
                                    <button
                                        type="button"
                                        key={plan.stripe_plan_id}
                                        onClick={() => setSelectedPlan(plan)}
                                        className={`plan-button ${selectedPlan.stripe_plan_id === plan.stripe_plan_id ? 'plan-button-selected' : 'plan-button-default'}`}
                                    >
                                        <div className="plan-button-header">
                                            <div>
                                                <h4 className="plan-name">{plan.name}</h4>
                                                <div className="plan-price">
                                                    <span className="plan-price-amount">${plan.price}</span>
                                                    <span className="plan-price-period">/mo</span>
                                                </div>
                                            </div>
                                            {selectedPlan.stripe_plan_id === plan.stripe_plan_id &&
                                                <CheckCircle2 class="plan-selected-icon"/>}
                                        </div>
                                        <p className="plan-hours">{plan.hours} hours/month</p>
                                    </button>
                                ))}
                            </div>
                        )}
                </div>
                <div className="success">{success}</div>
                <div className="error">{error}</div>
                <button type="submit" className="update-profile-setting-button">
                    Update Plan
                </button>
            </form>
        </div>
    );
}

export default UpdatePlan;
