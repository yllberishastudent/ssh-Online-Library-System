const db = require("../models");

const updateMembershipStatus = async (req, res, next) => {
  const { membership_status } = req.body;
  const { id } = req.user; // assuming the user ID is stored in the token

  try {
    // Find the user to be updated
    const user = await db.User.findOne({
      where: { user_id: id },
    });

    // Update the membership status
    if (user) {
      if (membership_status !== "active" && membership_status !== "inactive") {
        const error = new Error("Invalid membership status");
        error.statusCode = 400;
        throw error;
      }

      await user.update({
        membership_status: membership_status || user.membership_status,
      });

      // Add the updated user data to the request object
      req.user = user;

      // Send a success response
      res.status(200).json({
        message: "Membership status updated successfully",
        user,
      });
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

module.exports = updateMembershipStatus;
