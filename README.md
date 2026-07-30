# Evently-API

## A backend REST API for an event management and registration platform

Evently is a backend REST API I built to manage event creation and attendee registrations. I designed it with a focus on data integrity, and clear user boundaries



## Features

- User authentication with JWT and role-based access (Attendee and Organizer).

- Secure password hashing using bcryptjs.

- Organizers can create, update, delete, and manage their own events.

- Attendees can browse events, view details, and register for upcoming events.

- Database schema managed with versioned migrations using node-pg-migrate.



## User Roles

### Attendee

An attendee is a regular platform user whose primary goal is to discover and register for events. After signing in, they receive a JWT that grants access to attendee-only routes. They can browse all events, filter by upcoming dates, view full event details and register their spot at any event.

### Organizer

An organizer is a privileged user responsible for creating and managing events on the platform. Their JWT grants access to organizer-only routes. They can create new events with full details, update or delete events they own, and pull a list of all attendees registered for any of their events.


---

## Getting Started

### Prerequisites

Make sure the following are installed on your machine before proceeding:

- [Node.js](https://nodejs.org/) v20 or higher
- [PostgreSQL](https://www.postgresql.org/) v16 or higher

---

### Installation

**1. Clone the repository:**

```bash
git clone https://github.com/karraraljawasim/evently-backend.git
cd evently-backend
```

**2. Install all dependencies:**

```bash
npm install
```

---

### Environment Variables

The project requires two environment files in the root directory:

- **`.env`** 


Create both files and fill in the values below:

```.env
# Server Configuration
PORT=8080

# Database Configuration
DB_USER=postgres
DB_PASSWORD=[your_postgres_password]
DB_HOST=localhost
DB_PORT=5432
DB_NAME=evently_api_db

# Full Database Connection String
DATABASE_URL=postgresql://[user]:[password]@localhost:5432/evently_api_db

# JWT Configuration
JWT_SECRET="But_Your_JWT_SECRET_Her"
JWT_EXPIRES_IN="Your_JWT_EXPIERS"
```


### Database Setup & Migrations

**Step 1 — Create the database:**

```bash
psql -U postgres -c 'CREATE DATABASE \"evently\";'
```

**Or Create the database by using a visual tool like pgAdmin**

**Step 2 — Apply all migrations to build the schema:**

```bash
npm run migrate up
```

### Running the Server

**Development mode**

```bash
npm run dev
```

The API will be available at `http://localhost:8080` (or whatever `PORT` is set to in your `.env`).


## API Documentation

The API is fully documented and interactive using Swagger. You can view request schemas, required fields, and test the endpoints directly from your browser.
* PORT = 8080 or what you PORT set in .env
* **Local Access:** Start the backend server and navigate to `http://localhost:8080/api-docs` 

---
## Project Structure

```
evently-api/
├── config/
│   └── env.js                          
├── controllers/
│   ├── attendee.controller.js         
│   ├── auth.controller.js              
│   └── organizer.controller.js         
├── database/
│   └── db.js                           
├── middlewares/
│   ├── auth.middleware.js              
│   └── errorHandler.middleware.js      
├── migrations/                        
├── models/
│   ├── attendee.models.js              
│   ├── auth.models.js                  
│   └── organizer.models.js            
├── routes/
│   ├── attendee.routes.js             
│   ├── auth.routes.js                  
│   └── organizer.routes.js            
├── utils/
│   └── AppError.js                     
├── .env.development.local              
├── .env.production.local               
├── app.js                             
├── eslint.config.mjs                   
├── package.json  
└── swagger.js                 
```
