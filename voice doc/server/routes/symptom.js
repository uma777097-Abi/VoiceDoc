const express = require('express');
const router = express.Router();

router.post('/analyse', async (req, res) => {
  const { symptom } = req.body;
  
  console.log('Symptom received:', symptom);

  // Simple manual response (no AI)
  let condition = "Cold & Headache";
  let remedy = "Rest well, drink warm water with honey. Take paracetamol if fever.";
  let severity = "Minor";
  let doctor = false;
  
  if (symptom.includes('fever') || symptom.includes('kaaichal')) {
    condition = "Fever";
    remedy = "Rest, drink ORS, take paracetamol";
    severity = "Moderate";
    doctor = true;
  } else if (symptom.includes('thalaivali') || symptom.includes('headache')) {
    condition = "Headache";
    remedy = "Rest in dark room, drink water, apply cold compress";
    severity = "Minor";
    doctor = false;
  } else if (symptom.includes('cough')) {
    condition = "Cough";
    remedy = "Honey with warm water, ginger tea";
    severity = "Minor";
    doctor = false;
  }
  
  res.json({ 
    success: true, 
    result: { condition, remedy, severity, doctor }
  });
});

module.exports = router;