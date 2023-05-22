import React, { useEffect, useState } from 'react';
import "./style/UserHistoryPage.css";
import axios from 'axios';

const images = {};

const token = localStorage.getItem("token");
const UserHistoryPage = ({ userId }) => {
  const [readingHistory, setReadingHistory] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5001/history/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "Custom-Header": "value",
      },
    })
      .then(response => setReadingHistory(response.data))
      .catch(error => console.error('Error fetching user history:', error));
  }, [userId]);

  return (
    <div>
      <h2>User History</h2>
      {readingHistory.length > 0 ? (
        <ul>
          {readingHistory.map((book) => (
           <section className="book-details">
           <div className="container">
             <div className="book-details-content grid">
               <div className="book-details-img">
                 <img src={images[`./${book.cover_image_url}`]} alt={book.title} />
               </div>
               <div className="book-details-info">
                 <div className="book-details-item title">
                   <span className="fw-6 fs-24">{book.title}</span>
                 </div>
                 <div className="book-details-item description">
                   <span className="fw-6 fs-24">{book.description}</span>
                 </div>
                </div>
              </div>
            </div>
            </section>
          ))}
        </ul>
      ) : (
        <p>No reading history found.</p>
      )}
    </div>
  );
};

export default UserHistoryPage;
