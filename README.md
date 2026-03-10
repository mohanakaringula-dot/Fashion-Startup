# Concierge Designer Access MVP

Luxury concierge platform for private access to curated Indian fashion designers.

## Run locally

1. Copy `.env.example` to `.env` and configure values.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start server:
   ```bash
   node server.js
   ```

## Core Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/apply`
- `GET /api/designers`
- `GET /api/designers/:id`
- `POST /api/consultations/payment-order`
- `POST /api/consultations`
- `GET /api/orders/my`
- `GET /api/admin/applications`
- `GET /api/admin/analytics`

## Notes

- Includes JWT auth and role guards.
- Uses PostgreSQL with automatic table initialization and seed data (6 designers).
- Razorpay service supports mock fallback when API keys are missing.
- Gemini image service writes generated artifacts to `public/images` for MVP flow.
