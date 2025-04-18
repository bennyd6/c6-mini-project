const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Bennyi$ag00dguy';

const fetchOrganizer = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send({ error: "Please authenticate using a valid token" });

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.organizer = data.organizer;
    next();
  } catch (err) {
    res.status(401).send({ error: "Invalid token" });
  }
};

module.exports = fetchOrganizer;
