
import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  group: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, required: true }
});

export default mongoose.models.Attendance || mongoose.model('Attendance', AttendanceSchema);
