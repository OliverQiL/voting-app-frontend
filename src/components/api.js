// src/components/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Set up axios instance with token
const api = {
  // Get token for API calls
  getToken: () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.token : null;
  },

  // Get vote options
  getVoteOptions: async () => {
    const response = await axios.get(`${API_URL}/votes/options`);
    return response.data;
  },

  // Submit a vote
  submitVote: async (option) => {
    const token = api.getToken();
    const response = await axios.post(
      `${API_URL}/votes`,
      { option },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return response.data;
  },

  // Get voting results (admin only)
  getResults: async () => {
    const token = api.getToken();
    const response = await axios.get(
      `${API_URL}/votes/results`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return response.data;
  },

  // Get all users (admin only)
  getUsers: async () => {
    const token = api.getToken();
    const response = await axios.get(
      `${API_URL}/users`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return response.data;
  },

  // Delete a user (admin only)
  deleteUser: async (userId) => {
    const token = api.getToken();
    const response = await axios.delete(
      `${API_URL}/users/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return response.data;
  }
};

export default api;