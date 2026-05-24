const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.userId = decoded.userId;
    next();
  });
};

// Get profile
router.get('/', verifyToken, (req, res) => {
  const sql = 'SELECT * FROM medical_profiles WHERE user_id = ?';
  db.query(sql, [req.userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0] || {});
  });
});

// Save or update profile
router.put('/', verifyToken, (req, res) => {
  const { blood_group, allergies, medical_conditions, address, phone } = req.body;
  const sql = `INSERT INTO medical_profiles 
    (user_id, blood_group, allergies, medical_conditions, address, phone)
    VALUES (?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
    blood_group=?, allergies=?, medical_conditions=?, address=?, phone=?`;
  db.query(sql, 
    [req.userId, blood_group, allergies, medical_conditions, address, phone,
     blood_group, allergies, medical_conditions, address, phone],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Profile updated successfully' });
    }
  );
});

module.exports = router;