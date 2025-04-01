import React, {useContext, useEffect} from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import _ from "lodash";
import logo from '../../assets/logo.svg';
import '../../css/AuthLayout.css';
import {DataContext} from "../shared/DataContext";
import {PUBLIC_ENDPOINTS, UNAUTHORIZED_USER} from "../shared/Constants";

const AuthLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = useContext(DataContext);

    useEffect(() => {
        if (currentUser != null && _.isEqual(currentUser, UNAUTHORIZED_USER) && !PUBLIC_ENDPOINTS.includes(location.pathname)) {
            navigate('/login');
        }
    }, [currentUser, navigate, location]);

    return (
        <div className="auth-container">
            <div className="auth-logo">
                <img src={logo || ""} alt="Saasquatch" />
            </div>
            <div className="auth-modal">
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;
