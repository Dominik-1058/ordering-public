import { useEffect, useState } from 'react'
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { Box, Container, Grid, Group, Stack, Table, Title, Text, Center, SegmentedControl } from '@mantine/core';

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

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 430);

  useEffect(() => {
    // Function to handle screen size change
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 530);
    };

    // Add event listener to listen for window resizing
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={classes.App}>
      <>
        {isSmallScreen || user && user.username === 'admin' || !user ? (
          <>
            {user ? <HeaderComponent /> : null}
            <div className={classes.layout}>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<ProtectedRoute />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/leaderboard" element={<LeaderboardPage />} />
                  <Route path="/admin/manage-items" element={<ManageItemsPage />} />
                  <Route path="/admin/manage-orders" element={<ManageOrdersPage />} />
                  <Route path="/admin/manage-ingredients" element={<ManageIngredientsPage />} />
                </Route>
              </Routes>
            </div>
            <footer></footer>
          </>
        ) : (
          <Stack justify='center' align='center' style={{ height: "100%" }} p={'2rem'}>
            <Title order={3}>Stop using landscape mode and large screens.</Title>
            <Title order={5}>Vampurr is watching you.</Title>
          </Stack>
        )}
      </>
    </div>
  )
}

export default App
