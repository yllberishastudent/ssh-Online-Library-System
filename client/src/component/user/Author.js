import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../user/style/Author.css";

const images = {};

function importAll(r) {
  r.keys().forEach((key) => (images[key] = r(key)));
}

importAll(require.context("../..", true, /\.jpg$/));
const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/user/login"); // Redirect to login page if token is not available
    } else {
      const fetchAuthor = async () => {
        try {
          const booksResponse = await axios.get(`/authors/${id}/books`);
          console.log(booksResponse.data.books);
          const authorResponse = await axios.get(`/authors/${id}`);

          if (authorResponse.status === 200 && booksResponse.status === 200) {
            const authorData = authorResponse.data;
            const booksData = booksResponse.data;
            setAuthor({ ...authorData.author, books: booksData.books });
          } else {
            throw new Error("Failed to fetch author data");
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      fetchAuthor();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <div className="loader-text">Loading...</div>
      </div>
    );
  }

  if (!author) {
    return <div>Author not found.</div>;
  }

  return (
    <div className="author-container">
      <h1 className="author-name">
        {author.first_name} {author.last_name}
      </h1>
      <h2 className="author-details">
        {author.pen_name}, {author.gender}, {author.country}
      </h2>
      <h2 className="books-heading">Books:</h2>
      <ul className="book-list">
        {author.books.map((book) => (
          <li key={book.book_id} className="book-item">
            <Link to={`/user/books/${book.book_id}`} className="book-link">
              <img
                src={images[`./${book.cover_image_url}`]}
                alt={book.title}
                className="book-cover"
              />
              <div className="book-info">
                <h2 className="book-title">{book.title}</h2>
                <p className="book-author">{book.author}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Author;
