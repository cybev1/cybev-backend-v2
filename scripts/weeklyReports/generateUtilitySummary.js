
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');
require('dotenv').config();

async function generateUtilityPDF() {
  const html = `
    <html>
      <head>
        <style>
          body { font-family: Arial; padding: 20px; }
          h1 { text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #000; padding: 8px; text-align: center; }
        </style>
      </head>
      <body>
        <h1>CYBEV Utility Transactions Summary</h1>
        <p>This report summarizes recent utility service usage including Airtime, DSTV, Electricity, and Virtual Card.</p>
        <table>
          <thead>
            <tr><th>Service</th><th>Amount ($)</th></tr>
          </thead>
          <tbody>
            <tr><td>Airtime</td><td>25.5</td></tr>
            <tr><td>Electricity</td><td>135.0</td></tr>
            <tr><td>Data</td><td>55.0</td></tr>
            <tr><td>DSTV</td><td>95.0</td></tr>
            <tr><td>Virtual Card</td><td>100.0</td></tr>
          </tbody>
        </table>
      </body>
    </html>
  `;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const pdfPath = path.join(__dirname, 'CYBEV_Utility_Summary_Report.pdf');
  await page.pdf({ path: pdfPath, format: 'A4' });
  await browser.close();
  return pdfPath;
}

async function sendEmailWithPDF(pdfPath) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: ['info@cybev.io', 'udezedike@gmail.com'],
    subject: 'CYBEV Weekly Utility Report',
    text: 'Please find attached the weekly utility report.',
    attachments: [{ filename: 'CYBEV_Utility_Summary_Report.pdf', path: pdfPath }]
  };

  await transporter.sendMail(mailOptions);
  console.log('✅ Utility Summary Report emailed successfully!');
}

(async () => {
  try {
    const pdfPath = await generateUtilityPDF();
    await sendEmailWithPDF(pdfPath);
  } catch (err) {
    console.error('❌ Error:', err);
  }
})();
