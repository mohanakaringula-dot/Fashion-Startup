const express = require('express');
const { authenticate, requireRole } = require('../middleware/auth');
const { listApplications, updateApplicationStatus } = require('../models/Application');
const { approveUser } = require('../models/User');
const { createDesigner, listDesigners } = require('../models/Designer');
const { listConsultations } = require('../models/Consultation');
const { pool } = require('../db');
const { generateFashionImage } = require('../services/geminiImageService');

const router = express.Router();
router.use(authenticate, requireRole('admin'));

router.get('/applications', async (_, res) => {
  res.json({ applications: await listApplications() });
});

router.patch('/applications/:id', async (req, res) => {
  const { status, user_id, approved } = req.body;
  const application = await updateApplicationStatus(req.params.id, status);
  if (user_id) {
    await approveUser(user_id, Boolean(approved));
  }
  res.json({ application });
});

router.post('/designers', async (req, res) => {
  const designer = await createDesigner(req.body);
  res.status(201).json({ designer });
});

router.get('/designers', async (_, res) => {
  res.json({ designers: await listDesigners() });
});

router.get('/consultations', async (_, res) => {
  res.json({ consultations: await listConsultations() });
});

router.get('/analytics', async (_, res) => {
  const [applications, approved, consultations, orders] = await Promise.all([
    pool.query('SELECT COUNT(*)::int AS count FROM applications'),
    pool.query("SELECT COUNT(*)::int AS count FROM applications WHERE status = 'approved'"),
    pool.query('SELECT COUNT(*)::int AS count FROM consultations'),
    pool.query('SELECT COUNT(*)::int AS count FROM orders'),
  ]);

  const appCount = applications.rows[0].count || 1;
  const approvalRate = (approved.rows[0].count / appCount) * 100;

  res.json({
    metrics: {
      application_approval_rate: Number(approvalRate.toFixed(2)),
      consultation_booking_rate: consultations.rows[0].count,
      consultation_conversion_rate: consultations.rows[0].count,
      average_order_value: 'TBD',
      designer_reliability: 'TBD',
      order_count: orders.rows[0].count,
    },
  });
});

router.post('/generate-image', async (req, res) => {
  const url = await generateFashionImage(req.body.prompt);
  res.json({ url });
});

module.exports = router;
