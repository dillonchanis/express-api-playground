import express from 'express';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../auth';

const Router = express.Router();

Router.get('/', (req, res) => {
  res.status(200).json({ msg: 'This does not require a JWT.' });
});

Router.post('/login', (req, res) => {
  const user = { id: 1, name: 'Dillon', age: 25 } // Fake DB user

  jwt.sign({ user }, process.env.JWT_SECRET, (err, token) => {
    res.json({ token });
  });
});

Router.post('/user/add', verifyToken, (req, res) => {
  res.status(200).send({ success: true });
});

export default Router;