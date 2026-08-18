import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import connectDB from './config/db.js';
import apiRoutes from './routes/index.js';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*' }));

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Restaurant Management API Running' });
});

app.get('/api', (req, res) => {
  res.json({ success: true, message: 'Restaurant Management API Ready' });
});

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;
await connectDB();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
