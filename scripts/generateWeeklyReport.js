const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const sendReportEmail = require('../utils/sendReportEmail');

const MONGO_URI = process.env.MONGO_URI;

const Member = require('../models/Member');
const Attendance = require('../models/Attendance');
const Giving = require('../models/Giving');
const Service = require('../models/Service');

async function connectDB() {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

function generateHTML({ memberCount, attendanceCount, givingTotal, serviceCount }) {
  const date = new Date().toLocaleDateString();
  return \`
    <html>
      <head>
        <style>
          body { font-family: sans-serif; padding: 20px; }
          h1 { text-align: center; }
          table { width: 100%; margin-top: 20px; border-collapse: collapse; }
          td, th { padding: 12px; border: 1px solid #ccc; text-align: left; }
        </style>
      </head>
      <body>
        <h1>CYBEV Weekly Summary Report</h1>
        <p>Date Generated: \${date}</p>
        <table>
          <tr><th>Metric</th><th>Value</th></tr>
          <tr><td>Total Members</td><td>\${memberCount}</td></tr>
          <tr><td>Total Attendance Records</td><td>\${attendanceCount}</td></tr>
          <tr><td>Total Giving (₵)</td><td>\${givingTotal.toFixed(2)}</td></tr>
          <tr><td>Total Services Logged</td><td>\${serviceCount}</td></tr>
        </table>
      </body>
    </html>
  \`;
}

async function generateReport() {
  await connectDB();

  const memberCount = await Member.countDocuments();
  const attendanceCount = await Attendance.countDocuments();
  const giving = await Giving.find({});
  const givingTotal = giving.reduce((sum, g) => sum + g.amount, 0);
  const serviceCount = await Service.countDocuments();

  const html = generateHTML({ memberCount, attendanceCount, givingTotal, serviceCount });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  const fileName = 'weekly-report-' + Date.now() + '.pdf';
  const pdfPath = path.join(__dirname, '../public/reports/', fileName);
  await page.pdf({ path: pdfPath, format: 'A4' });

  await browser.close();
  console.log('📄 Weekly report generated:', pdfPath);

  // Send email with attachment
  await sendReportEmail(pdfPath);
}

generateReport().catch(err => {
  console.error('❌ Failed to generate and email report:', err);
  process.exit(1);
});