const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../models");

const router = express.Router();

router.post("/admin/users", async (req, res) => {
  try {
    const { username, email, phoneNumber, role, password } = req.body;

    const usernameExists = await db.User.findOne({ where: { username } });
    if (usernameExists) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Check if user already exists
    const userExists = await db.User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: "Email has already been used" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const newUser = await db.User.create({
      username,
      email,
      phone_number: phoneNumber,
      role,
      password: hashedPassword, // Save the hashed password in the database
    });

    // Respond with the new user
    return res.status(201).json({ user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;