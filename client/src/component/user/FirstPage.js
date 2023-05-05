import React, { useState, useEffect } from "react";
import "./FirstPage.css";
import axios from "axios";

const images = {};

function importAll(r) {
  r.keys().forEach(key => (images[key] = r(key)));
}

importAll(require.context("../..", true, /\.jpg$/));

function FirstPage() {
  const [books, setBooks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [popular, setPopular] = useState(false);
  useEffect(() => {
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
    : books;

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
    : books.slice(0, 3);;
    
  return (

    <div className="container">

      <div class="content">
      <div>
          <h2 class="content__title">BOOKS OF THE WEEK</h2>
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
          <h2 id="popular" class="books-categories__titles">POPULAR BOOKS</h2>
          <div className="grid-container">
            {filteredPopularBooks.map(book => (
              <div key={book.id} className="grid-item">
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

        <div>
          <h2 class="books-categories__titles" id="newest">Newest Books</h2>
          <div className="grid-container">
            {filteredNewestBooks.map(book => (
              <div key={book.id} className="grid-item">
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
        <div>
          <h2 id="a-z" class="books-categories__titles">A-Z Books</h2>
          <div className="grid-container">
            {filteredAZBooks.map(book => (
              <div key={book.id} className="grid-item">
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
    </div>
    </div>
  );
}

export default FirstPage;
