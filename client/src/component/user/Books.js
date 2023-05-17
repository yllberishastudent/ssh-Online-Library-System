import { useState, useEffect } from "react";
import axios from "axios";
import "./style/Books.css";
import jwtDecode from "jwt-decode";
import Rating from "./Rating";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaArrowLeft, FaHeart, FaRegHeart } from "react-icons/fa";
import { Document, Page } from "react-pdf";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// Rest of your code...
const images = {};
let userName = null;

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
  const [isLiked, setIsLiked] = useState(false);
  const history = useNavigate();
  // const [showPdfViewer, setShowPdfViewer] = useState(false);
  // const [pdfUrl, setPdfUrl] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [viewPdf, setViewPdf] = useState(null);
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
      .get(`http://localhost:5001/reviews/books/${id}`)
      .then((response) => {
        setReviews(response.data.reviews); // set the reviews state with the retrieved reviews data
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://localhost:5001/favorite/${id}/liked`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "Custom-Header": "value",
        },
      })
      .then((response) => {
        setIsLiked(response.data.liked);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!book) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <div className="loader-text">Loading...</div>
      </div>
    );
  }

  const toggleLike = () => {
    setIsLiked(!isLiked);
    handleFavoriteClick(id, isLiked);
  };

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
    userName = decodedToken.username;
    // send the new review to the server
    axios
      .post(`http://localhost:5001/reviews/add`, {
        user_id: userId, // replace with the actual user ID
        book_id: id,
        review_text: newReviewText,
        star: rating, // replace with the actual rating
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
  const handleButtonClick = () => {
    const bookId = id;
    fetch(`/readd/${bookId}/pdf`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "Custom-Header": "value",
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const pdfUrl = URL.createObjectURL(blob);
        setPdfFile(blob);
        setViewPdf(pdfUrl);
      })
      .catch((error) => {
        console.error("Error fetching PDF:", error);
      });
  };

  // Function to handle adding or removing a favorite book
  async function handleFavoriteClick(bookId, isLiked) {
    try {
      if (isLiked) {
        // If book is already liked, remove it from favorites
        await removeFavorite(bookId);
        console.log("Book removed from favorites");
      } else {
        // If book is not liked, add it to favorites
        await addFavorite(bookId);
        console.log("Book added to favorites");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function addFavorite(bookId) {
    try {
      const response = await axios.post(
        "http://localhost:5001/favorite",
        { bookId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "Custom-Header": "value",
          },
        }
      );

      if (response.status === 200) {
        console.log("Book added to favorites successfully");
      } else {
        console.log("Failed to add book to favorites");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function removeFavorite(bookId) {
    try {
      const response = await axios.delete(
        `http://localhost:5001/favorite/${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "Custom-Header": "value",
          },
        }
      );
      if (response.status === 200) {
        console.log("Favorite removed successfully");
      } else {
        console.log("Failed to remove favorite");
      }
    } catch (error) {
      console.error(error);
    }
  }

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
            <div className="book-details-item description">
              <span className="fw-6 fs-24">{book.description}</span>
            </div>
            <div class="readnauthor">
              <button
                class="button is-primary review-area"
                onClick={handleButtonClick}
              >
                READ
              </button>
              <span className="fw-6 fs-24 author__f">
                Author:{" "}
                <Link to={`/user/${book.author_id}/info`}>
                  Click here to read more
                </Link>
              </span>
            </div>
            <div className="like-button" style={{ marginTop: "10px" }}>
              <span
                className={`like-icon ${isLiked ? "liked" : ""}`}
                onClick={toggleLike}
              >
                <span>Add to favorites:</span>
                {isLiked ? <FaHeart /> : <FaRegHeart />}
              </span>
            </div>
          </div>
        </div>
      </div>
      {viewPdf && (
        <div className="pdf-viewer">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer fileUrl={viewPdf} />
          </Worker>
        </div>
      )}

      <div className="reviews-container">
        <h2 className="reviews">Reviews</h2>
        {reviews.map((review) => (
          <div key={review.review_id} className="review">
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p className="is-5 username--name">
                      {userName ? userName : review.User.username}
                    </p>
                  </div>
                </div>
                <div class="content--review">
                  {review.review_text}
                  <br></br>
                  <div class="time">
                    <time datetime="2016-1-1">
                      {review.review_date.slice(0, 10)}
                    </time>
                  </div>
                </div>
                <Rating rating={review.star} />
              </div>
            </div>
          </div>
        ))}
        <textarea
          class="textarea"
          placeholder="Add review"
          value={newReviewText}
          onChange={handleNewReviewChange}
        ></textarea>
        <Rating rating={rating} onRatingChange={handleRatingChange} />
        <p
          onClick={handleNewReviewSubmit}
          class="button is-primary review-area"
        >
          Add review
        </p>
      </div>
    </section>
  );
}

export default Books;
