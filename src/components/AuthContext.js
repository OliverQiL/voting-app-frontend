// src/components/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const register = async (userData) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        userData
      );
      if (res.data.token) {
        localStorage.setItem('user', JSON.stringify(res.data));
        setUser(res.data);
      }
      return res.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  };

  const login = async (credentials) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        credentials
      );
      if (res.data.token) {
        localStorage.setItem('user', JSON.stringify(res.data));
        setUser(res.data);
      }
      return res.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};