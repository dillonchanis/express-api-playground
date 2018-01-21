import express from 'express';
import jwt from 'jsonwebtoken';
import { config as envConfig } from 'dotenv';
import { verifyToken } from './auth';
envConfig()

const app = express();
const port = process.env.PORT;

const Router = express.Router();

app.use('/', Router);

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'This does not require a JWT.' });
})

app.post('/api/login', (req, res) => {
  const user = { id: 1, name: 'Dillon', age: 25 } // Fake DB user

  jwt.sign({ user }, process.env.JWT_SECRET, (err, token) => {
    res.json({ token });
  })
})

app.post('/api/user/add', verifyToken, (req, res) => {
  res.status(200).send({ success: true });
})

app.listen(port, () => console.log(`Listening on Port ${port}`));