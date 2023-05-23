const express = require("express");
const router = express.Router();
const { User_History, Book, User } = require("../models");
const { authenticateToken } = require("../middleware/authMiddleware");

router.post("/user", authenticateToken, async (req, res) => {
  const { user } = req; // Access the user object from req

  const { bookId, activityType } = req.body;
  const activityDate = new Date(); // Get the current date

  try {
    const book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    const existingHistory = await User_History.findOne({
      where: {
        user_id: user.id, // Find history for the current user
        book_id: bookId,
      },
    });

    if (existingHistory) {
      return res.status(200).json({ message: "History already exists" });
    }

    const history = await User_History.create({
      user_id: user.id,
      book_id: bookId,
      activity_type: activityType,
      activity_date: activityDate,
    });

    res
      .status(201)
      .json({ message: "Book added to history successfully", history });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//get users history
router.get("/user", authenticateToken, async (req, res) => {
  const { id } = req.user; // Access the user ID from req.user

  try {
    const history = await User_History.findAll({
      where: { user_id: id }, // Use the user ID from the token
      include: [{ model: Book }],
    });

    res.status(200).json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete one book from history
router.delete("/user/:bookId", authenticateToken, async (req, res) => {
  const { id } = req.user; // Make sure req.user has the correct structure and contains the user_id property

  const { bookId } = req.params;

  try {
    const history = await User_History.findOne({
      where: { book_id: bookId, user_id: id },
    });

    if (!history) {
      return res.status(404).json({ error: "History entry not found" });
    }

    await history.destroy();

    res.status(200).json({ message: "History entry deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/all/user", authenticateToken, async (req, res) => {
  const { id } = req.user;

  try {
    // Delete all user history entries
    const deletedRows = await User_History.destroy({ where: { user_id: id } });

    if (deletedRows > 0) {
      res.status(200).json({ message: "History cleared successfully" });
    } else {
      res.status(404).json({ error: "No history entries found for the user" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
