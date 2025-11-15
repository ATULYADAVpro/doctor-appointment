import { Schema, model } from 'mongoose'

const doctorSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    specialization: {
        type: String,
        required: true,
        trim: true
    },
    consultationFee: {
        type: Number,
        required: true,
        min: 0
    },
    availableSlots: [{
        date: String,
        time: String
    }]
}, {
    timestamps: true
});

const Doctor = model('Doctor', doctorSchema);
export default Doctor;