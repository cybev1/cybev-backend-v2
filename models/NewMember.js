
import mongoose from 'mongoose';

const NewMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  group: { type: String, required: true },
  dateJoined: { type: Date, required: true },
  followUp: { type: String, required: true }
});

export default mongoose.models.NewMember || mongoose.model('NewMember', NewMemberSchema);
