import { useState, useEffect } from "react";
import axios from "axios";
import "./style/Books.css";
import jwtDecode from "jwt-decode";
import Rating from "./Rating";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Viewer, Worker, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import Swal from "sweetalert2";
import {
  Card,
  CardContent,
  Typography,
  TextareaAutosize,
  Button,
} from "@mui/material";
const token = localStorage.getItem("token");

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
  const navigate = useNavigate();
  // const [showPdfViewer, setShowPdfViewer] = useState(false);
  // const [pdfUrl, setPdfUrl] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [viewPdf, setViewPdf] = useState(null);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:5001/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBook(response.data); // set the book state with the retrieved book data
      })
      .catch((error) => {
        console.log(error);
      });
    // retrieve the reviews for the book from the server
    axios
      .get(`http://localhost:5001/reviews/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setReviews(response.data.reviews); // set the reviews state with the retrieved reviews data
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://localhost:5001/favorite/${id}/liked`, {
        headers: {
          Authorization: `Bearer ${token}`,
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
    const userId = decodedToken.id;
    const username = decodedToken.username;
    // send the new review to the server
    axios
      .post(
        `http://localhost:5001/reviews/add`,
        {
          user_id: userId,
          book_id: id,
          review_text: newReviewText,
          star: rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // add the new review to the state
        const newReview = {
          review_id: response.data.review.review_id,
          User: { username: username }, // Add the username to the new review
          review_text: newReviewText,
          star: rating,
          review_date: response.data.review.review_date,
        };
        setReviews([...reviews, newReview]);
        // clear the new review text
        setNewReviewText("");
        setRating(0);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleButtonClick = () => {
    // Check if the user has a membership
    axios
      .get("http://localhost:5001/membership", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.hasMembership) {
          // User has a membership, proceed with fetching the PDF
          fetchPDF()
            .then(() => {
              // PDF fetched successfully, add the book to the user's history
              const historyData = {
                bookId: id,
                activityType: "Read",
              };

              axios
                .post("http://localhost:5001/history/user", historyData, {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                  },
                })
                .then((response) => {
                  console.log("Book added to user's history:", response.data);
                })
                .catch((error) => {
                  // console.error("Error adding book to user's history:", error);
                });
            })
            .catch(() => {
              // PDF fetching failed, show SweetAlert modal
              // Swal.fire({
              //   icon: "error",
              //   title: "Book not available",
              //   text: "This book is currently unavailable.",
              //   showCancelButton: false,
              // });
            });
        } else {
          // User doesn't have a membership, show the Swal modal
          Swal.fire({
            icon: "warning",
            title: "Membership not found!",
            text: "Membership is required to read this book!",
            footer: `<a href="/user/membership/${getUsername()}">Get a membership now?</a>`,
            showCancelButton: false,
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.cancel) {
              redirectToMembershipPage();
            }
          });
        }
      })
      .catch((error) => {
        // console.error("Error checking membership:", error);
      });
  };

  const getUsername = () => {
    // Extract the username from the token stored in localStorage
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    return decodedToken.username;
  };

  const redirectToMembershipPage = () => {
    // Redirect the user to the membership page
    window.location.href = `/user/membership/${getUsername()}`;
  };

  const fetchPDF = () => {
    const bookId = id;
    return axios
      .get(`/read/pdf/${bookId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "Custom-Header": "value",
        },
        responseType: "blob",
      })
      .then((response) => {
        const blob = response.data;
        const pdfUrl = URL.createObjectURL(blob);
        setPdfFile(blob);
        setViewPdf(pdfUrl);
      })
      .catch((error) => {
        console.error("Error fetching PDF:", error);
        Swal.fire({
          icon: "info",
          title: "Book not available",
          text: "This book is currently unavailable.",
          showCancelButton: false,
        });
        // throw error;
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
            <div className="readnauthor">
              <button
                className="button is-primary review-area"
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
            <div className="like-button">
              <span className="like-text">Add to Favorites </span>
              <span
                className={`like-icon ${isLiked ? "liked" : ""}`}
                onClick={toggleLike}
              >
                {" "}
                {isLiked ? <FaHeart size={30} /> : <FaRegHeart size={30} />}
              </span>
            </div>
          </div>
        </div>
      </div>

      {viewPdf && (
        <div className="pdf-viewer">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer
              fileUrl={viewPdf}
              plugins={[defaultLayoutPluginInstance]} // Add defaultLayoutPluginInstance as a plugin
            />
          </Worker>
        </div>
      )}
      <section className="reviews-container">
        <h2 className="reviews">Reviews</h2>
        <h2 className="reviews__underline"></h2>
        {reviews.map((review) => (
          <Card key={review.review_id} className="review">
            <CardContent>
              <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                {userName ? userName : review.User.username}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {review.review_text}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <time dateTime="2016-01-01">
                  {review.review_date.slice(0, 10)}
                </time>
              </Typography>
              <Rating rating={review.star} />
            </CardContent>
          </Card>
        ))}
        <TextareaAutosize
          className="textarea"
          placeholder="Add review"
          value={newReviewText}
          onChange={handleNewReviewChange}
          style={{ flex: "1", resize: "none" }}
        />
        <Rating rating={rating} onRatingChange={handleRatingChange} />
        <br></br>
        <Button
          onClick={handleNewReviewSubmit}
          variant="contained"
          color="primary"
        >
          Add review
        </Button>
      </section>
    </section>
  );
}

export default Books;
