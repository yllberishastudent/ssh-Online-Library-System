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

  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:5001/history/user/${bookId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "Custom-Header": "value",
        },
      });
      // Remove the book from the reading history
      setReadingHistory((prevHistory) =>
        prevHistory.filter((entry) => entry.book_id !== bookId)
      );
      console.log("Book deleted successfully.");
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await axios.delete("http://localhost:5001/history/all/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "Custom-Header": "value",
        },
      });
      // Clear the reading history
      setReadingHistory([]);
      console.log("All books deleted successfully.");
    } catch (error) {
      console.error("Error deleting books:", error);
    }
  };

  return (
    <div>
      <h2 className="user-history">User History</h2>
      <button className="delete-all-btn" onClick={handleDeleteAll}>
        Delete All
      </button>
      {readingHistory.length > 0 ? (
        <ul>
          {readingHistory.map((entry) => (
            <section className="book-details-history" key={entry.book_id}>
              <div className="container">
                <div className="book-history-content grid">
                  <div className="book-details-img">
                    <img
                      src={`/images/${entry.Book.cover_image_url}`}
                      alt={entry.Book.title}
                    />
                  </div>
                  <div className="book-history-info">
                    <div className="book-history-item title">
                      <span className="fw-6 fs-24">{entry.Book.title}</span>
                    </div>
                    <div className="book-history-item description">
                      <span className="fw-6 fs-24">
                        {entry.Book.description}
                      </span>
                    </div>
                    <div>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteBook(entry.book_id)}
                      >
                        Delete
                      </button>
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
