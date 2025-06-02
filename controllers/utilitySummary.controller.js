
exports.getUtilitySummary = async (req, res) => {
  try {
    const summary = [
      { service: "Airtime", amount: 15.5 },
      { service: "Electricity", amount: 60.0 },
      { service: "Data", amount: 25.0 },
      { service: "DSTV", amount: 50.0 },
      { service: "Airtime", amount: 10.0 },
      { service: "Electricity", amount: 75.0 },
      { service: "Data", amount: 30.0 },
      { service: "DSTV", amount: 45.0 },
      { service: "Virtual Card", amount: 100.0 }
    ];
    res.json(summary);
  } catch (err) {
    console.error("Utility Summary Error:", err);
    res.status(500).json({ error: "Failed to load utility summary" });
  }
};
