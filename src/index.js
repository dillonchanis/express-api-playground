import express from 'express'
import jwt from 'jsonwebtoken'
import { config as envConfig } from 'dotenv'
import { verifyToken } from './auth'
envConfig()

const app = express()

app.get('/', (req, { json }) => {
  json({ msg: 'This does not require a JWT.' })
})

app.post('/api/login', (req, res) => {
  const user = { id: 1, name: 'Dillon', age: 25 } // Fake DB user

  jwt.sign({ user }, process.env.JWT_SECRET, (err, token) => {
    res.json({ token })
  })
})

app.post('/api/user/add', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, data) => {
    if (err) {
      res.sendStatus(403)
      return
    }

    res.json({
      msg: 'You created a user!',
      data
    })
  })
})

app.listen(process.env.PORT, () => console.log('Listening on Port 3000'))