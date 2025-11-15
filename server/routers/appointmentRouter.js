import { Router } from 'express'
import { addAppointment, deleteApointment, getAppointment, updatedAppointment } from '../controller/appointmentController.js';
const appointmentRouter = Router();

appointmentRouter.post('/add-appointment', addAppointment)
appointmentRouter.patch('/:id', updatedAppointment)
appointmentRouter.get('/get-appointment', getAppointment)
appointmentRouter.delete('/:id', deleteApointment)

export default appointmentRouter;