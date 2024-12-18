import express from 'express';
import cors from 'cors';
import { config } from './config/config';
import { connectDB } from './config/database';
import authRoutes from './routes/auth.routes';
import documentRoutes from './routes/document.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);

connectDB().then(() => {
  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
});