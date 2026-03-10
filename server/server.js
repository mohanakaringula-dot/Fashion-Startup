require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { initDb } = require('./db');

const authRoutes = require('./routes/auth');
const applyRoutes = require('./routes/apply');
const designerRoutes = require('./routes/designers');
const consultationRoutes = require('./routes/consultations');
const orderRoutes = require('./routes/orders');
const adminRoutes = require('./routes/admin');

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/api',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
  })
);

app.use('/uploads', express.static(path.join(__dirname, '..', 'public', 'images')));
app.use('/api/auth', authRoutes);
app.use('/api/apply', applyRoutes);
app.use('/api/designers', designerRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

app.use(express.static(path.join(__dirname, '..', 'public')));

const pageMap = {
  '/': 'index.html',
  '/apply': 'apply.html',
  '/dashboard': 'dashboard.html',
  '/designers': 'designers.html',
  '/designer-profile': 'designer-profile.html',
  '/consultation': 'consultation.html',
  '/order': 'order.html',
  '/admin': 'admin.html',
  '/designer/dashboard': 'designer-dashboard.html',
};

Object.entries(pageMap).forEach(([route, file]) => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', file));
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('DB init failed:', error.message);
    process.exit(1);
  });
