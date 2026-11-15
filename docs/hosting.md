# Hosting

All production sites run on one Hetzner server. Each site has its own
domain and its own web root; the `deploy` user owns the web roots, and CI
logs in with the `HETZNER_SSH_KEY` / `HETZNER_HOST` repository secrets.

| Site      | Domain           | Web root             |
| :-------- | :--------------- | :------------------- |
| ex-nihilo | duo-ex-nihilo.de | `/var/www/exnihilo/` |
| cv        | not decided yet  | `/var/www/cv/`       |

## Adding a site

1. **Domain:** point the A/AAAA records at the server.
2. **Web root:** create it and give it to the deploy user, e.g.
   `sudo install -d -o deploy -g deploy /var/www/cv`.
3. **Web server:** add a virtual host for the domain that serves the web
   root, with HTTPS (e.g. Let's Encrypt) and a redirect from HTTP.
   - Serve `404.html` for missing pages.
   - Access logs must match what the site's Datenschutzerklärung says
     (retention, shortened IPs) — for the CV site that is `serverLogs` in
     `sites/cv/src/data/profile.ts`.
4. **CI:** enable the site's entry in the `production` matrix of
   `.github/workflows/deploy.yml` with its domain and web root, and set
   `SITE_URL` accordingly. For a brand-new site, also add it to `SITES`.
5. **Legal:** Impressum and Datenschutz must be complete before the domain
   goes public.

The Hetzner data-processing agreement (Art. 28 DSGVO) covers the whole
server, so new sites need no separate agreement.
