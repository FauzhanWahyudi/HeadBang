const nodemailer = require("nodemailer");
const { Model } = require("sequelize");

const transporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    secure: true,
    auth: {
      user: "headbang477@gmail.com",
      pass: "lfhm quea ceay epbc",
    },
  });

  const mailOptions = (userEmail) => {
      return {
        from: "headbang477@gmail.com",
        to: userEmail,
        subject: "Hello from Nodemailer",
        html: `Please press this <a href="http://localhost:3000/verify/${userEmail}">link</a> to verify your email`,
      };
  }

const sendVerification = (option) => {
    transporter.sendMail(option, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });
}

module.exports = {mailOptions, sendVerification}