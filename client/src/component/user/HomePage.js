import React, { useState, useEffect } from "react";
import "./HomePage.css";
import axios from "axios";

const images = {};

function importAll(r) {
  r.keys().forEach(key => (images[key] = r(key)));
}

importAll(require.context("../..", true, /\.jpg$/));

function HomePage() {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchYear, setSearchYear] = useState("");
    const [searchdescription, setSearchdescription] = useState("");

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
        const yearMatch = book.author.toString().includes(searchYear);
        const descriptionMatch = book.description.toLowerCase().includes(searchdescription.toLowerCase());
        return titleMatch && yearMatch && descriptionMatch;
    });

    return (
        <div className="wrapper">
            <h1>All Books</h1>
            <div className="filters">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)} />
                <input
                    type="text"
                    placeholder="Search by year"
                    value={searchYear}
                    onChange={e => setSearchYear(e.target.value)} />
                <input
                    type="text"
                    placeholder="Search by description"
                    value={searchdescription}
                    onChange={e => setSearchdescription(e.target.value)} />
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
