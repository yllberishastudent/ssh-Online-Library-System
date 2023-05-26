import React, { useState, useEffect } from "react";
import "./style/FirstPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const images = {};

function importAll(r) {
  r.keys().forEach(key => (images[key] = r(key)));
}

importAll(require.context("../..", true, /\.jpg$/));

function FirstPage() {
  const [books, setBooks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [popular, setPopular] = useState(false);
  const history = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      history("/user/homepage"); // Redirect to the homepage if token doesn't exist
      return;
    }
    axios
      .get("http://localhost:5001/books")
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.log(error);
      });
      axios
      .get("http://localhost:5001/reviews")
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const filteredNewestBooks = books
    .slice()
    .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
    .slice(0, 10);

  const filteredAZBooks = books
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title))
    .slice(0, 10);

    const filteredPopularBooks = popular
    ? books.filter(book => {
        const bookReviews = reviews.filter(
          review => review.book_id === book.id
        );
        const averageRating =
          bookReviews.reduce((sum, review) => sum + review.rating, 0) /
          bookReviews.length;
        return averageRating >= 4.5;
      })
    : books.slice(3, 20);

    const top3 = popular
    ? books.filter(book => {
        const bookReviews = reviews.filter(
          review => review.book_id === book.id
        );
        const averageRating =
          bookReviews.reduce((sum, review) => sum + review.rating, 0) /
          bookReviews.length;
        return averageRating >= 4.5;
      })
    : books.slice(0, 3);
    
  return (

    <div className="container">
         <div className="wrap">
      <ul className="titles">
      <li>
                  <a href="#popular">POPULAR</a>
                </li>
                <li>
                  <a href="#newest">NEWEST</a>
                </li>
                <li>
                  <a href="#a-z">A-Z</a>
                </li>
      </ul>
      </div>

      <div className="content">
      <div>
          <h3 className="content__tittle">BOOKS OF THE WEEK</h3>
          <div className="grid-container-top" >
            {top3.map(book => (
              <div key={book.id} className="grid-item-top">
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



      <div className="wrapper">
      <div className="books-container">
      <div>
          <h3 id="popular" className="books-categories__titles">POPULAR BOOKS</h3>
          <div className="grid-container">
            {filteredPopularBooks.map(book => (
              <div key={book.id} className="grid-item">
                  <Link to="/user/login" className="grid-item">
                <img
                  src={images[`./${book.cover_image_url}`]}
                  alt={book.title}
                />
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="books-categories__titles" id="newest">Newest Books</h3>
          <div className="grid-container">
            {filteredNewestBooks.map(book => (
              <div key={book.id} className="grid-item">
                 <Link to="/user/login" className="grid-item">
                <img
                  src={images[`./${book.cover_image_url}`]}
                  alt={book.title}
                />
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 id="a-z" className="books-categories__titles">A-Z Books</h3>
          <div className="grid-container">
            {filteredAZBooks.map(book => (
              <div key={book.id} className="grid-item">
                 <Link to="/user/login" className="grid-item">
                <img
                  src={images[`./${book.cover_image_url}`]}
                  alt={book.title}
                />
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
    </div>
  );
}

export default FirstPage;
