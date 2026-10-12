# DNS + Server Setup for tngpsc.xyz (and thenotarygiant.xyz)

Primary Domain: tngpsc.xyz
Secondary: thenotarygiant.xyz (can point to same site)
Github: tngpsc01 / thenotarygiant-xyz
Live Hosting: Netlify DNS (recommended for .xyz)

## PRIMARY METHOD: Netlify DNS for tngpsc.xyz (You are here)
This is the cleanest for .xyz on GoDaddy.

1. In Netlify: Site → Domain management → Add custom domain → tngpsc.xyz → Verify → Add
   Also add www.tngpsc.xyz
2. Click "Set up Netlify DNS" for tngpsc.xyz
   Netlify will give you 4 nameservers like:
   dns1.p01.nsone.net
   dns2.p01.nsone.net
   dns3.p01.nsone.net
   dns4.p01.nsone.net
   (Use YOUR exact 4 shown in Netlify — they are unique per site)
3. In GoDaddy: My Products → tngpsc.xyz → DNS → Nameservers → Change → Custom → Paste the 4 Netlify nameservers → Save
4. IMPORTANT in GoDaddy: Delete any Forwarding (My Products → Forwarding → Delete) and delete Parked A records if you switch back to GoDaddy DNS later.
5. Wait 10-60 mins. In Netlify → Domain management → Click "Verify DNS configuration" → Then "Provision certificate" for HTTPS.
6. Test https://tngpsc.xyz — SSL auto.

## FALLBACK METHOD: External DNS (Keep GoDaddy nameservers)
If you do NOT want to change nameservers:

In GoDaddy DNS → Manage DNS → Add:
Type: A     Name: @   Value: 75.2.60.5  TTL: 3600
Type: CNAME Name: www Value: YOUR-SITE.netlify.app TTL: 3600
(Replace YOUR-SITE.netlify.app with your actual Netlify subdomain, e.g. tngpsc-xyz.netlify.app)

Then in Netlify add tngpsc.xyz and www.tngpsc.xyz as custom domains.

## Option: Your own VPS / cPanel
1. npm run build → /dist
2. Upload /dist to /var/www/tngpsc.xyz
3. DNS:
   Type: A   Name: @   Value: YOUR_SERVER_IP
   Type: A   Name: www Value: YOUR_SERVER_IP
4. Enable Let's Encrypt SSL

Build Settings for Netlify (all methods):
Build command: npm run build
Publish directory: dist
