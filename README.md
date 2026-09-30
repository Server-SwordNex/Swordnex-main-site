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
│   ├── src/                  server.js (routes) + Firestore data modules
│   ├── scripts/              local Brevo/email test scripts (not deployed)
│   ├── .env                  local secrets, not committed
│   └── package.json
├── firebase.json             hosting -> frontend/dist, functions -> backend, /api/** -> api
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
```

## Deploy

```bash
npm run deploy             # build frontend + deploy hosting and functions
npm run deploy:hosting     # frontend only
npm run deploy:functions   # backend only
```
