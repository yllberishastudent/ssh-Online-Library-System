
const nodemailer = require("nodemailer");

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

function verifyOTP({ email, otp }) {
  return otp == oottpp;
}

module.exports = {
  sendEmail,
  generateOTP,
  verifyOTP,
};
