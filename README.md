# 📅 Booking Platform REST API

A RESTful Booking Platform built with **NestJS**, **TypeScript**, **Prisma ORM**, **PostgreSQL**, and **JWT Authentication**.

The application allows authenticated users to manage services while allowing customers to create bookings without authentication.

---

# 🚀 Features

- JWT Authentication
- User Registration
- User Login
- Service Management (CRUD)
- Booking Management
- PostgreSQL Database
- Prisma ORM
- Request Validation
- Secure Password Hashing with bcrypt

---

# 🛠 Tech Stack

- NestJS
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Passport.js
- bcrypt
- class-validator
- class-transformer

---

# 📁 Project Structure

```
src
│
├── auth
│
├── users
│
├── services
│
├── bookings
│
├── prisma
│
├── common
│
├── app.module.ts
└── main.ts

prisma
│
├── schema.prisma
└── migrations
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone <repository-url>
```

Move into the project

```bash
cd booking-platform
```

Install dependencies

```bash
npm install
```

---

# ⚙️ Environment Variables

Create a `.env` file.

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/booking_platform?schema=public"

JWT_SECRET="your-secret-key"

JWT_EXPIRES_IN="1d"

PORT=3000
```

---

# 🗄️ Database

Generate Prisma Client

```bash
npx prisma generate
```

Run Migration

```bash
npx prisma migrate dev --name init
```

Open Prisma Studio

```bash
npx prisma studio
```

---

# ▶️ Run Application

Development

```bash
npm run start:dev
```

Production

```bash
npm run build
npm run start:prod
```

---

# 🔐 Authentication APIs

## Register User

**POST**

```
/api/auth/register
```

Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

---

## Login

**POST**

```
/api/auth/login
```

Body

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

Returns

```json
{
  "access_token": "JWT_TOKEN"
}
```

---

# 👤 User API

## Get Profile

**GET**

```
/api/users/profile
```

Authentication Required

```
Authorization: Bearer <JWT_TOKEN>
```

---

# 🛠 Service APIs

## Create Service

**POST**

```
/api/services
```

Authentication Required

Body

```json
{
  "title": "Hair Cut",
  "description": "Professional haircut",
  "duration": 60,
  "price": 25,
  "isActive": true
}
```

---

## Get All Services

**GET**

```
/api/services
```

Public API

---

## Get Service By ID

**GET**

```
/api/services/:id
```

Public API

---

## Update Service

**PATCH**

```
/api/services/:id
```

Authentication Required

---

## Delete Service

**DELETE**

```
/api/services/:id
```

Authentication Required

---

# 📅 Booking APIs

## Create Booking

**POST**

```
/api/bookings
```

Public API

Body

```json
{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "0771234567",
  "serviceId": "SERVICE_ID",
  "bookingDate": "2026-07-20",
  "bookingTime": "10:00",
  "notes": "Morning appointment"
}
```

---

## Get All Bookings

**GET**

```
/api/bookings
```

Authentication Required

---

## Get Booking By ID

**GET**

```
/api/bookings/:id
```

Authentication Required

---

## Update Booking Status

**PATCH**

```
/api/bookings/:id/status
```

Authentication Required

Body

```json
{
  "status": "CONFIRMED"
}
```

Available Status

- PENDING
- CONFIRMED
- CANCELLED
- COMPLETED

---

## Cancel Booking

**DELETE**

```
/api/bookings/:id
```

Authentication Required

---

# 📋 Business Rules

- Customers can create bookings without authentication.
- Only authenticated users can manage services.
- A booking must belong to an existing service.
- Booking dates cannot be in the past.
- Cancelled bookings cannot be marked as completed.
- Passwords are securely hashed using bcrypt.
- JWT is required for all protected endpoints.

---

# 📦 Prisma Commands

Generate Client

```bash
npx prisma generate
```

Create Migration

```bash
npx prisma migrate dev --name init
```

Reset Database

```bash
npx prisma migrate reset
```

Open Prisma Studio

```bash
npx prisma studio
```

---

# 🔒 Authentication

Protected endpoints require:

```
Authorization: Bearer <JWT_TOKEN>
```

---

# 👨‍💻 Author

Developed using:

- NestJS
- Prisma ORM
- PostgreSQL
- TypeScript
- JWT Authentication

```

This README is suitable for a GitHub project submission and clearly documents the setup, APIs, and business rules for your assignment.
```