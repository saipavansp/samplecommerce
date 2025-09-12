const jwt = require('jsonwebtoken');

const signAccessToken = (userId, role) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRE || '30d';
  if (!secret) {
    throw new Error('JWT_SECRET not set');
  }
  return jwt.sign({ sub: userId, role }, secret, { expiresIn });
};

const verifyToken = (token) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET not set');
  }
  return jwt.verify(token, secret);
};

module.exports = { signAccessToken, verifyToken };


