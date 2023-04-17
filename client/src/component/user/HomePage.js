import React, { useState, useEffect } from "react";
import "./HomePage.css";
import axios from "axios";
const token = localStorage.getItem("token");

const images = {};

function importAll(r) {
  r.keys().forEach((key) => (images[key] = r(key)));
}

importAll(require.context("../..", true, /\.jpg$/));
function HomePage() {
  const [books, setBooks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5001/books", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

      axios
      .get("http://localhost:5001/reviews", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filteredBooks = books.filter((book) => {
    const titleMatch = book.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const authorMatch = book.author
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return titleMatch || authorMatch;
  });

  const calculateAverageRating = (bookId) => {
    const reviewsForBook = reviews.filter(
      (review) => review.book_id === bookId
    );
    const numReviews = reviewsForBook.length;
    if (numReviews === 0) {
      return null;
    }
    const totalRating = reviewsForBook.reduce(
      (sum, review) => sum + review.star,
      0
    );
    const averageRating = totalRating / numReviews;
    return averageRating;
  };

  return (
    <div className="wrapper">
      <div className="titles">
      <h2>All Books</h2>
      <h2>Popular</h2>
      </div>
      <div className="filters-homepage">
        <input
          type="text"
          placeholder="Search by name or author"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid-container-homepage">
        {filteredBooks.map((book) => (
          <div key={book.id} className="grid-item-homepage">
            <img src={images[`./${book.cover_image_url}`]} alt="Animal Farm" />
            <h2>{book.title}</h2>
            <p>{book.author}</p>
            <p>Average Rating: {calculateAverageRating(book.id)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
