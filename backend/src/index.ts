import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from './config';

// Import routes (to be created)
import authRoutes from './routes/auth';
import employeeRoutes from './routes/employees';
import clientRoutes from './routes/clients';
import revenueRoutes from './routes/revenue';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(config.mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/revenue', revenueRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});