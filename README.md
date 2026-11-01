# Kenya LocaMatch App

Location-based online dating platform for people in Kenya.

## Features in this starter

- GPS / geolocation permission request
- Nearby profiles with mock data (Nairobi, Mombasa, Kisumu, etc.)
- Filters by county and age
- Profile detail view
- Like / match demo
- Simple profile setup form
- Sheng-friendly UI copy
- Safety report button (demo)

## Planned full features

1. User registration / login (Supabase Auth or Netlify Identity)
2. Persistent profiles + photo uploads (Supabase Storage or Cloudinary)
3. Real matching algorithm using Haversine distance on coordinates
4. Real-time chat (Supabase Realtime)
5. Push notifications
6. M-Pesa payments for premium (Safaricom Daraja)
7. Advanced filters: tribe, religion, lifestyle, student/professional/church mode

## Local development

```bash
npm install
npm run dev
```

## Deploy to Netlify

- Connect this GitHub repo
- Build command: `npm run build`
- Publish directory: `dist`

Or use the Netlify UI / CLI.

**Note:** This is a frontend prototype with mock data. Full backend features require additional services (recommended: Supabase for auth + DB + realtime + storage).

Live demo will be available after Netlify deploy.
