const { pool } = require('../db');

const listDesigners = async () => {
  const { rows } = await pool.query('SELECT * FROM designers ORDER BY created_at DESC');
  return rows;
};

const getDesignerById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM designers WHERE id = $1', [id]);
  return rows[0];
};

const createDesigner = async ({ name, tier, bio, consultation_fee, lead_time, profile_image, portfolio_images = [] }) => {
  const { rows } = await pool.query(
    `INSERT INTO designers (name, tier, bio, consultation_fee, lead_time, profile_image, portfolio_images)
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *`,
    [name, tier, bio, consultation_fee, lead_time, profile_image, JSON.stringify(portfolio_images)]
  );
  return rows[0];
};

module.exports = { listDesigners, getDesignerById, createDesigner };
