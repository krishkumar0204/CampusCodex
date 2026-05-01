# CampusCodex Frontend

React + Vite frontend for CampusCodex, a student notes platform for browsing, uploading, saving, and searching study notes.

## Features

- Responsive notes listing with search
- Add notes with thumbnail and PDF upload
- Login and registration pages
- Dashboard for saved notes
- Contact form powered by EmailJS
- Shared loading spinner for async page states

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- Axios
- React Router
- React Hot Toast
- Lucide React icons
- EmailJS

## Setup

Install dependencies:

```bash
npm install
```

Create `.env` in the frontend folder:

```env
VITE_API_URL=http://localhost:3000/api
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Start the dev server:

```bash
npm run dev
```

For phone testing on the same Wi-Fi, run Vite with a network host and open the shown network URL:

```bash
npm run dev -- --host 0.0.0.0
```

The notes page can automatically swap a localhost API URL to the current LAN hostname when opened from another device.

## Scripts

- `npm run dev` starts the Vite dev server
- `npm run build` creates a production build
- `npm run lint` runs ESLint
- `npm run preview` previews the production build
