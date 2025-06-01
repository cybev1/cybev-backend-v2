
import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  submittedBy: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, required: true }
});

export default mongoose.models.Report || mongoose.model('Report', ReportSchema);
