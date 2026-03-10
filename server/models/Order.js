const { pool } = require('../db');

const createOrder = async ({ client_id, designer_id, status = 'active', progress_stage, notes, image }) => {
  const { rows } = await pool.query(
    `INSERT INTO orders (client_id, designer_id, status, progress_stage, notes, image)
    VALUES ($1,$2,$3,$4,$5,$6)
    RETURNING *`,
    [client_id, designer_id, status, progress_stage, notes, image]
  );
  return rows[0];
};

const listOrdersByClient = async (client_id) => {
  const { rows } = await pool.query('SELECT * FROM orders WHERE client_id = $1 ORDER BY created_at DESC', [client_id]);
  return rows;
};

const updateOrder = async (id, { progress_stage, notes, image, status }) => {
  const { rows } = await pool.query(
    `UPDATE orders SET
      progress_stage = COALESCE($2, progress_stage),
      notes = COALESCE($3, notes),
      image = COALESCE($4, image),
      status = COALESCE($5, status)
     WHERE id = $1 RETURNING *`,
    [id, progress_stage, notes, image, status]
  );
  return rows[0];
};

module.exports = { createOrder, listOrdersByClient, updateOrder };
