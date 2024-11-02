import mongoose from 'mongoose';

import { config } from './config.js';

const MONGODB_URI = config.MONGODB_URI;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDb Connected');
  } catch (error) {
    console.error(`Mongo Connection Failed: ${error.message}`);
  }
};
