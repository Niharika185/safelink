import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [qrCode, setQrCode] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) { navigate('/'); return; }
    setName(localStorage.getItem('name'));
    fetchQR();
  }, []);

  const fetchQR = async () => {
    try {
 const res = await axios.get(`https://safelink-production.up.railway.app/api/emergency/qr/${userId}`);
      setQrCode(res.data.qrCode);
    } catch (err) {
      console.error('QR fetch error', err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const downloadQR = () => {
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = 'safelink-qr.png';
    link.click();
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ color: '#e74c3c' }}>Welcome, {name}!</h2>
        <button onClick={handleLogout}
          style={{ padding: '8px 16px', background: '#888', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Logout
        </button>
      </div>

      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        <h3>Your Emergency QR Code</h3>
        {qrCode ? (
          <>
            <img src={qrCode} alt="QR Code" style={{ width: '200px', height: '200px' }} />
            <br />
            <button onClick={downloadQR}
              style={{ marginTop: '10px', padding: '10px 20px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Download QR Code
            </button>
          </>
        ) : (
          <p>Please fill your profile first to generate QR code</p>
        )}
      </div>

      <button onClick={() => navigate('/edit-profile')}
        style={{ width: '100%', padding: '10px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>
        Edit My Medical Profile
      </button>
    </div>
  );
}

export default Dashboard;