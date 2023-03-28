

const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

// Initialize Sequelize with database credentials
const sequelize = new Sequelize('library', 'root', 'tiktak123', {
  host: 'localhost',
  port:3307,
  dialect: 'mysql'
});

// Define the Users table
const User = sequelize.define('user', {
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    phone_number: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    }
  }, { 
    timestamps: false // disable the creation of createdAt and updatedAt fields
  });


// Initialize the app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define a POST endpoint to create a new user
app.post('/signup', async (req, res) => {
  try {
    const { username, password, email, phone_number } = req.body;
    const user = await User.create({ username, password, email, phone_number });
    res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to create user' });
  }
});

// Define a POST endpoint to login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username, password } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to login' });
  }
});

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
