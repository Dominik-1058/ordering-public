import React from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button, Input, PasswordInput, Text, TextInput } from '@mantine/core';
import config from '../config.cfg';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsAdmin(event.target.checked);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const { username, password } = event.target.elements;

    
    fetch(config.api + '/api/users/token', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },    
      body: new URLSearchParams({
          'username': username.value,
          'password': password && password.value && password.value != "" ? password.value : 'supersecretpassword',
          'grant_type': 'password'
      })
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw response;
    }
    ).then(data => {
      login({
        username: username.value,
        token: data.access_token
      });
      navigate('/');
    }
    ).catch(error => {
      console.error('Error logging in', error);
      setError(true);
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", padding: "10px" }}>
      <div>
        <Text c='mainYellow.4' style={{margin: 0, padding: 0, fontSize: "2rem"}}>Join the drinking!</Text>
        <Text size='sm'>Your username will be displayed on the leaderboard.</Text>

        { error && <Text mt="lg" c="red">Whoops, there was an error logging you in. Make sure your username and your password are matching.</Text>}

        <form style={{marginTop: "20px"}} onSubmit={handleLogin}>
        <TextInput label="Username:" description="Your display name" name='username' type='text' />
          <br />
          <label>
            <input 
              type="checkbox" 
              checked={isAdmin} 
              onChange={handleCheckboxChange} 
            />
            I am an admin user
          </label>
          <br />
          {isAdmin && (
            <>
              <PasswordInput label="Password:" name='password'/>
              <br />
            </>
          )}
          <Button type="submit" c="mainYellow.2" mt={'lg'}>Join</Button>
        </form>
      </div>
    </div>
  );
};

export default  LoginPage;