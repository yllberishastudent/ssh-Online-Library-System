import React, { useEffect, useState } from 'react';
import "./style/UserHistoryPage.css";
import axios from 'axios';

const UserHistoryPage = ({ userId }) => {
  const [readingHistory, setReadingHistory] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5001/history/user`)
      .then(response => setReadingHistory(response.data))
      .catch(error => console.error('Error fetching user history:', error));
  }, [userId]);

  return (
    <div>
      <h2>User History</h2>
      {readingHistory.length > 0 ? (
        <ul>
          {readingHistory.map((book) => (
            <li key={book.id}>
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              {/* Add more book details as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No reading history found.</p>
      )}
    </div>
  );
};

export default UserHistoryPage;