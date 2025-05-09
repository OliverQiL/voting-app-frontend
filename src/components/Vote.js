// src/components/Vote.js
import React, { useState, useEffect } from 'react';
import api from './api';

const Vote = () => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [newOption, setNewOption] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const data = await api.getVoteOptions();
        setOptions(data);
      } catch (err) {
        setError('Failed to load options');
      }
    };
    fetchOptions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const option = newOption || selectedOption;
    if (!option) {
      setError('Please select an option or enter a new one');
      return;
    }

    try {
      await api.submitVote(option);
      setMessage('Vote submitted successfully!');
      setNewOption('');
      setSelectedOption('');
      
      // Refresh options
      const data = await api.getVoteOptions();
      setOptions(data);
    } catch (err) {
      setError('Failed to submit vote');
    }
  };

  return (
    <div>
      <h2>Cast Your Vote</h2>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select an existing option:</label>
          <br />
          {options.map((option) => (
            <div key={option.name}>
              <input
                type="radio"
                id={option.name}
                name="option"
                value={option.name}
                checked={selectedOption === option.name}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              <label htmlFor={option.name}>{option.name}</label>
            </div>
          ))}
        </div>
        
        <div className="form-group">
          <label>Or enter a new option:</label>
          <br />
          <input
            type="text"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            placeholder="New option"
          />
        </div>
        
        <button type="submit">Submit Vote</button>
      </form>
    </div>
  );
};

export default Vote;