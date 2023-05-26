import React, { useState, useEffect } from "react";
import "./style/HomePage.css";
import axios from "axios";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("token");
const images = {};

function importAll(r) {
  r.keys().forEach((key) => (images[key] = r(key)));
}

importAll(require.context("../..", true, /\.jpg$/));

function HomePage() {
  const [books, setBooks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [popular, setPopular] = useState(false);
  const [genreOption, setGenreOption] = useState("");
  const history = useNavigate();

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:5001/books", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      axios.get("http://localhost:5001/reviews", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      axios.get("http://localhost:5001/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ])
      .then((responses) => {
        const [booksRes, reviewsRes, categoriesRes] = responses;
        setBooks(booksRes.data);
        setReviews(reviewsRes.data);
        setCategories(categoriesRes.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5001/books${
            genreOption ? `/category/${genreOption}` : ""
          }`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBooks(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [genreOption]);

  const filteredBooks = books.filter((book) => {
    const titleMatch =
      book.title && book.title.toLowerCase().includes(searchTerm.toLowerCase());
    const authorMatch =
      book.author &&
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    return titleMatch || authorMatch;
  });

  const calculateAverageRating = (bookId) => {
    const reviewsForBook = reviews.filter(
      (review) => review.book_id === bookId
    );
    const numReviews = reviewsForBook.length;
    if (numReviews === 0) {
      return null;
    }
    const totalRating = reviewsForBook.reduce(
      (sum, review) => sum + review.star,
      0
    );
    const averageRating = totalRating / numReviews;
    return averageRating;
  };

  if (!books) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <div className="loader-text">Loading...</div>
      </div>
    );
  }

  const handleClickPopular = () => {
    setGenreOption("");
    setPopular(true);
  };

  const handleClickAllBooks = () => {
    setGenreOption("");
    setPopular(false);
  };

  let sortedBooks = filteredBooks;
  if (popular) {
    sortedBooks = filteredBooks.sort((book1, book2) => {
      const rating1 = calculateAverageRating(book1.book_id);
      const rating2 = calculateAverageRating(book2.book_id);
      if (!rating1) {
        return 1;
      }
      if (!rating2) {
        return -1;
      }
      return rating2 - rating1;
    });
  }

  const handleGenreChange = (event) => {
    setGenreOption(event.target.value);
  };

  return (
    <div className="wrapper__homepage">
      <div className="titles__homepage">
        <h2 onClick={handleClickAllBooks}>ALL BOOKS</h2>
        <h2 onClick={handleClickPopular}>MOST POPULAR</h2>
        <label htmlFor="genre-select">
          <h2>GENRE</h2>
        </label>
        <div>
          <select
            id="genre-select"
            value={genreOption}
            onChange={handleGenreChange}
          >
            <option value="">ALL GENRES</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_name}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          placeholder="SEARCH BY NAME"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid-container-homepage">
        {sortedBooks.map((book) => (
          <Link
            key={book.book_id}
            to={`/user/books/${book.book_id}`}
            className="grid-item-homepage"
          >
            <img
              src={images[`./${book.cover_image_url}`]}
              alt={`${book.title}`}
            />
            <div className="book--info">
              <h2>{book.title}</h2>
              <p>{book.author}</p>
              <Rating rating={calculateAverageRating(book.book_id)} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
