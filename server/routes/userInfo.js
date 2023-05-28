const express = require("express");
const { UserInfo, User } = require("../models"); // Adjust the file paths for the models
const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Get user details by user ID
router.get("/", authenticateToken, async (req, res) => {
  try {
    const { id: userId } = req.user; // Retrieve user ID from the authenticated user
    const UserInfo = await UserInfo.findOne({
      where: { userId },
      include: User,
    });

    if (!UserInfo) {
      return res.status(404).json({ error: "User details not found" });
    }

    res.json(UserInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
// Get user details by user ID
router.get("/", authenticateToken, async (req, res) => {
  try {
    const { id: userId } = req.user; // Retrieve user ID from the authenticated user
    const userInfo = await UserInfo.findOne({
      where: { userId },
      include: User,
    });

    if (!userInfo) {
      return res.status(404).json({ error: "User details not found" });
    }

    res.json(userInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Create or update user details
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { id: userId } = req.user; // Retrieve user ID from the authenticated user
    const { firstName, lastName, gender, age, ethnicity, address } = req.body;

    let userInfo = await UserInfo.findOne({ where: { userId } });

    if (userInfo) {
      // User details already exist, update the existing record
      userInfo = await userInfo.update(
        {
          firstName,
          lastName,
          gender,
          age,
          ethnicity,
          address,
        },
        { where: { userId } }
      );
    } else {
      // User details do not exist, create a new record
      userInfo = await UserInfo.create({
        userId,
        firstName,
        lastName,
        gender,
        age,
        ethnicity,
        address,
      });
    }

    // Fetch the updated or created user details
    userInfo = await UserInfo.findOne({ where: { userId } });

    res.json(userInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete user details
router.delete("/", authenticateToken, async (req, res) => {
  try {
    const { id: userId } = req.user; // Retrieve user ID from the authenticated user

    const UserInfo = await UserInfo.findOne({ where: { userId } });

    if (!UserInfo) {
      return res.status(404).json({ error: "User details not found" });
    }

    await UserInfo.destroy();

    res.json({ message: "User details deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
