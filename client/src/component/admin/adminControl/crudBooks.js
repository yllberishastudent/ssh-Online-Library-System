import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Books({ books, fetchBooks }) {
  const [editingBook, setEditingBook] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    description: "",
    cover_image_url: "",
    pdf_file_url: "",
  });

  const handleEditClick = (book) => {
    setEditingBook({ ...book });
  };

  const handleCancelEdit = () => {
    setEditingBook(null);
  };

  const handleSaveBook = async (editedBook) => {
    try {
      await axios.patch(`/books/${editedBook.book_id}`, editedBook, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setEditingBook(null);
      fetchBooks();
      Swal.fire({
        icon: "success",
        title: "Edit Successful!",
        text: "The book has been edited successfully.",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Edit Failure!",
        text: "There has been an error.",
      });
    }
  };

  const handleDeleteBook = async (book_id) => {
    try {
      await axios.delete(`/books/${book_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchBooks();
      Swal.fire({
        icon: "success",
        title: "Delete Successful!",
        text: "The book has been deleted successfully.",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Delete Failure!",
        text: "There has been an error.",
      });
    }
  };

  const handleCreateBook = async () => {
    const { author, title, description, cover_image_url, pdf_file_url } = newBook;
  
    if (!author || !title || !description || !cover_image_url || !pdf_file_url) {
      Swal.fire({
        icon: "error",
        title: "Validation Error!",
        text: "All fields are required.",
      });
      return;
    }
  
    try {
      const existingAuthorResponse = await axios.get(
        `/books?author=${author}`
      );
  
      if (existingAuthorResponse.data.length > 0) {
        // Author already exists in the books table
        const author_id = existingAuthorResponse.data[0].author_id;
        await axios.post(
          "/books",
          { ...newBook, author_id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        // Author does not exist in the books table, create a new one
        const newAuthorResponse = await axios.post("/books", {
          author,
        });
        const author_id = newAuthorResponse.data.author_id;
        await axios.post(
          "/books",
          { ...newBook, author_id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }
  
      setShowCreateForm(false);
      fetchBooks();
      setNewBook({
        title: "",
        author: "",
        description: "",
        cover_image_url: "",
        pdf_file_url: "",
      });
  
      Swal.fire({
        icon: "success",
        title: "Create Successful!",
        text: "The book has been created successfully.",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Create Failure!",
        text: "There has been an error.",
      });
    }
  };  

  const handleCancelCreate = () => {
    setShowCreateForm(false);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    const existingAuthor = books.find((book) => book.author === value);

    if (showCreateForm) {
      setNewBook((prevBook) => ({
        ...prevBook,
        [name]: value,
      }));
    } else if (editingBook) {
      setEditingBook((prevBook) => ({
        ...prevBook,
        [name]: value,
        author_id: existingAuthor ? existingAuthor.author_id : prevBook.author_id,
      }));
    }
  };

  return (
    <div className="books-container">
      <div className="books-container__section">
        <h1 className="admin-content__title">Books</h1>
        {!showCreateForm && (
          <div
            className="action-button action-button__text"
            onClick={() => setShowCreateForm(true)}
          >
            Create Book
          </div>
        )}
      </div>
      <div className="forms-container">
        {showCreateForm ? (
          // Create book form
          <div className="create-book-form">
            {/* Form fields */}
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={newBook.title}
                onChange={handleChangeInput}
              />
            </div>
            <div className="form-group">
              <label>Author:</label>
              <input
                type="text"
                name="author"
                value={newBook.author}
                onChange={handleChangeInput}
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <input
                type="text"
                name="description"
                value={newBook.description}
                onChange={handleChangeInput}
              />
            </div>
            <div className="form-group">
              <label>Cover Image URL:</label>
              <input
                type="text"
                name="cover_image_url"
                value={newBook.cover_image_url}
                onChange={handleChangeInput}
              />
            </div>
            <div className="form-group">
              <label>PDF File URL:</label>
              <input
                type="text"
                name="pdf_file_url"
                value={newBook.pdf_file_url}
                onChange={handleChangeInput}
              />
            </div>
            {/* Action buttons */}
            <div className="action-button__section">
              <button className="action-button" onClick={handleCreateBook}>
                Create
              </button>
              <button className="action-button" onClick={handleCancelCreate}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          // Book list
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.book_id}>
                  <td>
                    {editingBook && editingBook.book_id === book.book_id ? (
                      <div>{editingBook.book_id}</div>
                    ) : (
                      book.book_id
                    )}
                  </td>
                  <td>
                    {editingBook && editingBook.book_id === book.book_id ? (
                      <input
                        type="text"
                        name="title"
                        value={editingBook.title}
                        onChange={handleChangeInput}
                      />
                    ) : (
                      book.title
                    )}
                  </td>
                  <td>
                    {editingBook && editingBook.book_id === book.book_id ? (
                      <div>{editingBook.author}</div>
                    ) : (
                      book.author
                    )}
                  </td>
                  <td>
                    {editingBook && editingBook.book_id === book.book_id ? (
                      <input
                        type="text"
                        name="description"
                        value={editingBook.description}
                        onChange={handleChangeInput}
                      />
                    ) : (
                      book.description
                    )}
                  </td>
                  <td>
                    {editingBook && editingBook.book_id === book.book_id ? (
                      <>
                        <button
                          className="action-button"
                          onClick={() => handleSaveBook(editingBook)}
                        >
                          Save
                        </button>
                        <button
                          className="action-button"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="action-button"
                          onClick={() => handleEditClick(book)}
                        >
                          Edit
                        </button>
                        <button
                          className="action-button"
                          onClick={() => handleDeleteBook(book.book_id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Books;
