const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');
const User = require('../models/User');
const MedicalProfile = require('../models/MedicalProfile');

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).select('name email');
    if (!user) return res.status(404).json({ error: 'User not found' });

    const profile = await MedicalProfile.findOne({ user_id: userId });

    res.json({
      name: user.name,
      email: user.email,
      blood_group: profile?.blood_group || '',
      allergies: profile?.allergies || '',
      medical_conditions: profile?.medical_conditions || '',
      address: profile?.address || '',
      phone: profile?.phone || ''
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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