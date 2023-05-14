const express = require("express");
const router = express.Router();
const updateUser = require("../middleware/updateUser");
const db = require("../models");

router.put("/update/:id", updateUser, (req, res) => {
  res.status(200).json({ success: true, data: req.user });
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    // Find the user by ID
    const user = await db.User.findOne({
      where: { user_id: id },
    });

    // If the user is found, return the user data
    if (user) {
      res.status(200).json({ user });
    } else {
      // If the user is not found, return a 404 error
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    // Pass the error to the default error handler
    next(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
