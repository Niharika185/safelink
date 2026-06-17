const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const MedicalProfile = require('../models/MedicalProfile');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.userId = decoded.userId;
    next();
  });
};

router.get('/', verifyToken, async (req, res) => {
  try {
    const profile = await MedicalProfile.findOne({ user_id: req.userId });
    res.json(profile || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/', verifyToken, async (req, res) => {
  const { blood_group, allergies, medical_conditions, address, phone } = req.body;
  try {
    const profile = await MedicalProfile.findOneAndUpdate(
      { user_id: req.userId },
      { blood_group, allergies, medical_conditions, address, phone },
      { upsert: true, new: true }
    );
    res.json({ message: 'Profile updated successfully', profile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;