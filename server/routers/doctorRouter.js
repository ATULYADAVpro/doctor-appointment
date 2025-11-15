import { Router } from 'express'
import { addDoctor, deleteDoctor, doctorUpdated, getDoctorById, getDoctors } from '../controller/doctorController.js';
const doctorRouter = Router();

doctorRouter.delete('/:id',deleteDoctor)
doctorRouter.get('/doctors',getDoctors)
doctorRouter.get('/:id',getDoctorById)
doctorRouter.post('/add-doctor',addDoctor)
doctorRouter.put('/:id',doctorUpdated)

export default doctorRouter;