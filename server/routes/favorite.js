const express = require("express");
const { Favorite, Book } = require("../models");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Get all favorites for a user
router.get("/", authenticateToken, async (req, res) => {
  const { user } = req;
  const userId = user.id;

  try {
    const favorites = await Favorite.findAll({
      where: { user_id: userId },
      include: [{ model: Book }],
    });

    res.status(200).json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add a book to favorites
router.post("/", authenticateToken, async (req, res) => {
  const { user } = req;
  const userId = user.id;
  const { bookId } = req.body;

  try {
    const book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    const favorite = await Favorite.create({
      user_id: userId,
      book_id: bookId,
    });

    res
      .status(201)
      .json({ message: "Book added to favorites successfully", favorite });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Remove a book from favorites
router.delete("/:bookId", authenticateToken, async (req, res) => {
  const { user } = req;
  const userId = user.id;
  const { bookId } = req.params;

  try {
    const favorite = await Favorite.findOne({
      where: { book_id: bookId, user_id: userId },
    });

    if (!favorite) {
      return res.status(404).json({ error: "Favorite not found" });
    }

    // Delete the favorite
    await favorite.destroy();

    res.status(200).json({ message: "Favorite removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Check if a book is liked
router.get("/:bookId/liked", authenticateToken, async (req, res) => {
  const { user } = req;
  const userId = user.id;
  const { bookId } = req.params;

  try {
    const favorite = await Favorite.findOne({
      where: { book_id: bookId, user_id: userId },
    });

    if (favorite) {
      res.status(200).json({ liked: true });
    } else {
      res.status(200).json({ liked: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
