const db = require("../models");
const bcrypt = require("bcrypt");
const User = db.User;

const updateUser = async (req, res, next) => {
  const {
    username,
    email,
    phone_number,
    password,
    membership_status,
    account_balance,
    role,
  } = req.body;
  const { id } = req.params;

  try {
    // Find the user to be updated
    const user = await User.findOne({
      where: { user_id: id },
    });

    // Update the user data
    if (user) {
      let hashedPassword = user.password; // use existing password by default
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10); // hash the new password
      }
      await user.update({
        username: username || user.username,
        email: email || user.email,
        phone_number: phone_number || user.phone_number,
        password: hashedPassword,
        membership_status: membership_status || user.membership_status,
        account_balance: account_balance || user.account_balance,
        role: role || user.role,
      });

      // Add the updated user data to the request object
      req.user = user;

      // Call the next middleware function
      next();
    } else {
      // If the user is not found, return a 404 error
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    // Handle any errors
    next(error);
  }
};

module.exports = updateUser;
