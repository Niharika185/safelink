import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EmergencyPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const { userId } = useParams();

  useEffect(() => {
    fetchEmergencyData();
  }, []);

  const fetchEmergencyData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/emergency/${userId}`);
      setData(res.data);
    } catch (err) {
      setError('Person not found or no data available');
    }
  };

  if (error) return (
    <div style={{ textAlign: 'center', marginTop: '100px', color: 'red' }}>
      <h2>{error}</h2>
    </div>
  );

  if (!data) return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Loading...</h2>
    </div>
  );

  return (
    <div style={{ maxWidth: '500px', margin: '30px auto', padding: '30px', border: '3px solid #e74c3c', borderRadius: '10px' }}>
      <h2 style={{ textAlign: 'center', color: '#e74c3c' }}>EMERGENCY INFORMATION</h2>
      <hr />
      <div style={{ marginBottom: '15px' }}>
        <strong>Name:</strong>
        <p style={{ fontSize: '20px', margin: '5px 0' }}>{data.name}</p>
      </div>
      <div style={{ marginBottom: '15px', background: '#ffe6e6', padding: '10px', borderRadius: '5px' }}>
        <strong>Blood Group:</strong>
        <p style={{ fontSize: '24px', color: '#e74c3c', margin: '5px 0', fontWeight: 'bold' }}>{data.blood_group || 'Not provided'}</p>
      </div>
      <div style={{ marginBottom: '15px' }}>
        <strong>Allergies:</strong>
        <p style={{ margin: '5px 0' }}>{data.allergies || 'None'}</p>
      </div>
      <div style={{ marginBottom: '15px' }}>
        <strong>Medical Conditions:</strong>
        <p style={{ margin: '5px 0' }}>{data.medical_conditions || 'None'}</p>
      </div>
      <div style={{ marginBottom: '15px' }}>
        <strong>Phone:</strong>
        <p style={{ margin: '5px 0' }}>{data.phone || 'Not provided'}</p>
      </div>
      <div style={{ marginBottom: '15px' }}>
        <strong>Address:</strong>
        <p style={{ margin: '5px 0' }}>{data.address || 'Not provided'}</p>
      </div>
      <div style={{ background: '#e74c3c', color: 'white', padding: '10px', borderRadius: '5px', textAlign: 'center' }}>
        <strong>In case of emergency please call the above number immediately!</strong>
      </div>
    </div>
  );
}

export default EmergencyPage;