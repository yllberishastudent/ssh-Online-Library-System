const express = require("express");
const router = express.Router();
const db = require("../models");
const {
  authenticateToken,
  checkPermission,
} = require("../middleware/authMiddleware");

router.get("/", async (req, res) => {
  try {
    const reviews = await db.Review.findAll();
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//{
// "user_id": 3,
// "book_id": 5,
// "review_text": "This is a great book!"
// }

//fix this so it takes from token
router.post(
  "/add",
  authenticateToken,
  checkPermission("LeaveReview"),
  async (req, res) => {
    try {
      const { user_id, book_id, review_text, star } = req.body;

      // Check if the user and book exist
      const userExists = await db.User.findByPk(user_id);
      const bookExists = await db.Book.findByPk(book_id);
      if (!userExists || !bookExists) {
        return res.status(400).json({ message: "User or book does not exist" });
      }
      // Create the review in the database
      const newReview = await db.Review.create({
        user_id,
        book_id,
        review_text,
        star,
        review_date: new Date(),
      });

      // Respond with the new review
      return res.status(201).json({ review: newReview });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.get("/books/:bookId", authenticateToken, async (req, res) => {
  try {
    const { bookId } = req.params;

    // Check if the book exists
    const bookExists = await db.Book.findByPk(bookId);
    if (!bookExists) {
      return res.status(400).json({ message: "Book does not exist" });
    }

    // Get all the reviews for the book
    const reviews = await db.Review.findAll({
      where: {
        book_id: bookId,
      },
      include: [
        {
          model: db.User,
          attributes: ["username"],
        },
      ],
      order: [["review_date", "DESC"]],
    });

    // Respond with the reviews
    return res.status(200).json({ reviews });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
router.delete(
  "/:id",
  authenticateToken,
  checkPermission("ManageReviews"),
  async (req, res) => {
    try {
      const { id } = req.params;

      // Check if the review exists
      const review = await db.Review.findByPk(id);
      if (!review) {
        return res.status(404).json({ error: "Review not found" });
      }

      // Delete the review from the database
      await review.destroy();

      // Respond with a success message
      return res.status(204).json({ message: "Review deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);
module.exports = router;
