import React, { useEffect, useState } from "react";
import "./style/UserHistoryPage.css";
import axios from "axios";

const UserHistoryPage = ({ userId }) => {
  const [readingHistory, setReadingHistory] = useState([]);

  useEffect(() => {
    const fetchUserHistory = async () => {
      try {
        const response = await axios.get("http://localhost:5001/history/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "Custom-Header": "value",
          },
        });
        setReadingHistory(response.data);
      } catch (error) {
        console.error("Error fetching user history:", error);
      }
    };

    fetchUserHistory();
  }, [userId]);

  return (
    <div>
      <h2>User History</h2>
      {readingHistory.length > 0 ? (
        <ul>
          {readingHistory.map((entry) => (
            <section className="book-details" key={entry.history_id}>
              <div className="container">
                <div className="book-details-content grid">
                  <div className="book-details-img">
                    <img
                      src={`../${entry.Book.cover_image_url}`}
                      alt={entry.Book.title}
                    />
                  </div>
                  <div className="book-details-info">
                    <div className="book-details-item title">
                      <span className="fw-6 fs-24">{entry.Book.title}</span>
                    </div>
                    <div className="book-details-item description">
                      <span className="fw-6 fs-24">
                        {entry.Book.description}
                      </span>
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
