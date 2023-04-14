import React, { useState, useEffect } from "react";
import "./FirstPage.css";
import axios from "axios";

const images = {};

function importAll(r) {
  r.keys().forEach(key => (images[key] = r(key)));
}

importAll(require.context("../..", true, /\.jpg$/));

function FirstPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/books")
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const filteredNewestBooks = books
    .slice()
    .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
    .slice(0, 5);

  const filteredAZBooks = books
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title))
    .slice(0, 5);

  return (
    <div className="wrapper">
      
      <div className="books-container">
        <div>
          <h2>Newest Books</h2>
          <div className="grid-container">
            {filteredNewestBooks.map(book => (
              <div key={book.id} className="grid-item">
                <img
                  src={images[`./${book.cover_image_url}`]}
                  alt={book.title}
                />
                <h3>{book.title}</h3>
                <p>{book.author}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2>A-Z Books</h2>
          <div className="grid-container">
            {filteredAZBooks.map(book => (
              <div key={book.id} className="grid-item">
                <img
                  src={images[`./${book.cover_image_url}`]}
                  alt={book.title}
                />
                <h3>{book.title}</h3>
                <p>{book.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirstPage;
