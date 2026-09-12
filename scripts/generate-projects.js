/* Build script: generates static project detail pages in /projects from the data below.
   Run: node scripts/generate-projects.js */

const fs = require("fs");
const path = require("path");

const PROJECTS = [
  {
    slug: "aga-health-foundation",
    name: "AGA Health Foundation — Renovation Works",
    title: "Renovation Works — AGA Health Foundation, AngloGold Ashanti Mine Hospital | X-Mell Company Ltd",
    description: "X-Mell Company Ltd carried out renovation works at the AngloGold Ashanti Mine Hospital for the AGA Health Foundation.",
    category: "Renovation · Healthcare",
    keywords: "hospital renovation Ghana, AngloGold Ashanti Mine Hospital, AGA Health Foundation, X-Mell Company",
    location: "AngloGold Ashanti Mine Hospital, Obuasi, Ghana",
    client: "AGA Health Foundation",
    type: "Renovation — Healthcare Facility",
    img: "local:aga-health-1.jpg",
    imgAlt: "Renovation works at the AngloGold Ashanti Mine Hospital for the AGA Health Foundation",
    gallery: ["local:aga-health-1.jpg", "local:aga-health-2.jpg", "local:aga-health-3.jpg", "local:aga-health-4.jpg"],
    scope: [
      "Renovation works within the operational AngloGold Ashanti Mine Hospital environment.",
      "Upgrades delivered under strict safety and infection-control site protocols.",
      "Building, finishing and servicing works coordinated with hospital operations.",
      "Delivered for the AGA Health Foundation."
    ],
    services: ["Renovation Works", "Commercial Construction", "Safety Management"]
  },
  {
    slug: "tripump-office-complex",
    name: "TRI-PUMP Ghana Ltd — Office Complex",
    title: "Construction of an Office Complex for TRI-PUMP Ghana Ltd — Obuasi | X-Mell Company Ltd",
    description: "X-Mell Company Ltd constructed an office complex for TRI-PUMP Ghana Ltd in Obuasi — reinforced concrete frame and full building construction in Ashanti, Ghana.",
    category: "Commercial",
    keywords: "office complex construction Ghana, commercial construction Obuasi, TRI-PUMP Ghana, building contractor Obuasi, X-Mell Company",
    location: "Obuasi, Ashanti Region, Ghana",
    client: "TRI-PUMP Ghana Ltd",
    type: "Commercial Construction — Office Building",
    img: "local:tripump-office-1.jpg",
    imgAlt: "Suspended slab pour in progress on the TRI-PUMP Ghana office complex in Obuasi",
    gallery: ["local:tripump-office-2.jpg", "local:tripump-office-3.jpg", "local:tripump-office-4.jpg", "local:tripump-office-5.jpg", "local:tripump-office-6.jpg", "local:tripump-office-8.jpg", "local:tripump-office-9.jpg", "local:tripump-office-10.jpg"],
    scope: [
      "Construction of a complete office complex for TRI-PUMP Ghana Ltd in Obuasi.",
      "Reinforced concrete frame, suspended slabs and masonry envelope works.",
      "Site logistics and materials handling managed on an active building site.",
      "Delivered for a corporate client to commercial building standards."
    ],
    services: ["Commercial & Industrial Construction", "Civil Engineering", "Project Management"]
  },
  {
    slug: "epiroc-steel-structure",
    name: "Epiroc Ghana Ltd — Steel Structure Erection",
    title: "Erection of Steel Structure for Epiroc Ghana Ltd | X-Mell Company Ltd",
    description: "X-Mell Company Ltd erected the steel structure for Epiroc Ghana Ltd — industrial steel erection and installation works in Ghana.",
    category: "Industrial",
    keywords: "steel structure erection Ghana, industrial construction Ghana, Epiroc Ghana, mining services contractor, X-Mell Company",
    location: "Ghana",
    client: "Epiroc Ghana Ltd",
    type: "Industrial Construction — Structural Steel Erection",
    img: "local:epiroc-steel-1.jpg",
    imgAlt: "Steel structure erection works for Epiroc Ghana Ltd",
    gallery: ["local:epiroc-steel-2.jpg", "local:epiroc-steel-3.jpg", "local:epiroc-steel-4.jpg"],
    scope: [
      "Erection of a structural steel structure for Epiroc Ghana Ltd.",
      "Steel assembly, alignment and installation works to engineering specifications.",
      "Lifting operations and working-at-height controls under a safety-managed site.",
      "Industrial delivery for an international mining-equipment manufacturer."
    ],
    services: ["Industrial Construction", "Welding & Fabrication", "Mining & Industrial Services"]
  },
  {
    slug: "piggery-sansu-anglogold",
    name: "Piggery Structure — Sansu, AngloGold Ashanti",
    title: "Construction of Piggery Structure at Sansu for AngloGold Ashanti Mine | X-Mell Company Ltd",
    description: "X-Mell Company Ltd constructed a piggery structure at Sansu for AngloGold Ashanti Mine — agricultural-industrial building construction in Obuasi, Ghana.",
    category: "Industrial",
    keywords: "piggery construction Ghana, agricultural building Obuasi, AngloGold Ashanti contractor, industrial construction Ghana, X-Mell Company",
    location: "Sansu, Obuasi, Ashanti Region, Ghana",
    client: "AngloGold Ashanti Mine",
    type: "Industrial Construction — Agricultural Structure",
    img: "local:piggery-sansu-2.jpg",
    imgAlt: "Piggery structure construction at Sansu for AngloGold Ashanti Mine",
    gallery: ["local:piggery-sansu-3.jpg", "local:piggery-sansu-4.jpg", "local:piggery-sansu-5.jpg", "local:tripump-office-7.jpg"],
    scope: [
      "Construction of a piggery structure at Sansu for AngloGold Ashanti Mine.",
      "Structural works and building envelope suited to agricultural-industrial use.",
      "Delivered within the AngloGold Ashanti concession environment.",
      "Works executed to mine-site safety and supervision standards."
    ],
    services: ["Industrial Construction", "Civil Engineering", "Mining & Industrial Services"]
  },
  {
    slug: "kajeji-private-property",
    name: "Private Residence — Kajeji",
    title: "Construction of a Private Property at Kajeji | X-Mell Company Ltd",
    description: "X-Mell Company Ltd constructed a private property at Kajeji for Mr. Emmanuel Ankamah, former AngloGold Ashanti Finance Officer — residential construction in Ghana.",
    category: "Residential",
    keywords: "private residence construction Ghana, residential construction Obuasi, house construction Ghana, X-Mell Company",
    location: "Kajeji, Ghana",
    client: "Mr. Emmanuel Ankamah — Former AngloGold Ashanti Finance Officer",
    type: "Residential Construction — Private Residence",
    img: "local:kajeji-property-1.jpg",
    imgAlt: "Private residence under construction at Kajeji for Mr. Emmanuel Ankamah",
    gallery: ["local:kajeji-property-2.jpg", "local:kajeji-property-3.jpg", "local:kajeji-property-4.jpg"],
    scope: [
      "Construction of a private residential property at Kajeji.",
      "Full building delivery — substructure, superstructure and finishes.",
      "Client-directed design decisions coordinated throughout the build.",
      "Delivered for a private client with AngloGold Ashanti executive background."
    ],
    services: ["Residential Construction", "Turnkey Construction", "Project Management"]
  }
];

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "projects");
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const check = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;
const arrow = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`;

/* Image ids starting with "local:" resolve to files in assets/images/projects/;
   anything else is treated as an Unsplash photo id (legacy). */
const isLocal = (id) => id.startsWith("local:");
const localFile = (id) => id.slice(6);
const imgUrl = (id, w) =>
  isLocal(id)
    ? `../assets/images/projects/${localFile(id)}`
    : `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const absImg = (id, w) =>
  isLocal(id)
    ? `https://xmellcompany.com/assets/images/projects/${localFile(id)}`
    : `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const img = (id, w, alt, eager) =>
  `${imgUrl(id, w)}" alt="${alt}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'}`;

function page(p) {
  const related = PROJECTS.filter((x) => x.slug !== p.slug).slice(0, 3);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${p.title}</title>
  <meta name="description" content="${p.description}">
  <meta name="keywords" content="${p.keywords}">
  <link rel="canonical" href="https://xmellcompany.com/projects/${p.slug}.html">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="X-Mell Company Ltd">
  <meta property="og:title" content="${p.name} — X-Mell Project">
  <meta property="og:description" content="${p.description}">
  <meta property="og:url" content="https://xmellcompany.com/projects/${p.slug}.html">
  <meta property="og:image" content="${absImg(p.img, 1200)}">
  <link rel="icon" type="image/png" sizes="64x64" href="../assets/images/favicon-64.png">
  <link rel="apple-touch-icon" href="../assets/images/apple-touch-icon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/style.css">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Project",
    "name": "${p.name}",
    "description": "${p.description}",
    "url": "https://xmellcompany.com/projects/${p.slug}.html",
    "image": "${absImg(p.img, 1200)}",
    "location": { "@type": "Place", "name": "${p.location}" },
    "parentOrganization": { "@type": "GeneralContractor", "name": "X-Mell Company Ltd." }
  }
  </script>
</head>
<body>

  <header class="site-header scrolled" id="siteHeader">
    <div class="container header-inner">
      <a href="../index.html" class="brand" aria-label="X-Mell Company Ltd — Home">
        <span class="brand-logo"><img src="../assets/images/xmell-logo.jpg" alt="X-Mell Company Ltd logo" width="64" height="41"></span>
        <span class="brand-text">X-MELL<small>Company Ltd · Obuasi</small></span>
      </a>
      <nav class="nav" id="primaryNav" aria-label="Primary">
        <a href="../index.html">Home</a>
        <a href="../index.html#about">About</a>
        <a href="../services.html">Services</a>
        <a href="../index.html#projects" class="active">Projects</a>
        <a href="../index.html#safety">Safety &amp; Environment</a>
        <a href="../index.html#leadership">Leadership</a>
        <a href="../index.html#contact">Contact</a>
        <a href="../index.html#contact" class="btn btn-amber nav-cta">Request a Quote</a>
      </nav>
      <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="primaryNav">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>

  <main>
    <section class="page-hero">
      <div class="hero-bg"><img src="${img(p.img, 2000, p.imgAlt, true)}"></div>
      <div class="container">
        <p class="crumbs"><a href="../index.html#projects">Projects</a> &nbsp;/&nbsp; ${p.name}</p>
        <h1>${p.name}</h1>
      </div>
    </section>

    <div class="graphite" style="padding:0">
      <div class="container">
        <div class="pd-meta">
          <div><div class="k">Location</div><div class="v">${p.location}</div></div>
          <div><div class="k">Client</div><div class="v">${p.client}</div></div>
          <div><div class="k">Project Type</div><div class="v">${p.type}</div></div>
          <div><div class="k">Category</div><div class="v">${p.category}</div></div>
        </div>
      </div>
    </div>

    <section>
      <div class="container pd-body">
        <div>
          <span class="eyebrow">Scope of Work</span>
          <h2 class="h2" style="margin-top:0.9rem">What We Delivered</h2>
          <ul class="safety-points" style="margin-top:1.6rem">
            ${p.scope.map((s) => `<li style="color:var(--steel)"><span class="tick" style="border-color:var(--charcoal);background:var(--charcoal);color:var(--accent)">${check}</span>${s}</li>`).join("\n            ")}
          </ul>

          <h2 class="h2" style="margin-top:3.5rem">Project Gallery</h2>
          <p class="muted" id="gallery-caption" style="margin-top:0.4rem;font-size:0.9rem">Select any image to view it larger — zoom in for detail. Use the arrow keys to move between photos.</p>
          <div class="gallery" aria-labelledby="gallery-caption">
            ${p.gallery.map((g) => `<img src="${img(g, 900, p.imgAlt)}">`).join("\n            ")}
          </div>
        </div>

        <aside class="pd-side">
          <h3>Related Services</h3>
          <ul>
            ${p.services.map((s) => `<li><span class="tick">${check}</span>${s}</li>`).join("\n            ")}
          </ul>
          <a href="../index.html#contact" class="btn btn-amber">
            Discuss a Similar Project ${arrow}
          </a>
          <a href="tel:+233248705479" class="btn btn-outline-dark" style="margin-top:0.8rem">Call 024 870 5479</a>
        </aside>
      </div>
    </section>

    <section class="services" style="background:var(--paper);padding-top:0">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow">More Projects</span>
          <h2 class="h2">Other Work We Have Delivered</h2>
        </div>
        <div class="proj-grid" style="grid-auto-rows:auto">
          ${related
            .map(
              (r) => `<a href="${r.slug}.html" class="proj-card" style="min-height:320px;grid-row:auto">
            <img src="${img(r.img, 900, r.imgAlt)}">
            <div class="veil"></div>
            <div class="body">
              <span class="cat">${r.category}</span>
              <h3>${r.name}</h3>
              <span class="loc"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg> ${r.location}</span>
            </div>
          </a>`
            )
            .join("\n          ")}
        </div>
      </div>
    </section>

    <section class="cta-band">
      <div class="container cta-band-inner">
        <h2 class="h2">Planning a similar project?</h2>
        <a href="../index.html#contact" class="btn btn-dark">Request a Consultation</a>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="../index.html" class="brand"><span class="brand-logo"><img src="../assets/images/xmell-logo.jpg" alt="X-Mell Company Ltd logo" width="64" height="41" loading="lazy"></span><span class="brand-text">X-MELL<small>Company Ltd · Obuasi</small></span></a>
          <p>Engineering. Construction. Project Management.</p>
          <div class="footer-social">
            <a href="https://web.facebook.com/xmelllimited" target="_blank" rel="noopener" aria-label="X-Mell Company Ltd on Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://wa.me/233248705479" target="_blank" rel="noopener" aria-label="X-Mell Company Ltd on WhatsApp">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
            </a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="../index.html#about">About</a></li>
            <li><a href="../index.html#leadership">Leadership</a></li>
            <li><a href="../index.html#safety">Safety</a></li>
            <li><a href="../index.html#environment">Environmental Responsibility</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Services</h4>
          <ul>
            <li><a href="../services.html#civil-engineering">Civil Engineering</a></li>
            <li><a href="../services.html#commercial-industrial">Commercial Construction</a></li>
            <li><a href="../services.html#residential">Residential</a></li>
            <li><a href="../services.html#commercial-industrial">Industrial</a></li>
            <li><a href="../services.html#turnkey">Turnkey Projects</a></li>
            <li><a href="../index.html#mining">Mining Services</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><span>Gausu, Obuasi, Ashanti, Ghana</span></li>
            <li><a href="tel:+233248705479">024 870 5479</a></li>
            <li><a href="tel:+233206565581">020 656 5581</a></li>
            <li><a href="mailto:xmellcompanyltd1@gmail.com">xmellcompanyltd1@gmail.com</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 X-Mell Company Ltd. All Rights Reserved.</span>
        <span class="tag">We Build. We Engineer. We Manage. We Deliver.</span>
      </div>
    </div>
  </footer>

  <a class="wa-float" href="https://wa.me/233248705479?text=Hello%20X-Mell%2C%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener" aria-label="Chat with X-Mell on WhatsApp">
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
  </a>

  <script src="../js/main.js" defer></script>
  <script src="../js/lightbox.js" defer></script>
</body>
</html>
`;
}

PROJECTS.forEach((p) => {
  fs.writeFileSync(path.join(OUT, `${p.slug}.html`), page(p));
  console.log("✓ generated projects/" + p.slug + ".html");
});
console.log(`\nDone — ${PROJECTS.length} project pages generated.`);
