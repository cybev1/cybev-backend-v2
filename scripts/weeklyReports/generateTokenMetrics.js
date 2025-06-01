
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');
const data = require('./automated_token_metrics_config.json');

async function generateReport() {
  const reportPath = path.join(__dirname, 'CYBEV_Token_Metrics_Report.pdf');

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(`<h1>CYBEV Token Metrics Report</h1><p>This would be replaced with actual charts and data.</p>`);
  await page.pdf({ path: reportPath, format: 'A4' });

  await browser.close();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: data.recipient_emails.join(','),
    subject: 'Weekly CYBEV Token Metrics Report',
    text: 'Attached is the latest CYBEV Token Metrics Report.',
    attachments: [{
      filename: 'CYBEV_Token_Metrics_Report.pdf',
      path: reportPath
    }]
  };

  await transporter.sendMail(mailOptions);
  console.log('📩 Report sent successfully!');
}

generateReport().catch(err => {
  console.error('❌ Error generating/sending report:', err);
});
