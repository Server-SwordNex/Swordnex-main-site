# SwordNex Main Site

The swordnex.com website. The frontend and backend live in separate folders and deploy together to the Firebase project `swordnex-sites`.

```
.
├── frontend/                 Vite + React website (served by Firebase Hosting)
│   ├── src/                  pages, components, config, services
│   ├── public/               static files copied as-is (robots.txt, sitemap.xml, assets/)
│   ├── index.html
│   └── package.json
├── backend/                  Firebase Cloud Function "api" (Express)
│   ├── index.js              function entry point (exports.api)
│   ├── src/                  server.js (routes), accessPolicy.js, middleware/, Firestore data modules
│   ├── scripts/              set-role.js + local Brevo test scripts (not deployed)
│   ├── test/                 API access tests (npm test)
│   ├── .env.example          settings the backend reads
│   └── package.json
├── firebase.json             hosting -> frontend/dist, functions -> backend, /api/** -> api
├── firestore.rules           browser may only read its own users/{uid} profile
├── storage.rules             public forms may upload application files only
├── .firebaserc               default project: swordnex-sites
└── firestore.indexes.json
```

## Setup

```bash
npm run install:all
```

## Develop

```bash
npm run dev            # frontend at http://localhost:5173
npm run dev:backend    # API at http://localhost:5000 (standalone Express)
npm --prefix backend test
```

## Who can call the API

Every `/api` route is listed in `backend/src/accessPolicy.js`. Routes that are not listed are refused.

- **Public:** website content (events, workshops, published blogs, jobs, partners) and form submissions.
- **Staff:** the browser sends the Firebase ID token (`frontend/src/services/apiClient.js`). The backend reads the role from `users/{uid}.role`.
  - HR: applications, jobs, job fair, interviews
  - Support: contacts, appointments, chatbot leads, enquiries
  - Marketing: events, workshops, blogs, partners
  - Finance: affiliate payouts and commissions
  - Admin: everything, including staff user management
- **Affiliates:** only their own dashboard data.
- **`POST /api/affiliate/record-conversion`:** needs the `x-affiliate-secret` header to match `AFFILIATE_WEBHOOK_SECRET`.

When you add a route to `server.js`, add it to `accessPolicy.js` too. `npm test` fails if you forget.

## Staff accounts

Public sign-up is disabled. To create the first Admin:

1. Create the user in Firebase Console → Authentication → Add user.
2. From `backend/`, with credentials for `swordnex-sites` (for example `gcloud auth application-default login`), run:

   ```bash
   node scripts/set-role.js admin@swordnex.com Admin
   ```

That Admin can then create HR, Support, Marketing and Finance accounts from the Admin dashboard.

## Deploy

```bash
npm run deploy             # build frontend + deploy hosting, functions, Firestore and Storage rules
npm run deploy:hosting     # frontend only
npm run deploy:functions   # backend only
```

The frontend, backend and rules must be deployed together the first time. The dashboards send login tokens that only the new backend checks.
