const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");
const bcrypt = require("bcrypt");
const cors = require("cors");
const authMiddleware = require("./middleware/authMiddleware");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const updateUser = require("./middleware/updateUser");

// Initialize the app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.put("/users/:id", updateUser, (req, res) => {
  res.status(200).json({ success: true, data: req.user });
});


app.get("/users/:id", async (req, res, next) => {
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
      throw new ErrorHandler(404, "User not found");
    }
  } catch (error) {
    // Handle any errors
    next(error);
  }
});




app.post("/signup", async (req, res) => {
  try {
    const { username, email, phone_number, password } = req.body;

    // Check if user already exists
    const userExists = await db.User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const newUser = await db.User.create({
      username,
      email,
      phone_number,
      password: hashedPassword, // Save the hashed password in the database
    });

    // Respond with the new user
    return res.status(201).json({ user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
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

// Example protected route
app.get("/protected", authMiddleware.authenticateToken, (req, res) => {
  res.send("This is a protected route");
});

app.get("/categories", async (req, res) => {
  try {
    const categories = await db.Category.findAll(); // Retrieve all categories using the ORM
    res.status(200).json(categories); // Send the categories as a JSON response
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error"); // Send an error response if something went wrong
  }
});

app.get("/books", async (req, res) => {
  try {
    const books = await db.Book.findAll();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/books/category/:categoryName", async (req, res) => {
  const { categoryName } = req.params;
  try {
    const category = await db.Category.findOne({
      where: { category_name: categoryName },
    });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    const books = await category.getBooks();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/addreview", async (req, res) => {
  try {
    const { user_id, book_id, review_text } = req.body;

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
      rate,
      review_date: new Date(),
    });

    // Respond with the new review
    return res.status(201).json({ review: newReview });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// GET all reviews
app.get("/reviews", async (req, res) => {
  try {
    const reviews = await db.Review.findAll();
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.get("/books/:bookId/reviews", async (req, res) => {
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

app.get(
  "/readd/:id/pdf",
  authMiddleware.authenticateToken,
  async (req, res) => {
    try {
      const book = await db.Book.findOne({
        where: { book_id: req.params.id },
        attributes: ["pdf_file_url"],
      });
      if (!book) {
        return res.status(404).send({ error: "Book not found" });
      }
      const filePath = path.join(__dirname, "..", book.pdf_file_url);
      const stat = fs.statSync(filePath);
      const fileSize = stat.size;
      const range = req.headers.range;

      const user = await db.User.findByPk(req.user.id);
      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }

      let end;
      if (user.membership_status === "active") {
        end = fileSize;
      } else {
        end = 5 * 1024 * 1024; // 5 MB limit
      }
      const start = 0;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(filePath, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "application/pdf",
      };
      res.writeHead(206, head);
      file.pipe(res);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Server error" });
    }
  }
);
const { PDFDocument } = require("pdf-lib");
//test without authentification
app.get("/readtest/:user_id/:book_id", async (req, res) => {
  try {
    const book = await db.Book.findOne({
      where: { book_id: req.params.book_id },
      attributes: ["pdf_file_url"],
    });
    if (!book) {
      return res.status(404).send({ error: "Book not found" });
    }
    const filePath = path.join(__dirname, "..", book.pdf_file_url);
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    const user = await db.User.findByPk(req.params.user_id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    if (user.membership_status === "active") {
      // User has an active membership, send entire PDF
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "application/pdf",
      };
      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res);
    } else {
      // User has an inactive membership, send only the first 10 pages of the PDF
      const PDFdoc = await PDFDocument.load(fs.readFileSync(filePath));
      const firstTenPages = PDFdoc.getPages().slice(0, 10);
      const newPDF = await PDFDocument.create();
      await newPDF.addPagesOf(firstTenPages);
      const pdfBytes = await newPDF.save();
      const head = {
        "Content-Length": pdfBytes.byteLength,
        "Content-Type": "application/pdf",
      };
      res.writeHead(200, head);
      res.end(pdfBytes);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
});

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
