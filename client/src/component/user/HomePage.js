import React, { useState, useEffect } from "react";
import "./HomePage.css";
import axios from "axios";

const images = {};

function importAll(r) {
  r.keys().forEach(key => (images[key] = r(key)));
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
    const [searchTerm, setSearchTerm] = useState("")

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

    const filteredBooks = books.filter(book => {
        const titleMatch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
        return titleMatch
    });

    const handleStarClick = (bookId, rating) => {
        console.log(`Book ${bookId} rated ${rating} stars`);
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.id === bookId ? { ...book, rating } : book
          )
        );
      };

    return (
        <div className="wrapper">
            <div className="titles">
            <h2>All Books</h2>
            <h2>Popular</h2>
            <h2>Genre</h2>
            </div>
            <div className="filters-homepage">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div className="grid-container-homepage">
                {filteredBooks.map(book => (
                    <div key={book.id} className="grid-item-homepage">
                       <img src={images[`./${book.cover_image_url}`]} alt="Animal Farm" />
                        <h2>{book.title}</h2>
                        <p>{book.author}</p>
                        <div className="rating">
                        {[1, 2, 3, 4, 5].map(star => (
                            <Star key={star} filled={star <= book.rating} onClick={() => handleStarClick(book.id, star)} />
                        ))}
                        </div>
                    </div>
                    
                ))}
                
            </div>
        </div>
    );
}

export default HomePage;
