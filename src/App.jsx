import { useState } from 'react'
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import HeaderComponent from './components/HeaderComponent';
import HomePage from './pages/HomePage';
import ManageItemsPage from './pages/ManageItemsPage';
import ManageOrdersPage from './pages/ManageOrdersPage';
import ManageIngredientsPage from './pages/ManageIngredientsPage';
import LeaderboardPage from './pages/LeaderboardPage';
import LoginPage from './pages/LoginPage';

import classes from './App.module.css';
import { AuthProvider, useAuth } from './AuthContext';

function App() {
  const [count, setCount] = useState(0)

  const { user } = useAuth();

  return (
    <div className={classes.App}>
        {user ? <HeaderComponent /> : null }
        <div className={classes.layout}>
          <Routes>
              <Route path="ordering-public/#/login" element={<LoginPage />} />
              <Route path="ordering-public/#/" element={<ProtectedRoute />} >
                <Route path="ordering-public/#/" element={<HomePage />} />
                <Route path="ordering-public/#/leaderboard" element={<LeaderboardPage />} />
                <Route path="ordering-public/#/admin/manage-items" element={<ManageItemsPage />} />
                <Route path="ordering-public/#/admin/manage-orders" element={<ManageOrdersPage />} />
                <Route path="ordering-public/#/admin/manage-ingredients" element={<ManageIngredientsPage />} />
              </Route>
          </Routes>
        </div>
        <footer></footer>
    </div>
  )
}

export default App
