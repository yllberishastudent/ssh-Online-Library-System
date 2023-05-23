const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
const db = require("../models");
const otp = require("../middleware/OTP-retrieve");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, email, phone_number, password } = req.body;

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

    // Create the user in the database with roleId defaulting to 2
    const newUser = await db.User.create({
      username,
      email,
      phone_number,
      password: hashedPassword, // Save the hashed password in the database
      roleId: 2, // Set the roleId to 2 as the default value
    });

    // Respond with the new user
    return res.status(201).json({ user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await db.User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const token = jwt.sign(
      { id: user.user_id, username: user.username, role: user.role },
      authMiddleware.secretKey,
      { expiresIn: "10h" }
    );
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to login" });
  }
});


let oottpp = null;
router.post("/password-recovery", async (req, res) => {
  try {
    const { email } = req.body;

    const OTP = otp.generateOTP();
    oottpp = OTP; //per verifikim
    console.log("Sending email to:", email);

    await otp.sendEmail({ email, OTP });

    res.status(200).json({ message: "Password recovery email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send password recovery email" });
  }
});


router.post("/otp-verification", async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Verify the OTP
    if (otp.verifyOTP({ email, otp })) {
      res.status(200).json({ message: "OTP verification successful" });
    } else {
      res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to verify OTP" });
  }
});

module.exports = router;
