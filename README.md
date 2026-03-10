# Next.js Authentication System

A production-grade authentication backend built with **Next.js App Router**, **Sequelize**, **JWT**, and **MySQL** — featuring refresh tokens, token versioning, role hierarchy, and secure super admin bootstrapping.

---

## Overview

-> JWT auth
-> refresh tokens
-> RBAC hierarchy
-> faculty role
-> profile CRUD
-> admin user management
-> soft delete
-> audit logs
-> Redis rate limiting
-> super admin bootstrap

This project is a modular, secure, and scalable authentication system built using **Next.js (App Router)** as a backend API layer.

It follows real-world backend architecture principles:

- Layered structure (**Controller → Service → Repository**)
- JWT Access + Refresh Token flow
- Role-Based Access Control (RBAC)
- Hierarchical role enforcement
- Secure refresh token hashing
- Token version invalidation
- Automatic SUPER_ADMIN initialization

---

## Key Features

### Authentication

- JWT-based access tokens
- Refresh token stored as HTTP-only cookie
- Hashed refresh token storage in DB
- Token versioning for session invalidation
- Logout invalidates previous access tokens

---

### Role-Based Access Control (RBAC)

- `SUPER_ADMIN`
- `ADMIN`
- `USER`

**Role hierarchy enforcement:**

- SUPER_ADMIN can create any role
- ADMIN cannot create SUPER_ADMIN
- Public users cannot self-assign elevated roles
- Strict role enforcement (no silent downgrading)

---

### Architecture

- Modular folder structure
- Clean separation of concerns
- Zod validation
- Custom error handling
- Sequelize ORM with MySQL
- Super admin auto-bootstrap on first run

---

## Tech Stack

| Layer       | Technology |
|------------|------------|
| Framework  | Next.js 16 (App Router) |
| Runtime    | Node.js |
| ORM        | Sequelize |
| Database   | MySQL |
| Auth       | JWT |
| Validation | Zod |
| Hashing    | bcryptjs |

### Core Dependencies

```
bcryptjs
dotenv
jsonwebtoken
mysql2
sequelize
zod
uuid
```

---

## Project Structure

```
src
├── app/api                → API routes (App Router)
├── controllers            → Request handling logic
├── services               → Business logic
├── repositories           → DB interaction layer
├── middleware             → Auth & RBAC middleware
├── models                 → Sequelize models
├── validations            → Zod schemas
├── config                 → DB & environment config
├── constants              → Roles & messages
├── utils                  → JWT utilities
├── initDb.js              → DB bootstrap
└── initSuperAdmin.js      → Super admin initialization
```

---

## Authentication Flow

### Login

1. Validate credentials  
2. Generate access + refresh token  
3. Hash and store refresh token in DB  
4. Send access token in response  
5. Send refresh token as HTTP-only cookie  

---

### Refresh

1. Read refresh token from cookie  
2. Verify JWT signature  
3. Compare hashed refresh token in DB  
4. Generate new access token  

---

### Logout

1. Clear refresh token  
2. Increment `tokenVersion`  
3. Invalidate all previous access tokens  

---

## Super Admin Bootstrap

On first server start:

- Checks if `SUPER_ADMIN_EMAIL` exists  
- If not, creates super admin using environment credentials  
- No manual DB setup required  

---

## Role Hierarchy

```
SUPER_ADMIN → level 3
ADMIN       → level 2
USER        → level 1
```

A user cannot create another user with a higher role than themselves.  
Unauthorized attempts return **403 Forbidden**.

---

## Running the Project

### Install dependencies

```
npm install
```

---

### Configure `.env.local`

```
DB_NAME=your_db
DB_USER=root
DB_PASS=your_password
DB_HOST=localhost

JWT_ACCESS_SECRET=your_secret
JWT_REFRESH_SECRET=your_refresh_secret

SUPER_ADMIN_EMAIL=superadmin@example.com
SUPER_ADMIN_PASSWORD=SuperSecurePassword
```

---

### Start development server

```
npm run dev
```

Server runs at:

```
http://localhost:3000
```

---

## Available API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/auth/register` | Register user |
| POST   | `/api/auth/login`    | Login |
| POST   | `/api/auth/refresh`  | Refresh access token |
| POST   | `/api/auth/logout`   | Logout |
| GET    | `/api/users`         | Protected route |

---

## Future Improvements

- Refresh token rotation
- Device-based session tracking
- Redis token blacklist
- Password reset flow
- Email verification
- Migration-based DB management
- Docker deployment

---

## Author

**Sairaj**  
Backend Engineering & System Design
