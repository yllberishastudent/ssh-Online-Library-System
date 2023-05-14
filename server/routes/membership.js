const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const db = require("../models");

const router = express.Router();

// tell to change the link at front from user/membership to /memberships/user
router.get("/user", authMiddleware.authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    // Find the user in the database and include their memberships
    const user = await db.User.findOne({
      where: { user_id: userId },
      include: [{ model: db.Membership }],
    });

    // Check if the user has an active membership
    const hasMembership = user.Memberships.some(
      (membership) => membership.isActive
    );

    // Get the user's active membership details
    const activeMembership = user.Memberships.find(
      (membership) => membership.isActive
    );

    // Format the response with membership details
    const response = {
      hasMembership,
    };

    if (activeMembership) {
      response.membershipType = activeMembership.membershipType;
      response.startDate = activeMembership.startDate;
      response.expiryDate = activeMembership.expiryDate;
    }

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while checking membership status.",
    });
  }
});
// from membership to memberships/add
router.post("/add", authMiddleware.authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const membershipType = "normal";
    const startDate = new Date();
    const expiryDate = new Date(startDate);
    expiryDate.setMonth(expiryDate.getMonth() + 1);

    const user = await db.User.findOne({
      where: { user_id: userId },
      include: [{ model: db.Membership }],
    });

    if (user && user.Memberships.some((membership) => membership.isActive)) {
      return res
        .status(400)
        .json({ error: "User already has an active membership" });
    }

    const membership = await db.Membership.create({
      userId,
      membershipType,
      startDate,
      expiryDate,
    });

    res.json(membership);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating a membership" });
  }
});
//tell to remove from memberships to memberships/remove
router.delete("/remove", authMiddleware.authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await db.User.findOne({
      where: { user_id: userId },
      include: [{ model: db.Membership }],
    });

    if (!user || !user.Memberships.some((membership) => membership.isActive)) {
      return res
        .status(404)
        .json({ error: "User does not have an active membership" });
    }

    const membership = user.Memberships.find(
      (membership) => membership.isActive
    );
    membership.isActive = false;
    await membership.save();

    res.json({ message: "Membership cancelled" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while cancelling the membership" });
  }
});

module.exports = router;
