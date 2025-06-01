
import mongoose from 'mongoose';

const GivingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  group: { type: String, required: true },
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true }
});

export default mongoose.models.Giving || mongoose.model('Giving', GivingSchema);
