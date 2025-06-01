
import mongoose from 'mongoose';

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  group: { type: String, required: true },
  joined: { type: Date, required: true }
});

export default mongoose.models.Member || mongoose.model('Member', MemberSchema);
