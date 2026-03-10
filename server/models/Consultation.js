const { pool } = require('../db');

const createConsultation = async ({ client_id, designer_id, event_date, details, measurements, inspiration_image, preferred_time, urgent_deadline, payment_id, status = 'pending' }) => {
  const { rows } = await pool.query(
    `INSERT INTO consultations
    (client_id, designer_id, event_date, details, measurements, inspiration_image, preferred_time, urgent_deadline, payment_id, status)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    RETURNING *`,
    [client_id, designer_id, event_date, details, measurements, inspiration_image, preferred_time, urgent_deadline, payment_id, status]
  );
  return rows[0];
};

const listConsultations = async () => {
  const { rows } = await pool.query('SELECT * FROM consultations ORDER BY created_at DESC');
  return rows;
};

module.exports = { createConsultation, listConsultations };
