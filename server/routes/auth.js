const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/User');

const router = express.Router();

const safe = (value = '') => String(value).trim();

router.post('/register', async (req, res) => {
  try {
    const name = safe(req.body.name);
    const email = safe(req.body.email).toLowerCase();
    const phone = safe(req.body.phone);
    const password = safe(req.body.password);

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' });
    }

    const existing = await findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await createUser({ name, email, phone, password: hash, role: 'client', approved: false });
    return res.status(201).json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const email = safe(req.body.email).toLowerCase();
    const password = safe(req.body.password);

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, approved: user.approved },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({ token, user: { id: user.id, name: user.name, role: user.role, approved: user.approved } });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
