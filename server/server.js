const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");
const bcrypt = require("bcrypt");
const cors = require("cors");
const authMiddleware = require("./middleware/authMiddleware");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Initialize the app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const authorRoutes = require("./routes/author");
const bookRoutes = require("./routes/book");
const usersRoutes = require("./routes/user");
const reviewsRouter = require("./routes/review");
const membershipRouter = require("./routes/membership");
const categoryRouter = require("./routes/category");
const authRouter = require("./routes/auth");

app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);
app.use("/users", usersRoutes);
app.use("/reviews", reviewsRouter);
app.use("/memberships", membershipRouter);
app.use("/categories", categoryRouter);
app.use("/auth", authRouter);

let oottpp = null;
app.post("/password-recovery", async (req, res) => {
  try {
    const { email } = req.body;

    const OTP = generateOTP();
    oottpp = OTP; //per verifikim
    console.log("Sending email to:", email);

    await sendEmail({ email, OTP });

    res.status(200).json({ message: "Password recovery email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send password recovery email" });
  }
});

function sendEmail({ email, OTP }) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "??????",
        pass: "??????",
      },
    });

    const mailConfig = {
      from: "?????",
      to: email,
      subject: "KODING 101 PASSWORD RECOVERY",
      text: `Your one-time password (OTP) for password recovery is: ${OTP}`,
    };

    transporter.sendMail(mailConfig, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        reject(error);
      } else {
        console.log("Email sent:", info.response);
        resolve();
      }
    });
  });
}

function generateOTP() {
  //random 6dig num
  const OTP = Math.floor(100000 + Math.random() * 900000);
  return OTP.toString();
}

app.post("/otp-verification", async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Verify the OTP
    if (verifyOTP({ email, otp })) {
      res.status(200).json({ message: "OTP verification successful" });
    } else {
      res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to verify OTP" });
  }
});

function verifyOTP({ email, otp }) {
  return otp == oottpp;
}
app.post("/change-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    const [affectedRows] = await db.User.update(
      { password: hashedPassword },
      { where: { email } }
    );

    if (affectedRows === 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "Password changed successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to change password" });
  }
});

app.get(
  "/readd/:id/pdf",
  authMiddleware.authenticateToken,
  async (req, res) => {
    try {
      const book = await db.Book.findOne({
        where: { book_id: req.params.id },
        attributes: ["pdf_file_url"],
      });
      if (!book) {
        return res.status(404).send({ error: "Book not found" });
      }
      const filePath = path.join(__dirname, book.pdf_file_url);
      const stat = fs.statSync(filePath);
      const fileSize = stat.size;
      const range = req.headers.range;

      const user = await db.User.findByPk(req.user.id);
      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }

      let end;
      if (user.membership_status === "active") {
        end = fileSize;
      } else {
        end = 5 * 1024 * 1024; // 5 MB limit
      }
      const start = 0;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(filePath, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "application/pdf",
      };
      res.writeHead(206, head);
      file.pipe(res);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Server error" });
    }
  }
);

const { PDFDocument } = require("pdf-lib");
//test without authentification
app.get("/readtest/:user_id/:book_id", async (req, res) => {
  try {
    const book = await db.Book.findOne({
      where: { book_id: req.params.book_id },
      attributes: ["pdf_file_url"],
    });
    if (!book) {
      return res.status(404).send({ error: "Book not found" });
    }
    const filePath = path.join(__dirname, "..", book.pdf_file_url);
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    const user = await db.User.findByPk(req.params.user_id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    if (user.membership_status === "active") {
      // User has an active membership, send entire PDF
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "application/pdf",
      };
      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res);
    } else {
      // User has an inactive membership, send only the first 10 pages of the PDF
      const PDFdoc = await PDFDocument.load(fs.readFileSync(filePath));
      const firstTenPages = PDFdoc.getPages().slice(0, 10);
      const newPDF = await PDFDocument.create();
      await newPDF.addPagesOf(firstTenPages);
      const pdfBytes = await newPDF.save();
      const head = {
        "Content-Length": pdfBytes.byteLength,
        "Content-Type": "application/pdf",
      };
      res.writeHead(200, head);
      res.end(pdfBytes);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
});

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
