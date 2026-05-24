import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
  const [form, setForm] = useState({
    blood_group: '',
    allergies: '',
    medical_conditions: '',
    address: '',
    phone: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) { navigate('/'); return; }
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
   const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/profile`, {
        headers: { authorization: token }
      });
      if (res.data) setForm(res.data);
    } catch (err) {
      console.error('Profile fetch error', err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     await axios.put(`${process.env.REACT_APP_API_URL}/api/profile`, form, {
        headers: { authorization: token }
      });
      setMessage('Profile saved successfully!');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setMessage('Error saving profile');
    }
  };

  const inputStyle = {
    width: '100%', padding: '10px', marginTop: '5px',
    borderRadius: '5px', border: '1px solid #ddd'
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '10px' }}>
      <h2 style={{ textAlign: 'center', color: '#e74c3c' }}>My Medical Profile</h2>
      {message && <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Blood Group</label>
          <input name="blood_group" value={form.blood_group} onChange={handleChange} style={inputStyle} placeholder="e.g. A+" />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Allergies</label>
          <textarea name="allergies" value={form.allergies} onChange={handleChange} style={inputStyle} placeholder="e.g. Penicillin, Peanuts" rows="3" />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Medical Conditions</label>
          <textarea name="medical_conditions" value={form.medical_conditions} onChange={handleChange} style={inputStyle} placeholder="e.g. Diabetes, Asthma" rows="3" />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Phone Number</label>
          <input name="phone" value={form.phone} onChange={handleChange} style={inputStyle} placeholder="e.g. 9876543210" />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Address</label>
          <textarea name="address" value={form.address} onChange={handleChange} style={inputStyle} placeholder="Your address" rows="2" />
        </div>
        <button type="submit"
          style={{ width: '100%', padding: '10px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>
          Save Profile
        </button>
      </form>
      <button onClick={() => navigate('/dashboard')}
        style={{ width: '100%', padding: '10px', marginTop: '10px', background: '#888', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Back to Dashboard
      </button>
    </div>
  );
}

export default EditProfile;