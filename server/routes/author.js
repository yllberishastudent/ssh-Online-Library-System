const express = require("express");
const db = require("../models");
const router = express.Router();

router.get("/:id/books", async (req, res, next) => {
  const { id } = req.params;

  try {
    // Find the author by ID
    const author = await db.Author.findOne({
      where: { author_id: id },
      include: [{ model: db.Book }],
    });

    // If the author is found, return their books
    if (author) {
      const books = author.Books;
      res.status(200).json({ books });
    } else {
      // If the author is not found, return a 404 error
      const error = new Error("Author not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    // Pass the error to the default error handler
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    // Find all authors
    const authors = await db.Author.findAll();

    // Return the authors
    res.status(200).json({ authors });
  } catch (error) {
    // Pass the error to the default error handler
    next(error);
  }
});

// Update an author
router.patch("/authors/:id", async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, pen_name, gender, country, active } = req.body;

  try {
    const author = await Author.findByPk(id);

    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    // Update the author's properties
    author.first_name = first_name;
    author.last_name = last_name;
    author.pen_name = pen_name;
    author.gender = gender;
    author.country = country;
    author.active = active;

    await author.save();

    res.status(200).json({ message: "Author updated successfully", author });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete an author
router.delete("/authors/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const author = await Author.findByPk(id);

    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    await author.destroy();

    res.status(200).json({ message: "Author deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
