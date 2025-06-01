
const path = require('path');
const { exec } = require('child_process');

exports.generateTokenReport = (req, res) => {
  const scriptPath = path.join(__dirname, '../scripts/weeklyReports/generateTokenMetrics.js');

  exec(`node ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error: ${error.message}`);
      return res.status(500).json({ success: false, error: error.message });
    }
    if (stderr) {
      console.error(`⚠️ Stderr: ${stderr}`);
    }
    console.log(`✅ Stdout: ${stdout}`);
    res.json({ success: true, message: 'Token metrics report generated and email sent.' });
  });
};
