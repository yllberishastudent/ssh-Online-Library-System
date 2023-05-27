import React, { useEffect, useState } from "react";
import axios from "axios";

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newAuthor, setNewAuthor] = useState({
    first_name: "",
    last_name: "",
    pen_name: "",
    gender: "",
    country: "",
  });
  const [showAuthorTable, setShowAuthorTable] = useState(true); // New state variable
  useEffect(() => {
    fetchAuthors();
  }, []);

  const handleEditClick = (author) => {
    setEditingAuthor({ ...author });
    setShowAuthorTable(false); 
  };

  const handleCancelEdit = () => {
    setEditingAuthor(null);
    setShowAuthorTable(true); 
  };

  const fetchAuthors = async () => {
    try {
      const response = await axios.get("http://localhost:5001/authors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAuthors(response.data.authors);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveAuthor = async (editedAuthor) => {
    try {
      await axios.patch(`/authors/${editedAuthor.author_id}`, editedAuthor, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setEditingAuthor(null);
      fetchAuthors();
      setShowAuthorTable(true); 
    } catch (error) {
      console.error("Error updating author:", error);
    }
  };

  const handleDeleteAuthor = async (author_id) => {
    try {
      await axios.delete(`http://localhost:5001/authors/${author_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setAuthors((prevAuthors) =>
        prevAuthors.filter((author) => author.author_id !== author_id)
      );
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  };

  const handleCreateAuthor = async () => {
    try {
      await axios.post("http://localhost:5001/authors", newAuthor, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {
      console.error("Error creating author:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAuthor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCancelCreate = () => {
    setShowCreateForm(false);
    setNewAuthor({
      first_name: "",
      last_name: "",
      pen_name: "",
      gender: "",
      country: "",
    });
  };

  return (
    <div className="authors-container">
      {showAuthorTable && ( // Only render the author table if showAuthorTable is true
        <>
          <h2 className="admin-content__title">Authors</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Pen Name</th>
                <th>Gender</th>
                <th>Country</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {authors.map((author) => (
                <tr key={author.author_id}>
                  <td>{author.author_id}</td>
                  <td>{author.first_name}</td>
                  <td>{author.last_name}</td>
                  <td>{author.pen_name}</td>
                  <td>{author.gender}</td>
                  <td>{author.country}</td>
                  <td>
                    <button
                      className="action-button"
                      onClick={() => handleEditClick(author)}
                    >
                      Edit
                    </button>
                    <button
                      className="action-button"
                      onClick={() => handleDeleteAuthor(author.author_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="create-author-button-container">
            <button
              className="create-author-button"
              onClick={() => setShowCreateForm(true)}
            >
              Create New Author
            </button>
          </div>
        </>
      )}
      {editingAuthor && (
        <div className="edit-author-form">
          <h3>Edit Author</h3>
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={editingAuthor.first_name}
            onChange={(e) =>
              setEditingAuthor((prevState) => ({
                ...prevState,
                first_name: e.target.value,
              }))
            }
          />
          <label>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={editingAuthor.last_name}
            onChange={(e) =>
              setEditingAuthor((prevState) => ({
                ...prevState,
                last_name: e.target.value,
              }))
            }
          />
          <label>Pen Name:</label>
          <input
            type="text"
            name="pen_name"
            value={editingAuthor.pen_name}
            onChange={(e) =>
              setEditingAuthor((prevState) => ({
                ...prevState,
                pen_name: e.target.value,
              }))
            }
          />
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={editingAuthor.country}
            onChange={(e) =>
              setEditingAuthor((prevState) => ({
                ...prevState,
                country: e.target.value,
              }))
            }
          />
          <div className="edit-author-buttons">
            <button
              className="action-button"
              onClick={() => handleSaveAuthor(editingAuthor)}
            >
              Save
            </button>
            <button className="action-button" onClick={handleCancelEdit}>
              Cancel
            </button>
          </div>
        </div>
      )}
      {showCreateForm && ( // Only render the create author form if showCreateForm is true
        <div className="create-author-form">
          <h3>Create Author</h3>
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={newAuthor.first_name || ""}
            onChange={handleChange}
          />
          <label>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={newAuthor.last_name || ""}
            onChange={handleChange}
          />
          <label>Pen Name:</label>
          <input
            type="text"
            name="pen_name"
            value={newAuthor.pen_name || ""}
            onChange={handleChange}
          />
          <label>Gender:</label>
          <input
            type="text"
            name="gender"
            value={newAuthor.gender || ""}
            onChange={handleChange}
          />
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={newAuthor.country || ""}
            onChange={handleChange}
          />
          <div className="create-author-buttons">
            <button className="action-button" onClick={handleCreateAuthor}>
              Create
            </button>
            <button className="action-button" onClick={handleCancelCreate}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Authors;
