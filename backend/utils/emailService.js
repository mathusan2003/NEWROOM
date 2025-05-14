const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (email, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      html,
    });

    console.log("Email sent successfully to", email);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;