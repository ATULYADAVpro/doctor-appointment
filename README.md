Doctor Appointment Web App

A simple web application to manage doctor appointments, built with MERN stack (MongoDB, Express, React, Node.js) and styled using TailwindCSS.

The app allows users to:

View a list of doctors
  -Book an appointment with a doctor
  -Validate form inputs (name, date, time)
  -Prevent booking duplicate time slots

Features
  Doctor Management: View doctors with name, specialization, and consultation fee
  Appointment Booking: Book an appointment with a selected doctor on a chosen date and time
  Form Validation: Ensures all fields are required and time/date formats are valid
  Backend Validation: Checks for duplicate bookings and validates doctor existence
  Navigation: Simple navigation between Doctors list and Booking page


Technology Stack

Frontend:
React (with Vite)
TailwindCSS
React Router DOM

Backend:
Node.js
Express.js
MongoDB (Mongoose)
dotenv, cors

📁 Project Structure
Backend:-
server/
 ├── controllers/        # Appointment and Doctor controllers
 ├── models/             # Mongoose schemas
 ├── routers/            # Express routers
 ├── config/             # DB connection
 ├── server.js           # Entry point

Frontend:-
client/
 ├── src/
 │    ├── components/    # Navbar, DoctorCard
 │    ├── pages/         # Doctors, BookAppointment
 │    ├── App.jsx
 │    ├── main.jsx
 │    └── api.js         # API base URL

 env
 DB_URL = ""
 PORT = " "

 Use Postman for add doctors.

 api endpoints:- 
 for doctors -
1. get ("/api/doctor/doctors",{data})
2. delete('/:id',deleteDoctor)
3. get('/doctors',getDoctors)
4. get('/:id',getDoctorById)
5. post('/add-doctor',addDoctor)
6. put('/:id',doctorUpdated)

for appointment book: -
1. post('/add-appointment', addAppointment)
2. patch('/:id', updatedAppointment)
3. get('/get-appointment', getAppointment)
4. delete('/:id', deleteApointment)

Setup/run instructions:-
Installation
1. Clone the repository
2. change dictory to client run npm install.
3. then change dictory to server run npm test.

also check demo on this link:-
