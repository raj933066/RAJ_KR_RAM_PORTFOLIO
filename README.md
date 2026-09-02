    <<<<<<< HEAD
# Premium MERN Portfolio

A dark, glassmorphic personal portfolio built with React (Vite), Tailwind CSS, Framer Motion, and an Express backend for the contact form. Contact messages are stored in Supabase.

```
portfolio/
├── client/    React + Vite + Tailwind frontend
├── server/    Express + Supabase backend
└── render.yaml
```

## 1. Prerequisites

- Node.js 18+ and npm
- A Supabase project with the `supabase/migrations/002_contact_messages.sql` migration applied
- An SMTP account for sending emails (Gmail + an [App Password](https://myaccount.google.com/apppasswords) works well)

## 2. Run the backend

```bash
cd server
cp .env.example .env
# edit .env with Supabase server credentials and SMTP credentials
npm install
npm run dev
```

The API starts on `http://localhost:5000`. Health check: `GET http://localhost:5000/api/health`.

**Endpoints**
| Method | Route              | Description                              | Auth              |
|--------|--------------------|-------------------------------------------|--------------------|
| POST   | `/api/contact`     | Save a contact message + send email       | Public (rate-limited) |
| GET    | `/api/messages`    | List all stored messages                  | Supabase Auth admin session |
| DELETE | `/api/messages/:id`| Delete a message by id                    | Supabase Auth admin session |

## 3. Run the frontend

In a new terminal:

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

Visit `http://localhost:5173`. Vite proxies `/api` requests to the backend on port 5000 during development (see `vite.config.js`), so `client/.env`'s `VITE_API_URL` can stay as-is locally.

## 4. Personalize the content

Almost everything text-based lives in **`client/src/utils/data.js`** — name, tagline, summary, education, skills, experience, projects, certifications, achievements, GitHub username, and social links. Edit that one file first.

Other things to replace:
- `client/public/resume.pdf` — swap in your real resume (a placeholder PDF is included so the download button works out of the box)
- `client/public/favicon.svg` — swap for your own mark if desired
- `client/index.html` — update the `<title>`, meta description, canonical URL, and OG image path
- Project images in `data.js` currently point to royalty-free Unsplash placeholders — replace with real screenshots

## 5. Production build

```bash
cd client
npm run build     # outputs to client/dist
```

## 6. Deploy

**Frontend → Vercel**
1. Push this repo to GitHub.
2. Import the repo in Vercel, set the project root to `client/`.
3. Build command: `npm run build`, output directory: `dist`.
4. Add an environment variable `VITE_API_URL` pointing to your deployed backend, e.g. `https://your-api.onrender.com/api`.

**Backend → Render**
1. In Render, create a new Web Service from this repo (root directory `server/`), or use the included `render.yaml` blueprint.
2. Set the environment variables from `server/.env.example` in the Render dashboard (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `CLIENT_ORIGIN` = your Vercel URL, SMTP credentials).
3. Build command: `npm install`, start command: `npm start`.

## 7. Tech stack

- **Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, React Router, React Icons, react-type-animation, react-toastify
- **Backend:** Node.js, Express, Supabase, Nodemailer, express-validator, express-rate-limit, Helmet
- **GitHub stats** are rendered via the public github-readme-stats/streak-stats image APIs and ghchart.rshah.org — no API token required. Just change `githubUsername` in `data.js`.

## 8. Notes

- The custom cursor, particle-style background, scroll progress bar, back-to-top button, loading screen, and dark/light theme toggle are all implemented without extra paid services.
- Reduced-motion preferences are respected (`prefers-reduced-motion`).
- The contact form validates on both client and server; messages are stored in Supabase even if the outbound email fails, so no submissions are lost due to SMTP issues.
=======
# RAJ_KR_RAM_PORTFOLIO
A modern, responsive developer portfolio built with React and Vite, featuring projects, skills, education, experience, certifications, achievements, and a Supabase-powered CMS with a secure admin dashboard for managing portfolio content.
>>>>>>> 851c5b138472ce8871eb2f82b463e93018f2e32a
