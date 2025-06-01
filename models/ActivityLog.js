
import mongoose from 'mongoose';

const ActivityLogSchema = new mongoose.Schema({
  adminId: { type: String, required: true },
  actionType: { type: String, required: true },
  module: { type: String, required: true },
  description: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.models.ActivityLog || mongoose.model('ActivityLog', ActivityLogSchema);
