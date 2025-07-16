const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, htmlContent) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,       // Your Gmail
      pass: process.env.EMAIL_PASS   // App Password (not regular password)
    }
  });

  const mailOptions = {
    from: `"Job Portal" <${process.env.EMAIL}>`,
    to,
    subject,
    html: htmlContent
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
