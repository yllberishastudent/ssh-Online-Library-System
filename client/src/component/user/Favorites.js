import React, { useState, useEffect } from "react";
import "./style/HomePage.css";
import "./style/Favorites.css";
import axios from "axios";
import { Link } from "react-router-dom";
const images = {}
function Favorites() {
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    const token = localStorage.getItem("token");

    const getAllFavorites = async () => {
      try {
        const response = await axios.get("/favorite", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        const favorites = response.data;
        const bookPromises = favorites.map((book) =>
          axios.get(`/books/${book.book_id}`, {headers: {
            Authorization: `Bearer ${token}`,
          },})
        );
        const bookResponses = await Promise.all(bookPromises);
        const bookData = bookResponses.map((response) => response.data);

        setBooks(bookData);
      } catch (error) {
        console.error(error);
        // Handle error state or display error message
      }
    };

    getAllFavorites();
  }, []);

  const unlikeBook = async (bookId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/favorite/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks((prevBooks) =>
        prevBooks.filter((book) => book.book_id !== bookId)
      );
    } catch (error) {
      console.error(error);
      // Handle error state or display error message
    }
  };

  if (books.length === 0) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <div className="loader-text">Loading...</div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="favorites__wrapper">
        {books.map((book) => (
          <div key={book.book_id} className="favorites-item">
            <Link to={`/user/books/${book.book_id}`}>
              <img
                src={images[`./${book.cover_image_url}`]}
                alt={`${book.title}`}
              />
              <div className="book--info">
                <h2>{book.title}</h2>
                <p>{book.author}</p>
              </div>
            </Link>
            <button onClick={() => unlikeBook(book.book_id)} className="favorites__btn">Unlike</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
