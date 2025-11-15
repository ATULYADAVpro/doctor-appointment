import Doctor from "../models/doctor.js";

// ------ add doctor function  -----
export const addDoctor = async (req, res, next) => {
  try {
    const { name, specialization, consultationFee, availableSlots } = req.body;
    if (!name || !specialization || consultationFee === undefined) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    const fee = parseFloat(consultationFee);
    if (Number.isNaN(fee) || fee < 0) {
      return res.status(400).json({ success: false, message: "Invalid consultation fee" });
    }

    const doctor = new Doctor({
      name: name.trim(),
      specialization: specialization.trim(),
      consultationFee: fee,
      availableSlots: availableSlots || []
    });

    const newDoctor = await doctor.save();
    res.status(201).json({ message: 'Doctor created successfully', doctor: newDoctor, success: true });
  } catch (error) {
    next(error);
  }
};

// ------ update doctors date and details -----
export const doctorUpdated = async (req, res) => {
    const { name, specialization, consultationFee, availableSlots } = req.body;

    try {
        const updateData = {};
        if (name) updateData.name = name.trim();
        if (specialization) updateData.specialization = specialization.trim();
        if (consultationFee) updateData.consultationFee = parseFloat(consultationFee);
        if (availableSlots) updateData.availableSlots = availableSlots;

        const doctor = await Doctor.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.json({
            message: 'Doctor updated successfully',
            doctor
        });

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// ------- delete doctor -----
export const deleteDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndDelete(req.params.id);

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.json({ message: 'Doctor deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// ----- get all doctor ----- 
export const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({});

        if (!doctors) {
            res.json({ message: "doctors are not availabe.", success: false })
        }

        return res.json({ doctors, success: true })
    } catch (error) {
        res.json({ message: error.message, success: false })
    }
}

// get doctor by id 

export const getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found', success: false });
        }
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}