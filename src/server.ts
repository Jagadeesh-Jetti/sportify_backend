import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('🚀 Sportify Backend Running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`✅ Server running on port ${PORT}`);
});
