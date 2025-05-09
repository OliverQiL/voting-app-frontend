// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthContext, AuthProvider } from './components/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Vote from './components/Vote';
import Results from './components/Results';
import Users from './components/Users';

// Navigation component
const Navigation = () => {
  const { user, logout } = useContext(AuthContext);
  
  return (
    <nav>
      <Link to="/">Home</Link>
      {user ? (
        <>
          <Link to="/vote">Vote</Link>
          {user.isAdmin && (
            <>
              <Link to="/results">Results</Link>
              <Link to="/users">Users</Link>
            </>
          )}
          <button onClick={logout}>Logout</button>
          <span>Logged in as: {user.username}</span>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

// Main content component
const AppContent = () => {
  const { user } = useContext(AuthContext);
  
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<h1>Voting App</h1>} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/vote" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/vote" />} />
        <Route path="/vote" element={user ? <Vote /> : <Navigate to="/login" />} />
        <Route path="/results" element={user && user.isAdmin ? <Results /> : <Navigate to="/" />} />
        <Route path="/users" element={user && user.isAdmin ? <Users /> : <Navigate to="/" />} />
      </Routes>
    </>
  );
};

// Main App with context provider
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;