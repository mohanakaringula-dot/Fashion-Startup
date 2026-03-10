const express = require('express');
const multer = require('multer');
const path = require('path');
const { authenticate } = require('../middleware/auth');
const { createConsultation, listConsultations } = require('../models/Consultation');
const { getDesignerById } = require('../models/Designer');
const { createPaymentOrder } = require('../services/paymentService');

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: (_, __, cb) => cb(null, path.join(__dirname, '..', '..', 'public', 'images')),
    filename: (_, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`),
  }),
});

router.post('/payment-order', authenticate, async (req, res) => {
  const { amount } = req.body;
  const order = await createPaymentOrder({ amount: Number(amount), receipt: `consult-${Date.now()}` });
  res.json({ order });
});

router.post('/', authenticate, upload.single('inspiration_image'), async (req, res) => {
  const designer = await getDesignerById(req.body.designer_id);
  if (!designer) {
    return res.status(404).json({ error: 'Designer not found' });
  }

  const consultation = await createConsultation({
    client_id: req.user.id,
    designer_id: req.body.designer_id,
    event_date: req.body.event_date,
    details: (req.body.occasion_details || '').trim(),
    measurements: (req.body.measurements || '').trim(),
    inspiration_image: req.file ? `/images/${req.file.filename}` : null,
    preferred_time: (req.body.preferred_time || '').trim(),
    urgent_deadline: req.body.urgent_deadline || null,
    payment_id: req.body.payment_id || null,
    status: req.body.payment_id ? 'confirmed' : 'pending',
  });

  return res.status(201).json({
    consultation,
    message: `Consultation confirmed — ${designer.name}`,
  });
});

router.get('/', authenticate, async (req, res) => {
  if (req.user.role === 'client') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const consultations = await listConsultations();
  return res.json({ consultations });
});

module.exports = router;
