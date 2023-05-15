const express = require("express");
const router = express.Router();
const db = require("../models"); // assuming your FAQ model is in a file called models.js

// GET all FAQs
router.get("/", async (req, res) => {
  try {
    const faqs = await db.FAQ.findAll({
      include: [db.User], // eager load associated user data
    });
    res.json(faqs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET a specific FAQ by ID
router.get("/:faq_id", async (req, res) => {
  try {
    const faq = await db.FAQ.findByPk(req.params.faq_id, {
      include: [db.User], // eager load associated user data
    });
    if (faq) {
      res.json(faq);
    } else {
      res.status(404).json({ message: "FAQ not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST a new FAQ
router.post("/", async (req, res) => {
  try {
    const { question, answer, status, user_id } = req.body;
    const faq = await db.FAQ.create({
      question,
      answer,
      status,
      user_id,
    });
    res.status(201).json(faq);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// PUT update an existing FAQ by ID
router.put("/faqs/:faq_id", async (req, res) => {
  try {
    const faq = await db.FAQ.findByPk(req.params.faq_id);
    if (faq) {
      const { question, answer, status } = req.body;
      const updatedFaq = await faq.update({
        question,
        answer,
        status,
      });
      res.json(updatedFaq);
    } else {
      res.status(404).json({ message: "FAQ not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE an existing FAQ by ID
router.delete("/:faq_id", async (req, res) => {
  try {
    const faq = await db.FAQ.findByPk(req.params.faq_id);
    if (faq) {
      await faq.destroy();
      res.json({ message: "FAQ deleted successfully" });
    } else {
      res.status(404).json({ message: "FAQ not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
