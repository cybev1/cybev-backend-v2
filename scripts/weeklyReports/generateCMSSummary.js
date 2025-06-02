
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');
require('dotenv').config();

async function generateCMSPDF() {
  const htmlContent = `
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
        <h1>CYBEV CMS Summary Report</h1>
        <p>This report summarizes new member registrations, attendance figures, and total giving across the last 5 weeks.</p>
        <table>
          <thead>
            <tr>
              <th>Week</th><th>New Members</th><th>Attendance</th><th>Giving ($)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Week 1</td><td>25</td><td>120</td><td>380</td></tr>
            <tr><td>Week 2</td><td>40</td><td>160</td><td>520</td></tr>
            <tr><td>Week 3</td><td>33</td><td>150</td><td>430</td></tr>
            <tr><td>Week 4</td><td>45</td><td>170</td><td>600</td></tr>
            <tr><td>Week 5</td><td>50</td><td>190</td><td>700</td></tr>
          </tbody>
        </table>
      </body>
    </html>
  `;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  const pdfPath = path.join(__dirname, 'CYBEV_CMS_Summary_Report.pdf');
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
    subject: 'Weekly CMS Summary Report – CYBEV',
    text: 'Please find attached the weekly CMS summary report.',
    attachments: [{ filename: 'CYBEV_CMS_Summary_Report.pdf', path: pdfPath }]
  };

  await transporter.sendMail(mailOptions);
  console.log('✅ CMS Summary Report emailed successfully!');
}

(async () => {
  try {
    const pdfPath = await generateCMSPDF();
    await sendEmailWithPDF(pdfPath);
  } catch (err) {
    console.error('❌ Error:', err);
  }
})();
