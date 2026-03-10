const { pool } = require('../db');

const createUser = async ({ name, email, password, phone, role = 'client', approved = false }) => {
  const { rows } = await pool.query(
    `INSERT INTO users (name, email, password, phone, role, approved)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, name, email, phone, role, approved, created_at`,
    [name, email, password, phone, role, approved]
  );
  return rows[0];
};

const findUserByEmail = async (email) => {
  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return rows[0];
};

const approveUser = async (id, approved) => {
  const { rows } = await pool.query('UPDATE users SET approved = $2 WHERE id = $1 RETURNING *', [id, approved]);
  return rows[0];
};

module.exports = { createUser, findUserByEmail, approveUser };
