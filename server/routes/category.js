const express = require("express");
const {
  authenticateToken,
  checkPermission,
} = require("../middleware/authMiddleware");
const db = require("../models");

const router = express.Router();
///fix these endpoints later

// Get all categories
router.get("/", authenticateToken, async (req, res) => {
  try {
    const categories = await db.Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Create a new category
router.post(
  "/",
  authenticateToken,
  checkPermission("CreateGenre"),
  async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { categoryName } = req.body;
      const category = await db.Category.create({
        category_name: categoryName,
      });

      res.status(201).json(category);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
);

// Update a category
router.put(
  "/:id",
  authenticateToken,
  checkPermission("EditGenre"),
  async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { id } = req.params;
      const { categoryName } = req.body;
      const category = await db.Category.findOne({
        where: { category_id: id },
      });

      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      category.category_name = categoryName;
      await category.save();

      res.status(200).json(category);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
);

// Delete a category
router.delete(
  "/:id",
  authenticateToken,
  checkPermission("DeleteGenre"),
  async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { id } = req.params;
      const category = await db.Category.findOne({
        where: { category_id: id },
      });

      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      await category.destroy();

      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
