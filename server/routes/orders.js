const express = require('express');
const { authenticate, requireRole } = require('../middleware/auth');
const { createOrder, listOrdersByClient, updateOrder } = require('../models/Order');

const router = express.Router();

router.get('/my', authenticate, async (req, res) => {
  const orders = await listOrdersByClient(req.user.id);
  res.json({ orders });
});

router.post('/', authenticate, requireRole('admin', 'designer'), async (req, res) => {
  const order = await createOrder(req.body);
  res.status(201).json({ order });
});

router.patch('/:id', authenticate, requireRole('admin', 'designer'), async (req, res) => {
  const order = await updateOrder(req.params.id, req.body);
  res.json({ order });
});

module.exports = router;
