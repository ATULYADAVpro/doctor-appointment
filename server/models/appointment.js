// models/appointment.js
import { Schema, model } from 'mongoose';

const appointmentSchema = new Schema({
  patientName: {
    type: String,
    required: true,
    trim: true
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  date: {           // store as Date for easier comparisons
    type: Date,
    required: true
  },
  time: {           // keep time as string "HH:MM"
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled'
  }
}, {
  timestamps: true
});

// To avoid double booking: unique index on doctor+date+time for scheduled appointments
appointmentSchema.index(
  { doctor: 1, date: 1, time: 1 },
  { unique: true, partialFilterExpression: { status: { $eq: 'scheduled' } } }
);

const Appointment = model('Appointment', appointmentSchema);
export default Appointment;
