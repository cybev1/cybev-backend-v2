
exports.getCMSSummary = async (req, res) => {
  try {
    const summary = [
      { week: "Week 1", newMembers: 25, attendance: 120, giving: 380 },
      { week: "Week 2", newMembers: 40, attendance: 160, giving: 520 },
      { week: "Week 3", newMembers: 33, attendance: 150, giving: 430 },
      { week: "Week 4", newMembers: 45, attendance: 170, giving: 600 },
      { week: "Week 5", newMembers: 50, attendance: 190, giving: 700 }
    ];
    res.json(summary);
  } catch (error) {
    console.error("CMS Summary error:", error);
    res.status(500).json({ error: "Failed to load CMS summary" });
  }
};
