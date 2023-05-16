import React from "react";

function Books({ books }) {
  return (
    <>
      <h2 className="admin-content__title">Books</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.book_id}>
              <td>{book.book_id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.description}</td>
              <td>{book.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Books;
