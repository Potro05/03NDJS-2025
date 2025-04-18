import 'dotenv/config'; 
import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connecté'))
  .catch(err => console.error('❌ Erreur MongoDB', err));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use((req, res) => res.status(404).json({ error: 'Not Found' }));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`⚡️ Server running on port ${PORT}`));
