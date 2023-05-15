import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await fetch(`/authors/${id}/books`);
        console.log(id);
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setAuthor(data);
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!author) {
    return <div>Author not found.</div>;
  }

  return (
    <div>
      <h1>{author.first_name} {author.last_name}</h1>
      <h2>Books:</h2>
      <ul>
        {author.books.map((book) => (
          <li key={book.book_id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Author;
