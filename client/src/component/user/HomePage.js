import React, { useState, useEffect } from "react";
import "./HomePage.css";
import axios from "axios";
const token = localStorage.getItem("token");

const images = {};

function importAll(r) {
  r.keys().forEach((key) => (images[key] = r(key)));
}

importAll(require.context("../..", true, /\.jpg$/));
function Star({ filled, onClick }) {
    return (
      <span className={`star ${filled ? 'filled' : ''}`} onClick={onClick}>
        &#9733;
      </span>
    )
  }

function HomePage() {
  const [books, setBooks] = useState([]);
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

    return (
        <div className="wrapper">
            <h1>All Books</h1>
            <div className="filters">
                <input
                    type="text"
                    placeholder="Search by name or author"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div className="grid-container">
                {filteredBooks.map(book => (
                    <div key={book.id} className="grid-item">
                       <img src={images[`./${book.cover_image_url}`]} alt="Animal Farm" />
                        <h2>{book.title}</h2>
                        <p>{book.author}</p>
                    </div>
                    
                ))}
                
            </div>
        </div>
    );
}

export default HomePage;
