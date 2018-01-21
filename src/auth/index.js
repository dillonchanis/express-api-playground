export const verifyToken = (req, res, next) => {
  const bearer = req.headers['authorization']

  if (bearer) {
    const token = bearer.split(' ')[1]
    req.token = token
    next()
  } else {
    res.sendStatus(403)
  }
}
