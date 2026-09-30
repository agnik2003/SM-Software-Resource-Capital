const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
      from: `"SM Software Website" <${process.env.EMAIL_USER}>`,
      to: process.env.COMPANY_EMAIL, // Sends to info@smsrc.in
      replyTo: email, // If you click "reply" in Gmail, it replies directly to the client
      subject: `New Inquiry: ${subject}`,
      html: `
        <h2>New Transmission from SM Software Website</h2>
        <p><strong>Client Name:</strong> ${name}</p>
        <p><strong>Client Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <h3>Message Payload:</h3>
        <p>${message}</p>
      `,
    };

    transporter.sendMail(mailOptions).catch(err => console.error("Contact Email Error:", err));
    res.status(200).json({ success: true, message: "Transmission sent successfully." });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};