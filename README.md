# Evently-API

## A backend REST API for an event management and registration platform

Evently-API started as a hands-on deep dive into backend development fundamentals. Rather than building isolated examples, the goal was to design a complete, realistic:

- **Authentication Flows:** Secure user registration and login.
- **Protected Routes:** Middleware-driven access control for sensitive data.
- **Role-Based Access:** Clear distinction between Organizer and Attendee permissions.
- **Database Migrations:** Version-controlled schema management using PostgreSQL.
- **Centralized Error Handling:** A consistent, global approach to catching and returning API errors.

The result is a fully functional event management backend where organizers can create and manage events while attendees can discover and register for them.

## Tech Stack

| Layer                 | Technology                      | Purpose                                                                                                                                                 |
| --------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Runtime               | Node.js                         | JavaScript server-side execution environment                                                                                                            |
| Framework             | Express.js                      | HTTP server, routing, and middleware management                                                                                                         |
| Module System         | ES Modules (`type: "module"`)   | Native `import`/`export` syntax throughout the codebase                                                                                                 |
| Database              | PostgreSQL                      | Relational database for persisting users, events, and registrations                                                                                     |
| Migrations            | node-pg-migrate                 | Version-controlled, repeatable database schema management                                                                                               |
| Authentication        | jsonwebtoken (JWT)              | Stateless token-based auth — tokens are signed, sent to the client, and verified on every protected request                                             |
| Password Security     | bcryptjs                        | Passwords are salted and hashed before storage; never stored in plain text                                                                              |
| Environment Variables | dotenv                          | Managing sensitive credentials and configuration                                                                                                        |
| Error Handling        | Global Error Handler Middleware | A single centralized Express error-handling middleware catches all thrown errors across the app and returns consistent, structured JSON error responses |

## Features

- **Secure Registration & Login** — Users sign up with a role (`Attendee` or `Organizer`). Passwords are hashed with `bcryptjs` before being saved to the database. On sign-in, the password is compared against the stored hash, and a signed JWT is returned upon success.

- **JWT-Based Authentication** — Every protected route requires a valid `Authorization: Bearer <token>` header. A dedicated auth middleware verifies and decodes the token before the request reaches any controller.

- **Event Management (Organizers)** — Organizers can create new events, update or delete their own events, and view the list of registered attendees for any event they own.

- **Event Discovery & Registration (Attendees)** — Attendees can browse all available events, filter for upcoming ones, view detailed event information, and register for events.

- **Global Error Handler Middleware** — Instead of handling errors individually in each controller, all errors are forwarded to a single Express error-handling middleware using `next(error)`. This middleware formats every error into a consistent JSON response with a status code and message, making debugging easier and the API response structure predictable for clients.

- **Database Migrations** — Schema changes are managed through versioned migration files using `node-pg-migrate`. Migrations can be applied (`up`) or rolled back (`down`), ensuring the database schema is always in a known, reproducible state across environments.

## User Roles

### Attendee

An attendee is a regular platform user whose primary goal is to discover and register for events. After signing in, they receive a JWT that grants access to attendee-only routes. They can browse all events, filter by upcoming dates, view full event details and register their spot at any event.

### Organizer

An organizer is a privileged user responsible for creating and managing events on the platform. Their JWT grants access to organizer-only routes. They can create new events with full details, update or delete events they own, and pull a list of all attendees registered for any of their events.

> Roles are set at registration and cannot be changed via the API. Any attempt to access a route outside of your role returns `403 Forbidden`.

---

## API Routes

### Auth Routes — Public

These routes are open to everyone and do not require a JWT.

| Method | Endpoint        | Description                                                                                                                                                                   |
| ------ | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/auth/sign-up` | Register a new user. Accepts a `role` field (`attendee` or `organizer`). The password is hashed with `bcryptjs` before being stored. Returns a success message on completion. |
| `POST` | `/auth/sign-in` | Authenticate an existing user. Validates credentials against the stored hash. Returns a signed JWT on success, which must be included in all subsequent protected requests.   |

---

### Attendee Routes — Protected (JWT Required)

| Method | Endpoint                    | Description                                                           |
| ------ | --------------------------- | --------------------------------------------------------------------- |
| `GET`  | `/events`                   | Returns all events the authenticated attendee has registered for.     |
| `GET`  | `/events/current-register`  | Returns all the events that the user is currently logged into.        |
| `GET`  | `/events/upcoming`          | Returns all events with a future date that are open for registration. |
| `GET`  | `/events/:eventId`          | Returns the full details of a single event by its ID.                 |
| `POST` | `/events/:eventId/register` | Registers the authenticated attendee for the specified event.         |

---

### Organizer Routes — Protected (JWT Required)

All routes in this group require a valid JWT. The role guard ensures only users with the `organizer` role can access them.

| Method   | Endpoint                     | Description                                                                                                                                     |
| -------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST`   | `/events`                    | Creates a new event under the authenticated organizer's account. Accepts event details such as title, max capacity, date happens, and location. |
| `PUT`    | `/events/:eventId`           | Updates the details of an existing event. Only the organizer who owns the event can modify it.                                                  |
| `DELETE` | `/events/:eventId`           | Permanently deletes an event. Only the organizer who owns the event can delete it.                                                              |
| `GET`    | `/events/:eventId/attendees` | Returns the full list of attendees registered for a specific event owned by the authenticated organizer.                                        |

---

## Getting Started

### Prerequisites

Make sure the following are installed on your machine before proceeding:

- [Node.js](https://nodejs.org/) v20 or higher
- [PostgreSQL](https://www.postgresql.org/) v14 or higher
- `npm` (comes bundled with Node.js)

---

### Installation

**1. Clone the repository:**

```bash
git clone https://github.com/karraraljawasim/evently-api.git
cd evently-api
```

**2. Install all dependencies:**

```bash
npm install
```

---

### Environment Variables

The project requires two environment files in the root directory:

- **`.env.production.local`** — Stores local-only overrides for sensitive variables used when running your app in a simulated production environment.

- **`.env.development.local`** — Stores local-only overrides for variables used during active development.

Create both files and fill in the values below:

```.env.development.local
# Server Configuration
PORT=8080
NODE_ENV="development"

# Database Configuration
DB_USER=postgres
DB_PASSWORD=[your_postgres_password]
DB_HOST=localhost
DB_PORT=5432
DB_NAME=evently_api_db

# Full Database Connection String
DATABASE_URL=postgresql://[user]:[password]@localhost:5432/evently_api_db

# JWT Configuration
JWT_SECRET="[a_long_random_secret_string]"
JWT_EXPIRES_IN="4d"
```

**Tips:**

- `JWT_EXPIRES_IN` controls how long a token remains valid. `"4d"` means tokens expire after 4 days.
- Never commit `.env.development.local` or `.env.production.local` to version control. Add them to `.gitignore`.

---

### Database Setup & Migrations

**Step 1 — Create the database:**

```bash
psql -U postgres -c 'CREATE DATABASE \"evently_api_db\";'
```
**Or Create the datebase by using a visual tool like pgAdmin**



**Step 2 — Apply all migrations to build the schema:**

```bash
npm run migrate up
```

**To roll back the most recent migration:**

```bash
npm run migrate down
```

**To scaffold a new migration file:**

```bash
npm run migrate:create -- your-migration-name
```

> Migration files are created in the `migrations/` directory as ESM-compatible modules.

---

### Running the Server

**Development mode** — starts the server with `nodemon` for automatic restarts on file changes:

```bash
npm run start:dev
```

**Production mode** — starts the server with `nodemon` for automatic restarts on file changes:

```bash
npm run start:pro
```

The API will be available at `http://localhost:8080` (or whatever `PORT` is set to in your `.env.development.local`).

---

## Scripts Reference

| Script                   | Command                                                 | Description                          |
| ------------------------ | ------------------------------------------------------- | ------------------------------------ |
| `npm start`              | `node app.js`                                           | Start the server with node           |
| `start:pro`              | `cross-env NODE_ENV=production nodemon server.js`       | Start the server in production mode  |
| `start:dev`              | `cross-env NODE_ENV=development nodemon server.js`      | Start the server in development mode |
| `npm run migrate up`     | `node-pg-migrate up --envPath .env.development.local`   | Apply all pending migrations         |
| `npm run migrate down`   | `node-pg-migrate down --envPath .env.development.local` | Roll back the last applied migration |
| `npm run migrate:create` | `node-pg-migrate create --module-type esm`              | Generate a new ESM migration file    |

---

## Project Structure

```
evently-api/
├── config/
│   └── env.js                          # Loads and validates environment variables
├── controllers/
│   ├── attendee.controller.js          # Attendee business logic (browse, search, register)
│   ├── auth.controller.js              # Auth logic (signup, signin, password hashing)
│   └── organizer.controller.js         # Organizer business logic (create, update, delete)
├── database/
│   └── db.js                           # PostgreSQL connection pool
├── middlewares/
│   ├── auth.middleware.js              # JWT verification for protected routes
│   └── errorHandler.middleware.js      # Global error handler — formats all errors to JSON
├── migrations/                         # node-pg-migrate versioned schema files
├── models/
│   ├── attendee.models.js              # DB queries for attendee operations
│   ├── auth.models.js                  # DB queries for user registration and login
│   └── organizer.models.js             # DB queries for organizer operations
├── routes/
│   ├── attendee.routes.js              # GET /events, POST /register, GET /search
│   ├── auth.routes.js                  # POST /signup, POST /signin
│   └── organizer.routes.js             # POST, PUT, DELETE /events, GET /attendees
├── utils/
│   └── AppError.js                     # Custom error class with statusCode and message
├── .env.development.local              # Local dev environment variables (not committed)
├── .env.production.local               # Production environment variables (not committed)
├── app.js                              # Entry point — Express setup, routes, error handler
├── eslint.config.mjs                   # ESLint flat config for JS code quality
└── package.json                        # Dependencies and npm scripts
```
