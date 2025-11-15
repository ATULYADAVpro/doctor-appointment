# 🏥 Doctor Appointment Web App

A simple web application to manage doctor appointments, built with **MERN stack** (MongoDB, Express, React, Node.js) and styled using **TailwindCSS**.

The app allows users to:

- View a list of doctors  
- Book an appointment with a doctor  
- Validate form inputs (name, date, time)  
- Prevent booking duplicate time slots  

---

## ⚡ Features

- **Doctor Management:** View doctors with name, specialization, and consultation fee  
- **Appointment Booking:** Book an appointment with a selected doctor on a chosen date and time  
- **Form Validation:** Ensures all fields are required and time/date formats are valid  
- **Backend Validation:** Checks for duplicate bookings and validates doctor existence  
- **Navigation:** Simple navigation between Doctors list and Booking page  

---

## 🛠 Technology Stack

**Frontend:**  
- React (with Vite)  
- TailwindCSS  
- React Router DOM  

**Backend:**  
- Node.js  
- Express.js  
- MongoDB (Mongoose)  
- dotenv, cors  

---

## 📁 Project Structure

### Backend
server/
├── controllers/ # Appointment and Doctor controllers
├── models/ # Mongoose schemas
├── routers/ # Express routers
├── config/ # DB connection
├── server.js # Entry point


### Frontend
client/
├── src/
│ ├── components/ # Navbar, DoctorCard
│ ├── pages/ # Doctors, BookAppointment
│ ├── App.jsx
│ ├── main.jsx
│ └── api.js # API base URL


---

## ⚙ Environment Variables

Create a `.env` file in the backend folder:

DB_URL = "<your_mongodb_connection_string>"
PORT = "<port_number>"



---

## 📫 API Endpoints

### Doctors
1. `GET /api/doctor/doctors` – Get all doctors  
2. `GET /api/doctor/:id` – Get doctor by ID  
3. `POST /api/doctor/add-doctor` – Add a new doctor  
4. `PUT /api/doctor/:id` – Update doctor  
5. `DELETE /api/doctor/:id` – Delete doctor  

### Appointments
1. `POST /api/appointment/add-appointment` – Book appointment  
2. `PATCH /api/appointment/:id` – Update appointment status  
3. `GET /api/appointment/get-appointment` – Get all appointments  
4. `DELETE /api/appointment/:id` – Delete appointment  

> Use **Postman** or any API client to test adding doctors or appointments.

---

## 🚀 Setup / Run Instructions

### Backend
```bash
cd server
npm install
npm run dev   # start backend server

## Frontend

cd client
npm install
npm run dev   # start frontend Vite server
