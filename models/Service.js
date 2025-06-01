
import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  attendance: { type: Number, required: true }
});

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);
