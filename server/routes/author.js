const express = require("express");
const db = require("../models");
const {
  authenticateToken,
  checkPermission,
} = require("../middleware/authMiddleware");
const router = express.Router();

// Get author info
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    // Find the author by ID
    const author = await db.Author.findByPk(id);

    // If the author is found, return the author info
    if (author) {
      res.status(200).json({ author });
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

//get all authors
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
router.patch(
  "/:id",
  authenticateToken,
  checkPermission("ManageBooks"),
  async (req, res) => {
    const { id } = req.params;

    try {
      const author = await db.Author.findByPk(id);

      if (!author) {
        return res.status(404).json({ error: "Author not found" });
      }

      // Update the author's properties
Object.assign(author, req.body);

      await author.save();

      res.status(200).json({ message: "Author updated successfully", author });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Delete an author
router.delete(
  "/:id",
  authenticateToken,
  checkPermission("ManageBooks"),
  async (req, res) => {
    const { id } = req.params;

    try {
      const author = await db.Author.findByPk(id);

      if (!author) {
        return res.status(404).json({ error: "Author not found" });
      }

      await author.destroy();

      res.status(200).json({ message: "Author deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
router.post(
  "/",
  authenticateToken,
  checkPermission("ManageBooks"),
  async (req, res) => {
    try {
      const { first_name, last_name, pen_name, gender, country } = req.body;
      const author = await db.Author.create({
        first_name,
        last_name,
        pen_name,
        gender,
        country,
      });
      res.status(201).json({ author });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create author" });
    }
  }
);
module.exports = router;
