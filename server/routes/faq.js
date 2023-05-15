const express = require("express");
const db = require("../models");

const router = express.Router();

// GET all FAQs
router.get("/", async (req, res) => {
  try {
    const faqs = await db.FAQ.findAll({
      include: [db.User], // eager load associated user data
    });
    res.json(faqs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET FAQs based on the status
router.get("/status/:status", async (req, res) => {
  const { status } = req.params;
  try {
    const faqs = await db.FAQ.findAll({
      where: { status },
      include: [db.User], // eager load associated user data
    });
    res.json(faqs);
  } catch (error) {
    console.error(error);
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// PUT update an existing FAQ by ID
router.put("/:faq_id", async (req, res) => {
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
  } catch (error) {
    console.error(error);
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
