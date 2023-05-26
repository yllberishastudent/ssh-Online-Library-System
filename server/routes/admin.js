const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../models");
const router = express.Router();

const {
  authenticateToken,
  checkPermission,
} = require("../middleware/authMiddleware");

// POST /users
// dergohet VVVVVVV
// {
//   "username": "john.doe",
//   "email": "john.doe@example.com",
//   "phoneNumber": "1234567890",
//   "role": "admin",
//   "password": "mypassword"
// }

// Example Response (Status: 201 Created):
/// serveri kthen -----VVVVV
// perl
// Copy code
// {
//   "user": {
//     "user_id": 1,
//     "username": "john.doe",
//     "email": "john.doe@example.com",
//     "phone_number": "1234567890",
//     "role": "admin",
//     "roleId": 1
//   }
// }
//add user
router.post(
  "/users",
  authenticateToken,
  checkPermission("ManageUsers"),
  async (req, res) => {
    try {
      const { username, email, phoneNumber, role, password } = req.body;

      const usernameExists = await db.User.findOne({ where: { username } });
      if (usernameExists) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const emailExists = await db.User.findOne({ where: { email } });
      if (emailExists) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      let roleId;
      if (role === "admin") {
        roleId = 1;
      } else if (role === "member") {
        roleId = 2;
      } else {
        return res.status(400).json({ message: "Invalid role" });
      }

      const newUser = await db.User.create({
        username,
        email,
        phone_number: phoneNumber,
        role,
        roleId,
        password: hashedPassword,
      });

      return res.status(201).json({ user: newUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

// PUT /users/1

// {
//   "username": "newusername",
//   "email": "newemail@example.com",
//   "phoneNumber": "1234567890",
//   "role": "admin"
// }

// perl
// Copy code
// {
//   "user": {
//     "user_id": 1,
//     "username": "newusername",
//     "email": "newemail@example.com",
//     "phone_number": "1234567890",
//     "role": "admin",
//     "roleId": 1
//   }
// }
// update user
router.put(
  "/users/:userId",
  authenticateToken,
  checkPermission("ManageUsers"),
  async (req, res) => {
    try {
      const { userId } = req.params;
      const { username, email, phoneNumber, role } = req.body;

      // Check if the user exists
      const user = await db.User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Update the user
      user.username = username || user.username;
      user.email = email || user.email;
      user.phone_number = phoneNumber || user.phone_number;
      user.role = role || user.role;

      await user.save();

      return res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.delete(
  "/users/:userId",
  authenticateToken,
  checkPermission("ManageUsers"),
  async (req, res) => {
    try {
      const { userId } = req.params;

      // Check if the user exists
      const user = await db.User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Retrieve associated favorites
      const favorites = await db.Favorite.findAll({
        where: { user_id: userId },
      });

      // Delete each favorite
      await Promise.all(favorites.map((favorite) => favorite.destroy()));

      // Delete the user
      await user.destroy();

      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;
