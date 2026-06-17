const mongoose = require('mongoose');

const medicalProfileSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  blood_group: { type: String, default: '' },
  allergies: { type: String, default: '' },
  medical_conditions: { type: String, default: '' },
  address: { type: String, default: '' },
  phone: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('MedicalProfile', medicalProfileSchema);