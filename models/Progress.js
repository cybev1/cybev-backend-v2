
import mongoose from 'mongoose';

const ProgressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  group: { type: String, required: true },
  foundation: { type: String, required: true },
  soulWinning: { type: String, required: true }
});

export default mongoose.models.Progress || mongoose.model('Progress', ProgressSchema);
