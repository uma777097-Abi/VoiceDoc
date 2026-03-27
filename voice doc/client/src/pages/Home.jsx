import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="hero">
        <h1>🏥 VoiceDoc</h1>
        <p>AI Powered Tamil Health Assistant</p>
        <p className="sub">Symptoms sollunga — AI analyse pannuchu!</p>
        <button onClick={() => navigate('/symptom')}>
          Start Consultation 🎤
        </button>
      </div>
    </div>
  );
}

export default Home;