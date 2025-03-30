import React, {useEffect} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import logo from '../../assets/logo.svg';
import '../../css/AuthLayout.css';
import axios from "axios";

const AuthLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const response = await axios.get('/api/get_current_user');

                if (response.data.subscription_status === 'active') {
                    navigate('/');
                } else if (response.data.id) {
                    navigate('/plans');
                } else {
                    navigate('/login');
                }
            } catch (error) {
                navigate('/login');
            }
        };

        checkLoggedIn();
    }, [navigate]);

    return (
        <div className="auth-container">
            <div className="auth-logo">
                <img src={logo || ""} alt="Saasquatch"/>
            </div>
            <div className="auth-modal">
                <Outlet/>
            </div>
        </div>
    )
};

export default AuthLayout;
