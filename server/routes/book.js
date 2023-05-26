const express = require("express");
const db = require("../models");
const {
  authenticateToken,
  checkPermission,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Get all books
router.get("/", async (req, res) => {
  try {
    const books = await db.Book.findAll();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// Add book
router.post(
  "/",
  authenticateToken,
  checkPermission("ManageBooks"),
  async (req, res) => {
    const { title, author_id, description, cover_image_url } = req.body;

    try {
      // Find the author by ID
      const author = await db.Author.findByPk(author_id);
      if (!author) {
        return res.status(404).json({ message: "Author not found" });
      }

      // Combine the first_name and last_name of the author, checking for null values
      const authorName = `${author.first_name || ""} ${
        author.last_name || ""
      }`.trim();

      // Create the book with the combined author's name
      const book = await db.Book.create({
        title,
        author_id,
        author: authorName, // Set the author field
        description,
        cover_image_url,
        price: 100,
      });

      res.status(201).json({ message: "Book added successfully", book });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Get books based on the category
router.get("/category/:categoryName", async (req, res) => {
  const { categoryName } = req.params;
  try {
    const category = await db.Category.findOne({
      where: { category_name: categoryName },
    });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    const books = await category.getBooks();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get a certain book
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const book = await db.Book.findByPk(req.params.id, {
      include: db.Category,
    });
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a book
router.delete(
  "/:bookId",
  authenticateToken,
  checkPermission("ManageBooks"),
  async (req, res) => {
    const { bookId } = req.params;

    try {
      const book = await db.Book.findByPk(bookId);
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }

      // Delete the book
      await book.destroy();

      res.status(200).json({ message: "Book removed successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Update a book
router.patch(
  "/:bookId",
  authenticateToken,
  checkPermission("ManageBooks"),
  async (req, res) => {
    const { bookId } = req.params;

    try {
      const book = await db.Book.findByPk(bookId);
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }

      // Update the book fields with the provided values
      Object.assign(book, req.body);

      // Save the updated book
      await book.save();

      res.status(200).json({ message: "Book updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
