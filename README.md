# Next.js Authentication & Role-Based User Management API

A production-style authentication and user management backend built using **Next.js App Router**, **Sequelize**, **JWT**, and **MySQL**.

This system provides secure authentication with **refresh tokens**, **role-based access control**, and **hierarchical admin management**.

The backend is fully deployed on Railway using Dockerized MySQL and tested using API clients.

---

## Live Deployment

Backend API deployed on Railway:

```
https://authentication-production-a3da.up.railway.app
```

---

## Architecture

The backend follows a layered architecture used in production Node.js systems:

```
Route → Controller → Service → Repository → Database
```

Directory structure:

```
src
│
├── app/api                 → API routes (Next.js App Router)
│   ├── auth                → authentication endpoints
│   ├── users               → profile management
│   └── admin/users         → admin user management
│
├── controllers             → request handling logic
├── services                → business logic
├── repositories            → database interaction
├── models                  → Sequelize models
├── middleware              → authentication & authorization
├── validations             → Zod validation schemas
├── utils                   → JWT + helpers
├── constants               → roles & messages
├── config                  → DB config
└── init scripts            → DB initialization + superadmin bootstrap
```

---

## Features

### Authentication

- User registration
- User login
- Refresh token system
- Logout
- JWT access tokens
- Hashed refresh tokens
- Token version invalidation
- User Profiles Management
- Redis Rate Limiting

### Role-Based Access Control (RBAC)

Supported roles: (Mutable)

```
SUPER_ADMIN
ADMIN
FACULTY
USER
```

Hierarchy:

```
SUPER_ADMIN > ADMIN > FACULTY > USER
```

Rules:

- `SUPER_ADMIN` can create any user
- `ADMIN` cannot create `SUPER_ADMIN`
- Public registration can only create `USER`
- Admin routes are protected by role authorization middleware

### Profile Management

Users can manage their own profile. Supported fields:

```
name
bio
contact
```

The API uses `PATCH` instead of `PUT` for partial updates.

### Admin User Management

Admins can:

- List all users
- Get a user by ID
- Update user roles
- Delete users

### Validation

Implemented using **Zod**:

- Email validation
- Password length validation
- Indian mobile number validation (`^[6-9]\d{9}$`)

### Security Features

- `bcrypt` password hashing
- Hashed refresh tokens
- HTTP-only cookies
- Token version invalidation
- Protected routes middleware
- Role authorization middleware

---

## Database

- **Database:** MySQL
- **ORM:** Sequelize

User model fields:

```
id
name
bio
contact
email
password
role
refreshToken
tokenVersion
createdAt
updatedAt
deletedAt
```

---

## Automatic Initialization

On first startup, the following run automatically:

```
initDb()
initSuperAdmin()
```

This creates:

- Database tables
- A `SUPER_ADMIN` user from environment variables

---

## Environment Variables

```env
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=

JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=

SUPER_ADMIN_EMAIL=
SUPER_ADMIN_PASSWORD=
SUPER_ADMIN_NAME=
SUPER_ADMIN_CONTACT=

ALLOWED_ORIGINS=

UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

---

## API Endpoints

### Authentication

#### Register

```
POST /api/auth/register
```

Request body:

```json
{
  "email": "user@email.com",
  "password": "password123",
  "contact": "9876543210",
  "name": "User"
}
```

#### Login

```
POST /api/auth/login
```

Request body:

```json
{
  "email": "user@email.com",
  "password": "password123"
}
```

Returns: `accessToken` and `refreshToken` cookie.

#### Refresh Token

```
POST /api/auth/refresh

(Along with refresh token in cookie)
```

#### Logout

```
POST /api/auth/logout
```

Invalidates the refresh token.

---

### Profile Routes

#### Get Profile

```
GET /api/users
```

Requires authorization.

#### Update Profile

```
PATCH /api/users
```

Request body:

```json
{
  "bio": "This is my updated bio"
}
```

---

### Admin Routes

#### Get All Users

```
GET /api/admin/users
```

Required role: `ADMIN` or `SUPER_ADMIN`

#### Get User by ID

```
GET /api/admin/users/:id
```

#### Update User

```
PATCH /api/admin/users/:id
```

Request body:

```json
{
  "role": "FACULTY"
}
```

#### Delete User

```
DELETE /api/admin/users/:id
```

---

## Deployment

Backend deployed on **Railway**.

Components:

- Next.js API server
- MySQL Docker container

Deployment flow:

```
GitHub → Railway build → Docker container → live API
```

---

## Tech Stack

- Next.js (App Router)
- Node.js
- Sequelize ORM
- MySQL
- JWT Authentication
- bcrypt
- Zod
- Railway
- Docker

---

## Future Improvements

- Redis Caching
- Refresh token rotation
- Redis session store
- Email verification
- Password reset
- API pagination

---

## Author

Sairaj Raithatha

Built as a production-style authentication backend demonstrating secure authentication, RBAC, modular backend architecture, and cloud deployment.