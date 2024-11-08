import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { config } from './config.js';
import { connectDB } from './db.js';
import { configureRoutes } from './routes/index.js';

const app = express();

const PORT = config.PORT;

app.use(bodyParser.json());
app.use(cors());

connectDB();

configureRoutes(app);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
