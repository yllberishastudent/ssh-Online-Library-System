import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Books.css";
import { useParams, navigate, useNavigate } from 'react-router-dom';
import {FaArrowLeft} from "react-icons/fa";

const images = {};

function importAll(r) {
  r.keys().forEach(key => (images[key] = r(key)));
}

importAll(require.context("../..", true, /\.jpg$/));

function Books() {
  const { id } = useParams(); // get the book ID from the URL parameters
  const [book, setBook] = useState(null); // initialize book state
  const history = useNavigate();

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
    <section className="book-details">
        <div className="container">
            <button type="button" className="flex flex-c back-btn"
                onClick={() => history('/user/homepage')}>
                    <FaArrowLeft size={20}/>
                    <span className="fs-18 fw-6">Back</span>
            </button>
            <div className="book-details-content grid">
                <div className="book-details-img">
                <img
                  src={images[`./${book.cover_image_url}`]}
                  alt={book.title}
                />
                </div>
                <div className="book-details-info">
                    <div className="book-details-item title">
                        <span className="fw-6 fs-24">{book.title}</span>
                    </div>
                    <div className="book-details-item author">
                        <span className="fw-6 fs-24">Author: {book.author}</span>
                    </div>
                    <div className="book-details-item description">
                        <span className="fw-6 fs-24">{book.description}</span>
                    </div>
                </div>
                

            </div>
            <button type="button" className="flex flex-c read-btn">
                    <span className="fs-18 fw-6">Read</span>
            </button>
    </div>
    </section>
  );
}

export default Books;
