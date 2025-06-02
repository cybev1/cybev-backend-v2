
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');
require('dotenv').config();

async function generateAdsPDF() {
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
        <h1>CYBEV Ads Performance Summary</h1>
        <p>This report summarizes campaign-level ad performance including spend and impressions.</p>
        <table>
          <thead>
            <tr><th>Campaign</th><th>Amount Spent ($)</th><th>Impressions</th></tr>
          </thead>
          <tbody>
            <tr><td>Brand Awareness</td><td>150.00</td><td>2500</td></tr>
            <tr><td>Event Boost</td><td>200.00</td><td>3100</td></tr>
            <tr><td>Product Launch</td><td>300.00</td><td>5000</td></tr>
            <tr><td>Follower Growth</td><td>180.00</td><td>2800</td></tr>
          </tbody>
        </table>
      </body>
    </html>
  `;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const pdfPath = path.join(__dirname, 'CYBEV_Ads_Summary_Report.pdf');
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
    subject: 'CYBEV Weekly Ads Summary Report',
    text: 'Attached is the latest ads performance summary.',
    attachments: [{ filename: 'CYBEV_Ads_Summary_Report.pdf', path: pdfPath }]
  };

  await transporter.sendMail(mailOptions);
  console.log('✅ Ads Summary Report emailed successfully!');
}

(async () => {
  try {
    const pdfPath = await generateAdsPDF();
    await sendEmailWithPDF(pdfPath);
  } catch (err) {
    console.error('❌ Error:', err);
  }
})();
