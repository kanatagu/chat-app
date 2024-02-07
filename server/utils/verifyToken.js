const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log('token!', token);
    if (!token) {
      return res.status(401).json({ token: null });
    }

    const verified = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);

    if (!verified || typeof verified !== 'object') {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = {
      id: verified.id,
      username: verified.username,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = verifyToken;
