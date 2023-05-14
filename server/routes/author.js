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

module.exports = router;