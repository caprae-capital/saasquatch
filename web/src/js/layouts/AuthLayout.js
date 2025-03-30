import React from "react";
import { Outlet } from "react-router-dom";
import logo from '../../assets/logo.svg';
import '../../css/AuthLayout.css';

const AuthLayout = () => {
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
