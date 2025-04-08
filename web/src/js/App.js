import '../css/App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from "./shared/DataProvider";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Plans from './pages/Plans';
import Payment from './pages/Payment';
import Dashboard from './pages/Dashboard';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

const stripePromise = loadStripe('pk_live_51R1t3bChxYzl4aG4ZpvGZZEklFwp8CA8YS1G3KuCvrlru4oRYLDtqwufcQQg8jiAOew9LeVgyBqLCRCRXydYnrOH000Iwden96');

function App() {
    return (
        <Elements stripe={stripePromise}>
            <DataProvider>
                <Router>
                    <Routes>
                        <Route element={<AuthLayout />}>
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/plans" element={<Plans />} />
                            <Route path="/payment" element={<Payment />} />
                        </Route>
                        <Route element={<DashboardLayout />}>
                            <Route path="*" element={<Dashboard />} />
                        </Route>
                    </Routes>
                </Router>
            </DataProvider>
        </Elements>
    );
}

export default App;
