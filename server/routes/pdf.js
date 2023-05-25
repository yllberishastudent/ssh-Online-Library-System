const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require("../models");
const {
  authenticateToken,
  checkPermission,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/:id",
  authenticateToken,
  checkPermission("ReadBook"),
  (req, res) => {
    const { id } = req.params;

    db.Book.findOne({
      where: { book_id: id },
      attributes: ["pdf_file_url"],
    })
      .then((book) => {
        if (!book) {
          return res.status(404).send({ error: "Book not found" });
        }

        const filePath = path.join(__dirname, "..", book.pdf_file_url);
        const stat = fs.statSync(filePath);

        res.writeHead(200, {
          "Content-Type": "application/pdf",
          "Content-Length": stat.size,
        });

        const file = fs.createReadStream(filePath);
        file.pipe(res);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send({ error: "Server error" });
      });
  }
);

module.exports = router;
