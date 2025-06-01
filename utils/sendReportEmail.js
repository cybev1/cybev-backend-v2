const nodemailer = require('nodemailer');
const path = require('path');

async function sendReportEmail(pdfPath) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.cybev.io', // Replace with actual SMTP server if different
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: `"CYBEV CMS" <${process.env.EMAIL_USERNAME}>`,
    to: process.env.REPORT_RECIPIENTS,
    subject: 'CYBEV Weekly CMS Report 📄',
    text: 'Attached is the latest weekly CMS report from CYBEV.',
    attachments: [
      {
        filename: path.basename(pdfPath),
        path: pdfPath
      }
    ]
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Report email sent:', info.response);
  } catch (err) {
    console.error('❌ Failed to send report email:', err.message);
  }
}

module.exports = sendReportEmail;