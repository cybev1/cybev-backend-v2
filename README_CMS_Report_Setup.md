# 📄 CYBEV Weekly Report Automation Setup Guide

This guide walks you through deploying and testing the full weekly report system for CYBEV CMS.

---

## ✅ Required Files

| File                        | Path                             |
|-----------------------------|----------------------------------|
| Report Generator Script     | `/scripts/generateWeeklyReport.js` |
| Email Sender (Nodemailer)   | `/utils/sendReportEmail.js`        |
| Activity Logger             | `/utils/logActivity.js`            |
| CMS Data Models             | `/models/*.js` (Member, Giving...) |
| Report Viewer Page          | `/pages/studio/cms/reports-history.jsx` |
| Report Summary Page         | `/pages/studio/cms/report-summary.jsx` |
| Public Output Directory     | `/public/reports/` (must exist)    |

---

## 🔐 Environment Variables (`.env` or Railway Variables)

```env
MONGO_URI=your_mongo_connection_string
EMAIL_USERNAME=info@cybev.io
EMAIL_PASSWORD=lP~tYSvCQ(@$
REPORT_RECIPIENTS=udezedike@gmail.com
```

> 📌 Use an SMTP-compatible email with app password or standard credentials.

---

## 🧪 Testing the Full Flow

### Step 1: Run the script
```bash
node scripts/generateWeeklyReport.js
```

### Step 2: Confirm Results
- ✅ PDF is saved to `/public/reports/`
- ✅ `index.json` is updated with list of PDFs
- ✅ Email with attachment is sent
- ✅ Activity is logged to `ActivityLog` collection

---

## 🖥️ Frontend Confirmation

- Visit `/studio/cms/reports-history` to browse all past reports
- Visit `/studio/cms/activity-log` to confirm logging
- Visit `/studio/cms/report-summary` to print/share structured reports

---

## 📅 Production Setup

Use a **Railway Cron Task** with this command:
```bash
node scripts/generateWeeklyReport.js
```
Use this cron schedule:
```
0 0 * * 0
```
> 📅 Runs every Sunday at midnight UTC

---

Enjoy automated reporting with CYBEV! 🚀