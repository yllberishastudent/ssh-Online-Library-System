import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Books.css";
import { useParams } from 'react-router-dom';

function Books() {
  const { id } = useParams(); // get the book ID from the URL parameters
  const [book, setBook] = useState(null); // initialize book state

  useEffect(() => {
    // retrieve the book information from the database based on the ID
    axios.get(`http://localhost:5001/books/${id}`)
      .then((response) => {
        setBook(response.data); // set the book state with the retrieved book data
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!book) {
    return <div>Loading...</div>; // show a loading message while book information is being retrieved
  }

  // display the retrieved book information
  return (
    <div>
      <h2>{book.title}</h2>
      <img src={book.image} alt={book.title} />
      <p>{book.description}</p>
      <p>Author: {book.author}</p>
     <p>Price: {book.price}</p>
    </div>
  );
}

export default Books;
