const jwt = require('jsonwebtoken');
const knex = require('../knex-config');
const SECRET_KEY = 'tasneem';  


const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token.split(' ')[1], SECRET_KEY); // "Bearer <token>"
    req.user = decoded; // Attach user details to request object
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// Middleware to check if user is a Super Admin
const isSuperAdmin = (req, res, next) => {
  if (req.user.role !== 'super_admin') {
    return res.status(403).json({ message: 'Access denied. Super Admins only.' });
  }
  next();
};

// Middleware to check if user is an Admin
const isAdmin = (req, res, next) => {
  if (!['admin', 'super_admin'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};

module.exports = { authenticateToken, isSuperAdmin, isAdmin };


