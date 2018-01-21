import express from 'express';
import { config as envConfig } from 'dotenv';
import Router from './routes';

envConfig();

const app = express();
const port = process.env.PORT;

app.use('/api', Router);

app.listen(port, () => console.log(`Listening on Port ${port}`));