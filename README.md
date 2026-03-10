```markdown
# Concierge Designer Access Platform

Private access to premium Indian fashion designers through an application-based concierge platform.

This is **NOT an ecommerce marketplace**.

Users must:

1. Apply for access
2. Get approved by admin
3. Browse curated designers
4. Pay for private consultations
5. Track bespoke fashion orders

The platform is designed to feel like a **luxury concierge service** rather than a retail site.

---

# Tech Stack

Backend
- Node.js
- Express.js

Frontend
- HTML
- CSS
- Vanilla JavaScript

Database
- PostgreSQL

Authentication
- JWT

Payments
- Razorpay

AI Image Generation
- Google Gemini API
- Model: `gemini-3.1-flash-image-preview`

Deployment
- Node server / Vercel

---

# Project Structure

```

project-root

/server
server.js
db.js

/routes
apply.js
auth.js
designers.js
consultations.js
orders.js
admin.js

/models
User.js
Application.js
Designer.js
Consultation.js
Order.js

/services
geminiImageService.js
paymentService.js

/public
index.html
apply.html
dashboard.html
designers.html
designer-profile.html
consultation.html
order.html

/public/css
styles.css

/public/js
app.js

/public/images

```

---

# Database Schema

## Users

| Field | Type |
|-----|-----|
| id | uuid |
| name | string |
| email | string |
| password | string |
| phone | string |
| role | enum |
| approved | boolean |
| created_at | timestamp |

Roles:

- client
- designer
- admin

---

## Applications

| Field | Type |
|-----|-----|
| id | uuid |
| name | string |
| email | string |
| phone | string |
| profession | string |
| city | string |
| event_type | string |
| budget_range | string |
| verification_doc | string |
| status | enum |
| created_at | timestamp |

Status values:

- pending
- approved
- rejected

---

## Designers

| Field | Type |
|-----|-----|
| id | uuid |
| name | string |
| tier | enum |
| bio | text |
| consultation_fee | number |
| lead_time | string |
| portfolio_images | json |
| created_at | timestamp |

Designer tiers:

- Signature
- Established
- Emerging

Consultation fee ranges:

| Tier | Fee |
|-----|-----|
| Signature | ₹7,500 – ₹12,000 |
| Established | ₹2,500 – ₹4,000 |
| Emerging | ₹750 – ₹1,500 |

---

## Consultations

| Field | Type |
|-----|-----|
| id | uuid |
| client_id | uuid |
| designer_id | uuid |
| event_date | date |
| details | text |
| inspiration_image | string |
| preferred_time | string |
| payment_id | string |
| status | enum |
| created_at | timestamp |

Status:

- pending
- confirmed
- completed
- cancelled

---

## Orders

| Field | Type |
|-----|-----|
| id | uuid |
| client_id | uuid |
| designer_id | uuid |
| status | string |
| progress_stage | string |
| notes | text |
| image | string |
| created_at | timestamp |

---

# Design System

Color Palette

Jet Black — `#0B0B0B`  
Ivory — `#F7F5F2`  
Soft Beige — `#EAE7E1`  
Warm Taupe — `#7A6E5A`  
Signature Gold — `#C59D5F`  
Charcoal — `#222222`

Typography

Headings: **Playfair Display**  
Body: **Inter**

Layout

- Max width: 1200px
- Generous whitespace
- Editorial photography
- Luxury minimal aesthetic

Button Style

```

border:1px solid #C59D5F
text-transform:uppercase
letter-spacing:.12em
transition:.18s ease
hover transform:scale(1.02)

```

---

# Landing Page

Route

```

/

```

Hero text

```

Private access to India's most refined designers.

```

Primary CTA

```

Apply for Access

```

Sections

1. Hero
2. How It Works
3. Designer Preview
4. Application CTA

---

# Application Flow

Route

```

/apply

```

Fields

- Full name
- Email
- Phone
- Profession
- City
- Event type
- Budget range
- Referral source
- Verification document upload

API

```

POST /api/apply

```

---

# Designer Access

Route

```

/designers

```

Only visible to **approved users**.

Display

- Designer image
- Designer name
- Lead time
- Consultation fee
- Request consultation button

---

# Consultation Booking

Route

```

/consultation/:designerId

```

Fields

- Event date
- Occasion details
- Measurements
- Inspiration images
- Preferred time
- Urgent deadline

API

```

POST /api/consultations

```

Payment

- Razorpay integration

Email confirmation

```

Consultation confirmed — [Designer Name]

```

---

# Client Dashboard

Route

```

/dashboard

```

Tracks order progress.

Stages

1. Brief confirmed
2. Measurements received
3. Fabric sourcing
4. Embroidery in progress
5. Stitching
6. Trial scheduled
7. Alterations
8. Final QC
9. Dispatched

Each stage includes

- timestamp
- notes
- progress image

---

# Designer Dashboard

Route

```

/designer/dashboard

```

Capabilities

- View consultation requests
- Accept consultations
- Upload progress images
- Update order stages

---

# Admin Panel

Route

```

/admin

```

Admin capabilities

- Review applications
- Approve or reject users
- Manage designers
- View consultations
- Track orders
- View analytics

---

# Gemini Image Generation

File

```

services/geminiImageService.js

```

Model

```

gemini-3.1-flash-image-preview

```

Purpose

Generate editorial fashion images for designer portfolios.

Example prompt

```

luxury indian couture lehenga editorial photoshoot neutral background soft lighting fashion editorial

```

---

# Security

- JWT authentication
- HTTPS
- File upload validation
- Input sanitization
- Secure storage for verification documents

---

# MVP Launch Scope

Initial launch includes

- 6 designers
- Manual admin approval
- Consultation payments
- Basic order tracking

Not included in MVP

- Public reviews
- Product catalog
- Direct ecommerce purchases

Orders are finalized **after consultation**.

---

# Running the Project

Install dependencies

```

npm install

```

Start server

```

node server.js

```

Open in browser

```

[http://localhost:3000](http://localhost:3000)

```

---

# Vision

This platform aims to replicate a **private luxury concierge experience** for accessing India's best fashion designers.



So the repo becomes **a fully working startup project immediately** instead of just documentation.
