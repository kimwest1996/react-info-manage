import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import MenuManagementPage from './pages/MenuManagementPage';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/admin" element={<AdminPage />}>
                    <Route path="menu-management" element={<MenuManagementPage />} />
                    <Route path="user-list" element={<UserPage />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRouter;
