import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { connectDatabase, disconnectDatabase } from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import contactRoutes from './routes/contactRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;
app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(',').map((origin) => origin.trim());
app.use(cors({
  origin: (origin, callback) => (!origin || allowedOrigins.includes(origin)
    ? callback(null, true)
    : callback(new Error('Not allowed by CORS'))),
  credentials: true,
}));

app.get('/', (req, res) => res.status(200).json({ success: true, message: 'Portfolio API is running' }));
app.get('/api/health', (req, res) => res.status(200).json({ success: true, uptime: process.uptime() }));
app.use('/api', contactRoutes);
app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDatabase();
    const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    const shutdown = async (signal) => {
      console.log(`${signal} received. Closing server...`);
      server.close(async () => {
        await disconnectDatabase();
        process.exit(0);
      });
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
  } catch (error) {
    console.error(`Unable to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
