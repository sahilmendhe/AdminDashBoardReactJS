import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      // Make a POST request to the login API
      const response = await fetch('https://stg.dhunjam.in/account/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Assuming a successful login
        console.log('Login successful');
        navigate('/admin-dashboard');
      } else {
        // Handle login error
        console.error('Login failed');
        alert('Wrong username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen text-white'>
      <h1 className='text-3xl text-white font-bold px-8'>Venue Admin Login</h1>
      <div className='w-3/4 sm:w-2/5 mt-12'>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Username'
          className='rounded-2xl border-2 border-white bg-black w-full h-12 p-3 focus:outline-none'
        />
      </div>
      <div className='relative w-3/4 sm:w-2/5 mt-8 focus:outline-none'>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          placeholder='Password'
          className='rounded-2xl border-2 border-white bg-black w-full h-full p-3 pl-3 bg-transparent focus:outline-none'
        />
        <button
          onClick={togglePasswordVisibility}
          className='absolute top-1/2 right-3 transform -translate-y-1/2 text-white'
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
      <button
        onClick={handleLogin}
        className='p-3 bg-[#6741d9] mt-12 w-3/4 sm:w-2/5 rounded-xl mb-4 text-bold text-xl'
      >
        Sign in
      </button>
      <p className='hover:cursor-pointer'>New Registration?</p>
    </div>
  );
};

export default LoginPage;
