const express = require("express");
const bodyParser = require("body-parser");
// const db = require("./models");
// const bcrypt = require("bcrypt");
const cors = require("cors");
const {
  authenticateToken,
  checkPermission,
} = require("./middleware/authMiddleware");
// const jwt = require("jsonwebtoken");
// const path = require("path");
// const fs = require("fs");
// const nodemailer = require("nodemailer");
require("dotenv").config();

// Initialize the app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
require("./swagger/swagger")(app);

const authorRoutes = require("./routes/author");
const bookRoutes = require("./routes/book");
const usersRoutes = require("./routes/user");
const reviewsRouter = require("./routes/review");
const membershipRouter = require("./routes/membership");
const categoryRouter = require("./routes/category");
const authRouter = require("./routes/auth");
const faqRouter = require("./routes/faq");
const UserHistoryRouter = require("./routes/userHistory");
const favoriteRouter = require("./routes/favorite"); // Update the import statement
const pdfRouter = require("./routes/pdf");
const transactionRouter = require("./routes/transactions");

app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);
app.use("/users", usersRoutes);
app.use("/reviews", reviewsRouter);
app.use("/membership", membershipRouter);
app.use("/categories", categoryRouter);
app.use("/auth", authRouter);
app.use("/faq", faqRouter);
app.use("/history", UserHistoryRouter);
app.use("/favorite", favoriteRouter);
app.use("/read/pdf", pdfRouter);
app.use("/transaction", transactionRouter);

app.get(
  "/protected",
  authenticateToken,
  checkPermission("ReadBook"),
  (req, res) => {
    // This route handler will only be executed if the user has the required permission
    res.json({ message: "Access granted" });
  }
);

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
