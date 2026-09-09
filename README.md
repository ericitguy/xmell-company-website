# X-Mell Company Ltd — Corporate Website

Premium static website for **X-Mell Company Ltd.**, a Ghanaian-owned engineering, construction
and construction project management company based in Gausu, Obuasi, Ashanti Region, Ghana.

## Stack

Zero-dependency static site — plain HTML, CSS and vanilla JavaScript. No build step required
to run it; the only optional script regenerates the project pages.

```
index.html                  Homepage (all sections)
css/style.css               Design system + all component styles
js/main.js                  Nav, reveal animations, counters, filters, form → WhatsApp handoff
projects/*.html             8 project detail pages (generated)
scripts/generate-projects.js  Project page generator (edit PROJECTS data, then re-run)
robots.txt / sitemap.xml    SEO
```

## Run locally

```bash
python3 -m http.server 8000
# or: npx serve .
```

Then open http://localhost:8000

## Regenerate project pages

Edit the `PROJECTS` array in `scripts/generate-projects.js` (add, remove or update projects),
then run:

```bash
node scripts/generate-projects.js
```

## Notes

- Imagery uses Unsplash CDN placeholders representing construction/industrial themes.
  Replace with real Ghana-specific project photography before launch — update the
  `src`/`alt` attributes and download assets into `assets/images/` for production.
- The enquiry form opens WhatsApp (wa.me/233248705479) pre-filled with the enquiry details,
  since no backend/mail service is configured. Wire it to a form endpoint
  (e.g. Formspree/Netlify Forms) when hosting is chosen.
- Domain `xmellcompany.com` is used in canonical/OG/sitemap URLs — update if the real
  domain differs.
