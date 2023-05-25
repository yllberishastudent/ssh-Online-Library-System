const express = require("express");
const router = express.Router();
const updateUser = require("../middleware/updateUser");
const db = require("../models");
const { authenticateToken, checkPermission } = require("../middleware/authMiddleware");

router.put("/update/:id", updateUser, (req, res) => {
  res.status(200).json({ success: true, data: req.user });
});

router.get("/:id",authenticateToken, async (req, res, next) => {
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

router.get("/", authenticateToken,checkPermission("ManageUsers"),  async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id",authenticateToken,checkPermission("ManageUsers"), async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user by ID
    const user = await db.User.findOne({ where: { user_id: id } });

    // If the user is found, delete the user
    if (user) {
      await user.destroy();
      res
        .status(200)
        .json({ success: true, message: "User deleted successfully" });
    } else {
      // If the user is not found, return a 404 error
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
