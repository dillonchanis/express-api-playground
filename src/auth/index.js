import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const bearer = req.headers['authorization'];

  if (bearer) {
    const token = bearer.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, data) => {
      if (err) {
        return res.status(403).send({ error: 'Unauthorized' });
      }
      next();
    });
  } else {
    return res.status(403).send({ error: 'Unauthorized' });
  }
}
