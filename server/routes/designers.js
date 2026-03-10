const express = require('express');
const { listDesigners, getDesignerById } = require('../models/Designer');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  if (!req.user.approved && req.user.role === 'client') {
    return res.status(403).json({ error: 'Access pending admin approval' });
  }
  const designers = await listDesigners();
  return res.json({ designers });
});

router.get('/:id', authenticate, async (req, res) => {
  const designer = await getDesignerById(req.params.id);
  if (!designer) {
    return res.status(404).json({ error: 'Designer not found' });
  }
  return res.json({ designer });
});

module.exports = router;
