# CampusCodex

CampusCodex is a full-stack student notes platform for browsing, uploading, saving, and searching study notes. The project includes a React + Vite frontend and an Express + MongoDB backend API with authentication, user profile support, and file uploads.

## Project Structure

- `Frontend/` contains the React app, pages, reusable components, API helpers, and static assets.
- `Backend/` contains the Express server, MongoDB models, API routes, controllers, auth middleware, and upload handling.

## Features

- Responsive notes listing with search
- Add notes with thumbnail and PDF upload
- Login and registration pages
- Dashboard for saved notes
- Contact form powered by EmailJS
- Shared loading spinner for async page states
- REST API for notes, auth, saved notes, and profile updates
- JWT cookie authentication for protected user actions
- MongoDB storage for users and notes metadata
- Supabase Storage integration for uploaded thumbnails and PDFs

## Tech Stack

### Frontend

- React 19
- Vite
- Tailwind CSS
- Axios
- React Router
- React Hot Toast
- Lucide React icons
- EmailJS

### Backend

- Node.js
- Express
- MongoDB + Mongoose
- JWT authentication
- bcrypt password hashing
- Multer file upload handling
- Supabase Storage
- Cookie Parser
- CORS

## Setup

Install frontend dependencies:

```bash
cd Frontend
npm install
```

Install backend dependencies:

```bash
cd Backend
npm install
```

Create `.env` in the `Frontend` folder:

```env
VITE_API_URL=http://localhost:3000/api
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Create `src/.env` in the `Backend` folder:

```env
PORT=3000
CLIENT_URL=http://localhost:5173
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

Start the backend API:

```bash
cd Backend
npm run dev
```

Start the frontend dev server:

```bash
cd Frontend
npm run dev
```

For phone testing on the same Wi-Fi, run Vite with a network host and open the shown network URL:

```bash
cd Frontend
npm run dev -- --host 0.0.0.0
```

The notes page can automatically swap a localhost API URL to the current LAN hostname when opened from another device.

## Scripts

Run these from `Frontend/`:

- `npm run dev` starts the Vite dev server
- `npm run build` creates a production frontend build
- `npm run lint` runs ESLint
- `npm run preview` previews the production frontend build

Run these from `Backend/`:

- `npm run dev` starts the backend with nodemon
- `npm start` starts the backend with Node
- `npm test` runs the placeholder backend test script

## API Overview

- `POST /api/auth/register` creates a user account
- `POST /api/auth/login` logs in and sets the auth cookie
- `POST /api/auth/logout` clears the auth cookie
- `GET /api/auth/me` checks auth state
- `GET /api/notes` returns notes
- `GET /api/notes/search` searches notes by title
- `POST /api/notes` uploads a note with thumbnail and PDF
- `POST /api/notes/save/:id` saves or removes a note for the logged-in user
- `GET /api/user/saved-notes` returns the logged-in user's saved notes
- `PUT /api/user/profile` updates the logged-in user's profile
