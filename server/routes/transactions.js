const express = require("express");
const router = express.Router();
const db = require("../models");
const {
  authenticateToken,
  checkPermission,
} = require("../middleware/authMiddleware");
const crypto = require("crypto");

// Hashing function using SHA256 algorithm
function hashFunction(data) {
  const hash = crypto.createHash("sha256");
  hash.update(data);
  return hash.digest("hex");
}

// Endpoint 1: Get all transactions for a user
router.get(
  "/:userId/transactions",
  authenticateToken,
  checkPermission("ManageUsers"),
  async (req, res) => {
    try {
      const { userId } = req.params;

      const transactions = await db.Transaction.findAll({
        where: { user_id: userId },
      });

      res.json(transactions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Endpoint 2: Get a specific transaction for a user
router.get(
  "/:transactionId",
  authenticateToken,
  checkPermission("ManageUsers"),
  async (req, res) => {
    try {
      const { transactionId } = req.params;
      const userId = req.user.id;

      const transaction = await db.Transaction.findOne({
        where: { transaction_id: transactionId, user_id: userId },
      });

      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }

      res.json(transaction);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Endpoint 3: Create a new transaction
router.post("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { first_name, last_name, card_type, card_number, ccv, card_date } =
      req.body;

    const hashedCardType = hashFunction(card_type);
    const hashedCardNumber = hashFunction(card_number);
    const hashedCCV = hashFunction(ccv);

    const newTransaction = await db.Transaction.create({
      user_id: userId,
      first_name,
      last_name,
      card_type: hashedCardType,
      card_number: hashedCardNumber,
      ccv: hashedCCV,
      card_date,
    });

    res.status(201).json({ transaction: newTransaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Endpoint 4: Delete a transaction for a user
router.delete(
  "/:transactionId",
  authenticateToken,
  checkPermission("ManageUsers"),
  async (req, res) => {
    try {
      const { transactionId } = req.params;
      const userId = req.user.id;

      const transaction = await db.Transaction.findOne({
        where: { transaction_id: transactionId, user_id: userId },
      });

      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }

      await transaction.destroy();

      res.json({ message: "Transaction deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;
