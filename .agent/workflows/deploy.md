---
description: How to deploy the SwordNex project to Firebase
---
This workflow guides you through the deployment of both the frontend (Hosting) and the backend (Functions) to Firebase.

### Prerequisites
1.  Make sure you have the [Firebase CLI](https://firebase.google.com/docs/cli) installed: `npm install -g firebase-tools`
2.  Log in to Firebase: `firebase login`
3.  Select the project: `firebase use swordnex-sites`

### Step 1: Install Dependencies
Install dependencies for both the frontend and the backend.

```bash
# Frontend dependencies
cd frontend && npm install && cd ..

# Backend (Functions) dependencies
cd backend
npm install
cd ..
```

### Step 2: Build the Frontend
Create a production build of the Vite frontend.

```bash
npm run build   # builds frontend/ into frontend/dist
```

### Step 3: Configure Environment Variables
You need to set the environment variables in Firebase Functions for the backend to work.

```bash
# Set Brevo API Key
firebase functions:secrets:set BREVO_API_KEY

# Set Firebase Config (Optional if using default admin, but currently used by client SDK in backend)
firebase functions:config:set firebase.api_key="YOUR_API_KEY" \
  firebase.auth_domain="swordnex-sites.firebaseapp.com" \
  firebase.project_id="swordnex-sites" \
  firebase.storage_bucket="swordnex-sites.firebasestorage.app" \
  firebase.messaging_sender_id="14988485795" \
  firebase.app_id="1:14988485795:web:35988612ce2c0c78778b16"
```

### Step 4: Deploy
Deploy everything to Firebase.

```bash
firebase deploy
```

### Note on CORS
The backend is already configured to allow all origins (`origin: '*'`), which is necessary for the frontend to talk to the functions if they were on different domains. However, since we used `rewrites` in `firebase.json`, they share the same domain, which avoids CORS issues altogether.
