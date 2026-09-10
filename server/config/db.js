import dns from 'node:dns';
import mongoose from 'mongoose';

const dnsServers = (process.env.MONGODB_DNS_SERVERS || '8.8.8.8,1.1.1.1')
  .split(',')
  .map((server) => server.trim())
  .filter(Boolean);

dns.setServers(dnsServers);

export const connectDatabase = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is required. Add it to server/.env before starting the API.');

  if (mongoose.connection.readyState === 1) return mongoose.connection;

  mongoose.connection.on('connected', () => console.log('MongoDB connection established'));
  mongoose.connection.on('error', (error) => console.error(`MongoDB error: ${error.message}`));
  mongoose.connection.on('disconnected', () => console.warn('MongoDB connection closed'));

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
  });

  console.log(`MongoDB connected: ${mongoose.connection.host}`);
  return mongoose.connection;
};

export const disconnectDatabase = async () => {
  if (mongoose.connection.readyState !== 0) await mongoose.disconnect();
};
