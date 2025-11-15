// server.js
import express from 'express';
import { config } from 'dotenv';
import doctorRouter from './routers/doctorRouter.js';
import appointmentRouter from './routers/appointmentRouter.js';
import connectDb from './config/db.js';
import cors from 'cors';

config();
const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect DB with error handling
(async () => {
  try {
    await connectDb();
    console.log('MongoDB connected');
  } catch (err) {
    console.error('DB connection error:', err);
    process.exit(1);
  }
})();

// routers
app.use('/api/doctor', doctorRouter);
app.use('/api/appointment', appointmentRouter);


app.get('/', (req, res) => {
  res.send(`Working backend. http://localhost:${PORT}`);
});

// global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`server start at http://localhost:${PORT}`);
});
