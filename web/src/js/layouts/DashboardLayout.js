import React from "react";
import { Outlet } from "react-router-dom";
import Header from '../components/Header';
import '../../css/DashboardLayout.css';

const DashboardLayout = () => {
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
