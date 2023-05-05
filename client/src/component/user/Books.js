import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Books.css";
import jwtDecode from 'jwt-decode';
import Rating from "./Rating";
import { useParams, navigate, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const images = {};
let userName=null;

function importAll(r) {
  r.keys().forEach((key) => (images[key] = r(key)));
}

importAll(require.context("../..", true, /\.jpg$/));

function Books() {
  const { id } = useParams(); // get the book ID from the URL parameters
  const [book, setBook] = useState(null); // initialize book state
  const [reviews, setReviews] = useState([]); // initialize reviews state
  const [newReviewText, setNewReviewText] = useState(""); // initialize new review text state
  const [rating, setRating] = useState(0);
  const history = useNavigate();

  useEffect(() => {
    // retrieve the book information from the database based on the ID
    axios
      .get(`http://localhost:5001/books/${id}`)
      .then((response) => {
        setBook(response.data); // set the book state with the retrieved book data
      })
      .catch((error) => {
        console.log(error);
      });
    // retrieve the reviews for the book from the server
    axios
      .get(`http://localhost:5001/books/${id}/reviews`)
      .then((response) => {
        setReviews(response.data.reviews); // set the reviews state with the retrieved reviews data
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!book) {
    return <div>Loading...</div>; // show a loading message while book information is being retrieved
  }

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleNewReviewChange = (event) => {
    setNewReviewText(event.target.value); // update newReviewText state with the value of the textarea
  };
  
  const handleNewReviewSubmit = () => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    let userId = decodedToken.id;
    userName=decodedToken.username;
    // send the new review to the server
    axios
      .post(`http://localhost:5001/addreview`, {
        user_id: userId, // replace with the actual user ID
        book_id: id,
        review_text: newReviewText,
        star:rating, // replace with the actual rating
      })
      .then((response) => {
        // add the new review to the state
        setReviews([...reviews, response.data.review]);
        // clear the new review text
        setNewReviewText("");
        setRating(0);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // display the retrieved book information
  return (
    <section className="book-details">
      <div className="container">
        <div className="book-details-content grid">
          <div className="book-details-img">
            <img src={images[`./${book.cover_image_url}`]} alt={book.title} />
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
            <button class="button is-primary review-area ">READ</button>
        
          </div>
        </div>
       
      </div>
      <div className="reviews-container">
            <h2 className="reviews">Reviews</h2>
            {reviews.map((review) => (
              <div key={review.review_id} className="review">
                <div class="card">
                  <div class="card-content">
                    <div class="media">
                      <div class="media-content">
                      <p className="is-5 username--name">{userName ? userName : review.User.username}</p>
                      </div>
                    </div>
                    <div class="content--review">
                    {review.review_text}<br></br>
                      <div class="time"><time datetime="2016-1-1">{review.review_date.slice(0, 10)}</time></div>
                    </div>
                   <Rating rating={review.star}/>
                  </div>
                </div>
              </div>
            ))}
              <textarea class="textarea" placeholder="Add review"   value={newReviewText} onChange={handleNewReviewChange}></textarea>
              <Rating rating={rating} onRatingChange={handleRatingChange} />
          <p onClick={handleNewReviewSubmit} class="button is-primary review-area" >Add review</p>
          </div>
        
    </section>
  );
}

export default Books;
