
import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  leader: { type: String, required: true },
  members: { type: Number, required: true }
});

export default mongoose.models.Group || mongoose.model('Group', GroupSchema);
