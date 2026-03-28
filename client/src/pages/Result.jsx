import HospitalMap from '../components/HospitalMap';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const symptom = location.state?.symptom || 'No symptom provided';
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const analyseSymptom = async () => {
      try {
        // Updated to live backend URL
        const response = await fetch('https://voicedoc-mzxb.onrender.com/api/symptom/analyse', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ symptom })
        });
        const data = await response.json();
        console.log('API Response:', data);
        if (data.success) {
          setResult(data.result);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    analyseSymptom();
  }, [symptom]);

  return (
    <div className="result-page">
      <h2>🩺 Analysis Result</h2>

      <div className="symptom-box">
        <p className="label">Neenga sonnatu:</p>
        <p className="symptom-text">"{symptom}"</p>
      </div>

      {loading ? (
        <div className="loading">
          <p>🤖 AI Analysing...</p>
        </div>
      ) : result ? (
        <div className="result-cards">
          <div className="card green">
            <h3>💊 Possible Condition</h3>
            <p>{result.condition}</p>
          </div>
          <div className="card yellow">
            <h3>🏠 Home Remedy</h3>
            <p>{result.remedy || "Rest well, drink warm water. Consult doctor if symptoms persist."}</p>
          </div>
          <div className="card red">
            <h3>⚠️ Severity</h3>
            <p>{result.severity}</p>
            <p>{result.doctor ? '👨‍⚕️ Doctor visit recommended!' : '✅ Home remedy sufficient'}</p>
          </div>
        </div>
      ) : (
        <p>Analysis failed — try again!</p>
      )}
      
      <div className="hospital-section">
        <HospitalMap />
      </div>
      
      <button className="back-btn" onClick={() => navigate('/')}>
        ← Back to Home
      </button>
    </div>
  );
}

export default Result;