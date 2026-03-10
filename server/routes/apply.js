const express = require('express');
const multer = require('multer');
const path = require('path');
const { createApplication } = require('../models/Application');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, path.join(__dirname, '..', '..', 'public', 'images')),
  filename: (_, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`),
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (_, file, cb) => {
    if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.mimetype)) {
      return cb(new Error('Only JPEG/PNG/PDF files are allowed'));
    }
    cb(null, true);
  },
});

router.post('/', upload.single('verification_doc'), async (req, res) => {
  try {
    const payload = {
      name: (req.body.name || '').trim(),
      email: (req.body.email || '').trim().toLowerCase(),
      phone: (req.body.phone || '').trim(),
      profession: (req.body.profession || '').trim(),
      city: (req.body.city || '').trim(),
      event_type: (req.body.event_type || '').trim(),
      budget_range: (req.body.budget_range || '').trim(),
      referral_source: (req.body.referral_source || '').trim(),
      verification_doc: req.file ? `/images/${req.file.filename}` : null,
    };

    if (!payload.name || !payload.email || !payload.phone) {
      return res.status(400).json({ error: 'Name, email, and phone are required' });
    }

    const application = await createApplication(payload);
    return res.status(201).json({ application });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
