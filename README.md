# Next.js Authentication & Role-Based User Management

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

<img width="1352" height="683" alt="Screenshot 2026-03-11 170456" src="https://github.com/user-attachments/assets/cb83a663-f0c5-4127-8cd1-5481a6e9b23e" />


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
<img width="1460" height="748" alt="Screenshot 2026-03-11 170737" src="https://github.com/user-attachments/assets/7ec73a72-4df7-4694-a61f-6ee87d3e9dae" />

#### Refresh Token

```
POST /api/auth/refresh

(Along with refresh token in cookie)
```
<img width="1822" height="858" alt="Screenshot 2026-03-11 175510" src="https://github.com/user-attachments/assets/7b2d8e56-92c9-436b-8b5b-fa88766702f8" />

#### Logout

```
POST /api/auth/logout
```

Invalidates the refresh token.
<img width="1392" height="700" alt="Screenshot 2026-03-11 175551" src="https://github.com/user-attachments/assets/559e5158-27b8-4c4b-a628-d71d88fae4b6" />

---

### Profile Routes

#### Get Profile

```
GET /api/users
```

Requires authorization.

<img width="1432" height="776" alt="Screenshot 2026-03-11 171505" src="https://github.com/user-attachments/assets/e801f746-efe9-4def-b74f-fcfe6965fd32" />

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
<img width="1442" height="789" alt="Screenshot 2026-03-11 171444" src="https://github.com/user-attachments/assets/e77b21f4-d932-4069-99d8-dc3b5e106c9c" />


---

### Admin Routes

#### Get All Users

```
GET /api/admin/users
```

Required role: `ADMIN` or `SUPER_ADMIN`

<img width="1456" height="781" alt="Screenshot 2026-03-11 171014" src="https://github.com/user-attachments/assets/21be32dc-b5a5-4d42-8f71-50375c724155" />

#### Get User by ID

```
GET /api/admin/users/:id
```
<img width="1440" height="774" alt="image" src="https://github.com/user-attachments/assets/a132f2bc-be0b-48af-a479-898a44d1be28" />

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
<img width="1465" height="786" alt="Screenshot 2026-03-11 171159" src="https://github.com/user-attachments/assets/3d21008b-22ee-46b0-9c07-53617d2a1e5c" />

#### Delete User

```
DELETE /api/admin/users/:id
```
<img width="1454" height="548" alt="Screenshot 2026-03-11 171241" src="https://github.com/user-attachments/assets/27faa3aa-6d0e-4a8f-a064-3a42300ff5f9" />

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
