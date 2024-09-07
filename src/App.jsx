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
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<ProtectedRoute />} >
                <Route path="/" element={<HomePage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="/manage-items" element={<ManageItemsPage />} />
                <Route path="/manage-orders" element={<ManageOrdersPage />} />
                <Route path="/manage-ingredients" element={<ManageIngredientsPage />} />
              </Route>
          </Routes>
        </div>
        <footer></footer>
    </div>
  )
}

export default App
