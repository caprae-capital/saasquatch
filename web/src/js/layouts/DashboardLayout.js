import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import Header from '../components/Header';
import '../../css/DashboardLayout.css';

const DashboardLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const response = await axios.get('/api/get_current_user');

                if (response.status !== 200 || !response.data.id) {
                    navigate('/login');
                }
            } catch (error) {
                navigate('/login');
            }
        };

        checkLoggedIn();
    }, [navigate]);

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