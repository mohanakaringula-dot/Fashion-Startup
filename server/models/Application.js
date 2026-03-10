const { pool } = require('../db');

const createApplication = async (payload) => {
  const fields = [
    payload.name,
    payload.email,
    payload.phone,
    payload.profession,
    payload.city,
    payload.event_type,
    payload.budget_range,
    payload.referral_source,
    payload.verification_doc,
  ];

  const { rows } = await pool.query(
    `INSERT INTO applications
    (name, email, phone, profession, city, event_type, budget_range, referral_source, verification_doc)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    RETURNING *`,
    fields
  );
  return rows[0];
};

const listApplications = async () => {
  const { rows } = await pool.query('SELECT * FROM applications ORDER BY created_at DESC');
  return rows;
};

const updateApplicationStatus = async (id, status) => {
  const { rows } = await pool.query('UPDATE applications SET status = $2 WHERE id = $1 RETURNING *', [id, status]);
  return rows[0];
};

module.exports = { createApplication, listApplications, updateApplicationStatus };
