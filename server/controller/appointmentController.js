import Appointment from "../models/appointment.js";
import Doctor from "../models/doctor.js";
import mongoose from 'mongoose';

// helper to parse date input (YYYY-MM-DD or other)
const parseDateOnly = (dateStr) => {
  // create Date at midnight local time
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return null;
  d.setHours(0,0,0,0);
  return d;
};

export const addAppointment = async (req, res, next) => {
  try {
    let { patientName, doctor, date, time } = req.body;

    // basic validation
    if (!patientName || !patientName.trim()) {
      return res.status(400).json({ success: false, message: 'Patient name is required' });
    }
    patientName = patientName.trim();
    if (patientName.length < 2 || patientName.length > 50) {
      return res.status(400).json({ success: false, message: 'Patient name must be 2-50 characters' });
    }

    if (!doctor || !mongoose.Types.ObjectId.isValid(doctor)) {
      return res.status(400).json({ success: false, message: 'Valid doctor id is required' });
    }

    if (!date) {
      return res.status(400).json({ success: false, message: 'Date is required' });
    }
    const selectedDate = parseDateOnly(date);
    if (!selectedDate) {
      return res.status(400).json({ success: false, message: 'Invalid date format' });
    }
    const today = new Date();
    today.setHours(0,0,0,0);
    if (selectedDate < today) {
      return res.status(400).json({ success: false, message: 'Cannot book appointments for past dates' });
    }

    if (!time || !time.trim()) {
      return res.status(400).json({ success: false, message: 'Time is required' });
    }
    time = time.trim();
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(time)) {
      return res.status(400).json({ success: false, message: 'Invalid time format (HH:MM)' });
    }

    // check doctor exists
    const doctorExists = await Doctor.findById(doctor);
    if (!doctorExists) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    const appointment = new Appointment({
      patientName,
      doctor,
      date: selectedDate,
      time
    });

    try {
      const newAppointment = await appointment.save();
      await newAppointment.populate('doctor');
      return res.status(201).json({
        message: 'Appointment booked successfully',
        appointment: newAppointment,
        success: true
      });
    } catch (saveErr) {
      // handle duplicate key (unique index) error - prevents double booking
      if (saveErr.code === 11000) {
        return res.status(400).json({ success: false, message: 'Time slot already booked' });
      }
      throw saveErr; // let outer catch handle
    }
  } catch (error) {
    next(error); // send to global error handler
  }
};

export const updatedAppointment = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ['scheduled', 'completed', 'cancelled'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Status must be one of: scheduled, completed, cancelled",
        success: false
      });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('doctor');

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found', success: false });
    }

    res.json({
      message: 'Appointment updated successfully',
      appointment,
      success: true
    });
  } catch (error) {
    next(error);
  }
};

export const deleteApointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found', success: false });
    }
    res.json({ message: 'Appointment deleted successfully', success: true });
  } catch (error) {
    next(error);
  }
};

export const getAppointment = async (req, res, next) => {
  try {
    // support optional query filters: doctor, date, status
    const filter = {};
    if (req.query.doctor && mongoose.Types.ObjectId.isValid(req.query.doctor)) {
      filter.doctor = req.query.doctor;
    }
    if (req.query.status) filter.status = req.query.status;
    if (req.query.date) {
      const d = new Date(req.query.date);
      if (!Number.isNaN(d.getTime())) {
        d.setHours(0,0,0,0);
        const next = new Date(d);
        next.setDate(next.getDate() + 1);
        filter.date = { $gte: d, $lt: next };
      }
    }

    const appointments = await Appointment.find(filter).populate('doctor').sort({ date: 1, time: 1 });
    res.json({ success: true, appointments });
  } catch (error) {
    next(error);
  }
};
