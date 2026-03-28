import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Symptom() {
  const navigate = useNavigate();
  const [listening, setListening] = useState(false);
  const [symptomText, setSymptomText] = useState('');

  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'ta-IN';
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setSymptomText(text);
    };

    recognition.start();
  };

  const handleSubmit = () => {
    if (symptomText.trim()) {
      navigate('/result', { state: { symptom: symptomText } });
    }
  };

  return (
    <div className="symptom-page">
      <h2>🎤 Symptoms Sollunga</h2>
      <p>Mic press panni Tamil la pesungo</p>

      <button
        className={`mic-btn ${listening ? 'active' : ''}`}
        onClick={startListening}
      >
        {listening ? '🔴 Listening...' : '🎤 Start Speaking'}
      </button>

      <textarea
        placeholder="Illa inga type pannalum..."
        value={symptomText}
        onChange={(e) => setSymptomText(e.target.value)}
      />

      <button className="submit-btn" onClick={handleSubmit}>
        Analyse Pannuchu →
      </button>
    </div>
  );
}

export default Symptom;