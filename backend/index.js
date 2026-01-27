import express from 'express';
import cors from 'cors';
// import userRoutes from './routes/userRoutes.js';
// import authRoutes from './routes/authRoutes.js';
// import objectRoutes from './routes/objectRoutes.js';
import './db/db.js';

process.loadEnvFile(".env");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

// allow only your frontend origin and allow credentials if needed
app.use(cors({
  origin: process.env.URL_FRONTED, // or an array of origins
  credentials: true,
}));

// routes
// app.use('/users', userRoutes);
// app.use('/auth', authRoutes);
// app.use('/objects', objectRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});