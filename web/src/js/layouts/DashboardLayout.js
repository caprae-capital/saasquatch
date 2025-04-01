import React, {useContext, useEffect} from "react";
import {useNavigate, Outlet} from "react-router-dom";
import Header from '../components/Header';
import '../../css/DashboardLayout.css';
import _ from "lodash";
import {ACTIVE_STATUS, UNAUTHORIZED_USER} from "../shared/Constants";
import {DataContext} from "../shared/DataContext";

const DashboardLayout = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(DataContext);

    useEffect(() => {
        if (currentUser != null) {
            if (_.isEqual(currentUser, UNAUTHORIZED_USER)) {
                navigate('/login');
            } else if (currentUser.subscription_status !== ACTIVE_STATUS) {
                navigate('/plans');
            }
        }
    }, [currentUser, navigate]);

    return (
        <div className="dashboard-layout">
            <Header />
            <main className="dashboard-main">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;