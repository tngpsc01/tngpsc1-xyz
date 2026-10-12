# The Notary Giant® / TNGPSC — Premium Redesign

Primary domain: tngpsc.xyz (live)
Secondary: thenotarygiant.xyz
Github: tngpsc01 / thenotarygiant-xyz
- Stack: React 18 + Vite + Tailwind + lucide-react
- Brand: Ink #0A1120, Gold #C9A86A, Stone #F7F5F2, Charcoal #1A1E2A
- Sections: Hero, Services, Service Areas, Founder, Reviews, FAQ, Booking, Footer

## Run locally
npm install
npm run dev

## Build
npm run build
→ dist/ folder ready to upload to any server

## Deploy — Netlify DNS (Current method for tngpsc.xyz)
1. Connect GitHub tngpsc01 / thenotarygiant-xyz to Netlify
2. Build: npm run build, Publish: dist
3. In Netlify: Domain management → Add tngpsc.xyz + www.tngpsc.xyz → Set up Netlify DNS
4. Copy the 4 nameservers Netlify gives you and paste into GoDaddy → tngpsc.xyz → Nameservers → Custom

## DNS
See DEPLOY.md for full Netlify DNS steps