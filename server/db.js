const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const initDb = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(120) UNIQUE NOT NULL,
      password TEXT NOT NULL,
      phone VARCHAR(30),
      role VARCHAR(20) NOT NULL DEFAULT 'client',
      approved BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS applications (
      id SERIAL PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(120) NOT NULL,
      phone VARCHAR(30) NOT NULL,
      profession VARCHAR(120),
      city VARCHAR(120),
      event_type VARCHAR(120),
      budget_range VARCHAR(120),
      referral_source VARCHAR(120),
      verification_doc TEXT,
      status VARCHAR(20) NOT NULL DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS designers (
      id SERIAL PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      tier VARCHAR(20) NOT NULL,
      bio TEXT,
      consultation_fee INTEGER NOT NULL,
      lead_time VARCHAR(80),
      profile_image TEXT,
      portfolio_images JSONB DEFAULT '[]'::jsonb,
      created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS consultations (
      id SERIAL PRIMARY KEY,
      client_id INTEGER REFERENCES users(id),
      designer_id INTEGER REFERENCES designers(id),
      event_date DATE,
      details TEXT,
      measurements TEXT,
      inspiration_image TEXT,
      preferred_time VARCHAR(50),
      urgent_deadline DATE,
      payment_id VARCHAR(120),
      status VARCHAR(20) NOT NULL DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      client_id INTEGER REFERENCES users(id),
      designer_id INTEGER REFERENCES designers(id),
      status VARCHAR(30) NOT NULL DEFAULT 'active',
      progress_stage VARCHAR(120),
      notes TEXT,
      image TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  const existing = await pool.query('SELECT COUNT(*)::int AS count FROM designers');
  if (existing.rows[0].count === 0) {
    await pool.query(`
      INSERT INTO designers (name, tier, bio, consultation_fee, lead_time, profile_image, portfolio_images)
      VALUES
      ('Aarav Atelier', 'signature', 'Signature couture with hand embroidery', 9500, '8-10 weeks', '/images/designer-1.jpg', '[]'::jsonb),
      ('Meera House', 'signature', 'Bridal and occasion couture', 10500, '10-12 weeks', '/images/designer-2.jpg', '[]'::jsonb),
      ('Ira Studio', 'established', 'Contemporary Indian occasion wear', 3500, '6-8 weeks', '/images/designer-3.jpg', '[]'::jsonb),
      ('Niva Label', 'established', 'Elegant festive silhouettes', 3000, '5-7 weeks', '/images/designer-4.jpg', '[]'::jsonb),
      ('Tara Edit', 'emerging', 'Modern fusion couture', 1200, '4-6 weeks', '/images/designer-5.jpg', '[]'::jsonb),
      ('Rhea Craft', 'emerging', 'Artisanal detail-driven occasion wear', 900, '4-5 weeks', '/images/designer-6.jpg', '[]'::jsonb)
    `);
  }
};

module.exports = { pool, initDb };
