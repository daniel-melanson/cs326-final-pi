# Team &Pi;: Campus Meet - Setup

## Application Structure

- The frontend and the backend are decoupled
- The source code of the frontend is in `frontend/`, and backend in `backend/`
- `frontend/`
  - node.js package that is bundled by `parcel` into a `dist` folder
  - SPA
  - Client side routing
- `backend/`
  - node.js package build using TypeScript into a `dist` folder
  - Statically serves the bundled client files on `/`
  - Hosts a RESTful API endpoints on the `/api` path on the authority

### Setup

1. Build the client static pages

- `npm install`
- `npm run build:prod`

1. Provide environment variables for backend

- `cd backend && cp .env.example .env`
- Provide a connection string to a PostgreSQL server

1. Migrate schemas to the PSQL server

- `npm install`
- `npx prisma db push`

1. Build and Run server

- `npm run start`
