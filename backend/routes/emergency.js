const express = require('express');
const router = express.Router();
const db = require('../db');
const QRCode = require('qrcode');

// Get emergency info by userId - NO login needed
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const sql = `SELECT u.name, u.email, m.blood_group, m.allergies, 
               m.medical_conditions, m.address, m.phone 
               FROM users u 
               LEFT JOIN medical_profiles m ON u.id = m.user_id 
               WHERE u.id = ?`;
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(results[0]);
  });
});

// Generate QR code for a user
router.get('/qr/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
 const url = `https://safelink-blue.vercel.app/emergency/${userId}`;
    const qrCode = await QRCode.toDataURL(url);
    res.json({ qrCode });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;