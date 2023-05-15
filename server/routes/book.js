const express = require("express");
const db = require("../models");

const router = express.Router();

//get all books
router.get("/", async (req, res) => {
  try {
    const books = await db.Book.findAll();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// get books based on the category
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

//get certain book
router.get("/:id", async (req, res) => {
  try {
    const book = await db.Book.findByPk(req.params.id, {
      include: db.Category, // include the categories associated with the book
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

module.exports = router;


router.delete("/books/:bookId", async (req, res) => {
  const { bookId } = req.params;

  try {
    const book = await Book.findByPk(bookId);
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
});

router.patch("/books/:bookId", async (req, res) => {
  const { bookId } = req.params;

  try {
    const book = await Book.findByPk(bookId);
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
});