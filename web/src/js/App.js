import '../css/App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from "./shared/DataProvider";
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Plans from './pages/Plans';
import Payment from './pages/Payment';
import Dashboard from './pages/Dashboard';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

function App() {
    return (
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
    );
}

export default App;
