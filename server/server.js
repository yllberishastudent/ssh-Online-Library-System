const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");

// Initialize the app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const userExists = await db.User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create the user in the database
    const newUser = await db.User.create({ username, email, password });

    // Respond with the new user
    return res.status(201).json({ user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Define a POST endpoint to login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await db.User.findOne({ where: { username, password } });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to login" });
  }
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

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
