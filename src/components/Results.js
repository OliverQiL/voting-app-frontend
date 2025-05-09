// src/components/Results.js
import React, { useState, useEffect } from 'react';
import api from './api';

const Results = () => {
  const [results, setResults] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await api.getResults();
        setResults(data.results);
        setTotalVotes(data.totalVotes);
      } catch (err) {
        setError('Failed to load results');
      }
    };
    fetchResults();
  }, []);

  return (
    <div>
      <h2>Voting Results</h2>
      {error && <p className="error">{error}</p>}
      <p>Total votes: {totalVotes}</p>
      
      {results.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Option</th>
              <th>Votes</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {results.map((option) => (
              <tr key={option.name}>
                <td>{option.name}</td>
                <td>{option.count}</td>
                <td>
                  {totalVotes > 0
                    ? `${((option.count / totalVotes) * 100).toFixed(1)}%`
                    : '0%'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No votes have been cast yet.</p>
      )}
    </div>
  );
};

export default Results;