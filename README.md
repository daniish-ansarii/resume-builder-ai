<div align="center">

# 📄 Resume Builder AI

**Create, refine, and share a polished resume with help from Gemini AI.**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=000)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=fff)](https://vite.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=fff)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=fff)](https://www.mongodb.com/)
[![Gemini](https://img.shields.io/badge/AI-Google%20Gemini-4285F4?logo=googlegemini&logoColor=fff)](https://ai.google.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?logo=tailwindcss&logoColor=fff)](https://tailwindcss.com/)

[Features](#features) · [Run locally](#run-locally) · [Deploy to Vercel](#deploy-to-vercel) · [API reference](#api-reference)

</div>

---

## About

Resume Builder AI is a full-stack resume editor built with React, Express, MongoDB, and Google Gemini. Start a resume from scratch or import a text-based PDF, edit the extracted details, preview the result as you work, and print or save it as a PDF.

Gemini provides optional writing assistance for professional summaries and experience descriptions. The app sends AI requests through the server; the Gemini API key is never placed in frontend code.

## Features

- **PDF resume import:** Extract text from every page, then use Gemini to organize personal details, skills, experience, education, projects, and publications into editable sections.
- **Gemini writing assistance:** Refine a professional summary or work description while keeping the result editable.
- **Ten resume layouts:** Classic, Modern, Minimal, Minimal Image, Executive, Sidebar, Tech, Compact ATS, Creative, and Elegant.
- **Live editor and preview:** Update resume sections, accent colors, and templates and review the preview while editing.
- **Public resume links:** Choose whether a resume is private or available through a shareable link.
- **Print to PDF:** Use the browser print dialog to print or save the resume as a PDF.
- **Profile photos:** Upload profile photos through ImageKit. ImageKit settings are optional if photo uploads are not needed.
- **Accounts and dashboard:** Register, sign in, and manage saved resumes.
- **Responsive landing page:** Includes a template showcase, feature overview, setup steps, FAQ, and direct contact email.

## Tech stack

| Frontend | Backend and services |
| --- | --- |
| React 19, Vite 7, React Router | Node.js, Express 5 |
| Redux Toolkit, Axios | MongoDB, Mongoose |
| Tailwind CSS v4, Motion | JWT authentication, bcrypt |
| React-PDF / PDF.js, Lucide | Google Gemini API, ImageKit, Multer |

The backend uses the OpenAI-compatible client protocol supported by Google Gemini. **Gemini is the AI provider configured by this project.**

## Project structure

```text
AI Resume Builder/
├── client/                 # React + Vite frontend
│   ├── public/
│   └── src/
├── server/                 # Express API
│   ├── configs/             # MongoDB, Gemini, ImageKit, Multer
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   └── routes/
├── .gitignore
└── README.md
```

## Requirements

- Node.js 20 or newer
- npm
- MongoDB, local or hosted (MongoDB Atlas is suitable for deployment)
- A Gemini API key for AI features: [Google AI Studio](https://aistudio.google.com/apikey)
- An ImageKit account only if you want profile photo uploads: [ImageKit](https://imagekit.io/)

## Run locally

### 1. Install dependencies

From the project root:

```bash
cd server && npm install
cd ../client && npm install
```

### 2. Configure server environment

Copy `server/.env.example` to `server/.env` and set the values:

```dotenv
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017
JWT_SECRET=replace-with-a-long-random-secret
CLIENT_ORIGIN=http://localhost:5173
GEMINI_API_KEY=your_gemini_api_key
```

The server appends `/resume-builder` to `MONGODB_URI`. For MongoDB Atlas, use the connection string for your cluster and ensure its network access rules allow your development machine and deployment environment.

Optional AI model settings are `GEMINI_MODEL`, `GEMINI_FAST_MODEL`, and `GEMINI_IMPORT_MODEL`. Optional ImageKit settings are `IMAGEKIT_PUBLIC_KEY`, `IMAGEKIT_PRIVATE_KEY`, and `IMAGEKIT_URL`.

Generate a unique JWT secret, for example:

```bash
openssl rand -base64 48
```

### 3. Configure the frontend

Copy `client/.env.example` to `client/.env` and set the API origin:

```dotenv
VITE_BASE_URL=http://localhost:3000
```

### 4. Start both services

Run each command in a separate terminal from the project root:

```bash
cd server && npm run server
```

```bash
cd client && npm run dev
```

Open [http://localhost:5173](http://localhost:5173). The API health route is available at [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

This repository contains a Vite frontend and an Express API. Deploy them as **two Vercel projects connected to the same GitHub repository**, each with its own Root Directory. Vercel supports selecting project directories in a monorepo and deploying Express applications as Functions. See [Vercel monorepo guidance](https://vercel.com/docs/monorepos) and [Express on Vercel](https://vercel.com/docs/frameworks/backend/express).

### Before deploying

1. Push this project to a GitHub repository.
2. Use a hosted MongoDB database such as MongoDB Atlas. A local `127.0.0.1` database is not reachable by Vercel.
3. Keep API keys and database credentials out of Git. Add them to Vercel Project Settings → Environment Variables.

### Deploy the API

1. In Vercel, import the GitHub repository as a new project.
2. Set **Root Directory** to `server`.
3. Add these environment variables for Production (and Preview if you use preview deployments):

   | Variable | Value |
   | --- | --- |
   | `MONGODB_URI` | Hosted MongoDB connection string; the app adds `/resume-builder` |
   | `JWT_SECRET` | A long, unique random secret |
   | `GEMINI_API_KEY` | Your Google AI Studio key |
   | `CLIENT_ORIGIN` | Your deployed frontend origin, e.g. `https://your-frontend.vercel.app` |
   | `IMAGEKIT_PUBLIC_KEY` | Optional; needed for ImageKit uploads |
   | `IMAGEKIT_PRIVATE_KEY` | Optional secret; needed for ImageKit uploads |
   | `IMAGEKIT_URL` | Optional ImageKit URL endpoint |

4. Deploy and copy the API project's Vercel URL. Its root route should respond with `Server is live...`.

### Deploy the frontend

1. Import the same GitHub repository as another Vercel project.
2. Set **Root Directory** to `client` and use the Vite defaults: build command `npm run build`, output directory `dist`.
3. Set `VITE_BASE_URL` to the API project's origin, for example `https://your-api.vercel.app` (no `/api` suffix).
4. Deploy the frontend and copy its Vercel origin.
5. Set `CLIENT_ORIGIN` in the API project's Production environment to that exact frontend origin, then redeploy the API. CORS uses this value to allow the frontend to call the API.

Environment changes take effect on new deployments; redeploy after changing them. Review both Vercel projects' logs if a request fails. See [Vercel environment variables](https://vercel.com/docs/environment-variables) for the available environments.

## Environment variables

| Variable | Where | Required | Purpose |
| --- | --- | --- | --- |
| `MONGODB_URI` | Server | Yes | MongoDB connection; `/resume-builder` is appended |
| `JWT_SECRET` | Server | Yes | Signs authentication tokens |
| `CLIENT_ORIGIN` | Server | Recommended | Allowed frontend origin for CORS |
| `GEMINI_API_KEY` | Server | For AI | Gemini API authentication |
| `GEMINI_MODEL` | Server | No | Main Gemini model override |
| `GEMINI_FAST_MODEL` | Server | No | Faster enhancement model override |
| `GEMINI_IMPORT_MODEL` | Server | No | Resume import model override |
| `IMAGEKIT_PUBLIC_KEY` | Server | For ImageKit | ImageKit account public key |
| `IMAGEKIT_PRIVATE_KEY` | Server | For ImageKit | ImageKit account private key |
| `IMAGEKIT_URL` | Server | For ImageKit | ImageKit URL endpoint |
| `PORT` | Server | No | Local API port; defaults to `3000` |
| `VITE_BASE_URL` | Client | Yes | API origin used by the frontend |

Never put `GEMINI_API_KEY`, `JWT_SECRET`, `MONGODB_URI`, or ImageKit private credentials in a `VITE_*` variable or commit them. Vite variables are included in the browser build.

## API reference

Protected endpoints expect the JWT returned by registration or login in the `Authorization` header.

### `/api/users`

| Method | Endpoint | Authentication | Purpose |
| --- | --- | --- | --- |
| `POST` | `/register` | No | Create an account |
| `POST` | `/login` | No | Sign in |
| `GET` | `/data` | Yes | Get the current account |
| `GET` | `/resumes` | Yes | List the account's resumes |

### `/api/resumes`

| Method | Endpoint | Authentication | Purpose |
| --- | --- | --- | --- |
| `POST` | `/create` | Yes | Create a resume |
| `PUT` | `/update` | Yes | Update resume data or upload a profile photo |
| `DELETE` | `/delete/:resumeId` | Yes | Delete a resume |
| `GET` | `/get/:resumeId` | Yes | Get an owned resume |
| `GET` | `/public/:resumeId` | No | Get a resume marked public |

### `/api/ai`

| Method | Endpoint | Authentication | Purpose |
| --- | --- | --- | --- |
| `POST` | `/enhance-pro-sum` | Yes | Enhance the professional summary with Gemini |
| `POST` | `/enhance-job-desc` | Yes | Enhance an experience description with Gemini |
| `POST` | `/upload-resume` | Yes | Convert extracted PDF text into resume data with Gemini |

## Push updates to GitHub

After creating the GitHub repository and connecting it as `origin`, use:

```bash
git add .
git commit -m "Update resume builder"
git push -u origin main
```

Once the two Vercel projects are linked to the repository, pushes to the configured production branch trigger new deployments. See [GitHub's guide to adding a local project](https://docs.github.com/en/repositories/creating-and-managing-repositories/adding-locally-hosted-code-to-github).

## Contact

Questions or suggestions: [daniish.dev@gmail.com](mailto:daniish.dev@gmail.com).
