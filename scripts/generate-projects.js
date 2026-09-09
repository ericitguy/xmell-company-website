/* Build script: generates static project detail pages in /projects from the data below.
   Run: node scripts/generate-projects.js */

const fs = require("fs");
const path = require("path");

const PROJECTS = [
  {
    slug: "obuasi-hospital-maternity-ward",
    name: "Obuasi Government Hospital — New Maternity Ward",
    title: "Construction of New Maternity Ward — Obuasi Government Hospital | X-Mell Company Ltd",
    description: "X-Mell Company Ltd constructed the New Maternity Ward at Obuasi Government Hospital for the Obuasi Community Trust Fund — civil and building construction in Obuasi, Ashanti, Ghana.",
    category: "Civil · Healthcare",
    keywords: "construction company Obuasi, hospital construction Ghana, civil engineering Obuasi, X-Mell Company",
    location: "Obuasi, Ashanti Region, Ghana",
    client: "Obuasi Community Trust Fund",
    type: "Civil Construction — Healthcare",
    img: "photo-1487958449943-2429e8be8625",
    imgAlt: "Construction of the New Maternity Ward at Obuasi Government Hospital",
    gallery: ["photo-1541888946425-d81bb19240f5", "photo-1503387762-592deb58ef4e", "photo-1504307651254-35680f356dfd"],
    scope: [
      "Civil and structural construction of a new maternity ward for Obuasi Government Hospital.",
      "Concrete substructure and superstructure works delivered to healthcare facility standards.",
      "Building finishes, roofing and internal fit-out coordinated with hospital operational requirements.",
      "Delivered for the Obuasi Community Trust Fund as a community health infrastructure project."
    ],
    services: ["Civil Engineering", "Concrete Structures", "Building Construction", "Project Management"]
  },
  {
    slug: "soap-factory-dokyiwa",
    name: "Soap Factory — Dokyiwa",
    title: "Construction of Soap Factory — Dokyiwa, Obuasi | X-Mell Company Ltd",
    description: "X-Mell Company Ltd constructed a soap production factory at Dokyiwa, Obuasi, funded by AngloGold Ashanti Mine Ltd — industrial construction in Ashanti, Ghana.",
    category: "Industrial",
    keywords: "industrial construction Ghana, factory construction Obuasi, AngloGold Ashanti contractor, X-Mell Company",
    location: "Dokyiwa, Obuasi, Ashanti Region, Ghana",
    client: "Funded by AngloGold Ashanti Mine Ltd.",
    type: "Industrial Construction — Manufacturing",
    img: "photo-1565793298595-6a879b1d9492",
    imgAlt: "Soap factory construction at Dokyiwa, Obuasi",
    gallery: ["photo-1565793298595-6a879b1d9492", "photo-1581091226825-a6a2a5aee158", "photo-1581094794329-c8112a89af12"],
    scope: [
      "Construction of a complete soap production factory at Dokyiwa, Obuasi.",
      "Industrial building structure, production floor and supporting civil works.",
      "Delivery under funding by AngloGold Ashanti Mine Ltd. to industrial construction standards.",
      "Coordinated mechanical and electrical provisions for manufacturing operations."
    ],
    services: ["Commercial & Industrial Construction", "Civil Engineering", "Concrete Structures"]
  },
  {
    slug: "fomasua-apartments",
    name: "Fomasua Apartment Project",
    title: "Complete Apartment Construction — Fomasua | X-Mell Company Ltd",
    description: "X-Mell Company Ltd delivered complete apartment construction at Fomasua — turnkey residential construction in Ghana.",
    category: "Residential",
    keywords: "residential construction Ghana, apartment construction Obuasi, turnkey construction Ghana, X-Mell Company",
    location: "Fomasua, Ghana",
    client: "Private Client",
    type: "Residential Construction — Turnkey",
    img: "photo-1545324418-cc1a3fa10c00",
    imgAlt: "Fomasua apartment project — complete apartment construction",
    gallery: ["photo-1545324418-cc1a3fa10c00", "photo-1512917774080-9991f1c4c750", "photo-1600585154340-be6161a56a0c"],
    scope: [
      "Complete apartment construction delivered turnkey — from substructure to final finishes.",
      "Structural, mechanical and electrical works under a single accountable contract.",
      "Quality finishes and fixtures coordinated with the client throughout the project lifecycle.",
      "Handover of move-in ready residential units."
    ],
    services: ["Residential Construction", "Turnkey Construction", "Project Management"]
  },
  {
    slug: "anyinam-junior-staff-quarters",
    name: "Anyinam Junior Staff Quarters",
    title: "Renovation of Junior Staff Quarters — Anyinam, Obuasi | X-Mell Company Ltd",
    description: "X-Mell Company Ltd renovated the Junior Staff Quarters at Anyinam, Obuasi, through the Obuasi Community Trust Fund.",
    category: "Renovation",
    keywords: "building renovation Ghana, staff quarters renovation Obuasi, construction company Obuasi, X-Mell Company",
    location: "Anyinam, Obuasi, Ashanti Region, Ghana",
    client: "Obuasi Community Trust Fund",
    type: "Renovation — Residential Buildings",
    img: "photo-1512917774080-9991f1c4c750",
    imgAlt: "Renovation of the Anyinam Junior Staff Quarters",
    gallery: ["photo-1512917774080-9991f1c4c750", "photo-1581094794329-c8112a89af12", "photo-1503387762-592deb58ef4e"],
    scope: [
      "Full renovation of junior staff quarters at Anyinam, Obuasi.",
      "Structural repairs, roofing, mechanical and electrical refurbishment.",
      "Internal and external finishes restored to safe, habitable standards.",
      "Delivered through the Obuasi Community Trust Fund."
    ],
    services: ["Renovation Works", "Building Construction", "Project Management"]
  },
  {
    slug: "anyimadukrom-eco-toilet",
    name: "Anyimadukrom Eco-Friendly Toilet Facility",
    title: "20-Seater Eco-Friendly Toilet Facility — Anyimadukrom, Obuasi East | X-Mell Company Ltd",
    description: "X-Mell Company Ltd constructed a 20-seater eco-friendly toilet facility at Anyimadukrom, Obuasi East — community sanitation infrastructure in Ghana.",
    category: "Civil · Sanitation",
    keywords: "sanitation construction Ghana, eco-friendly toilet facility, civil engineering Obuasi East, X-Mell Company",
    location: "Anyimadukrom, Obuasi East, Ashanti Region, Ghana",
    client: "Community Project",
    type: "Civil Construction — Sanitation Infrastructure",
    img: "photo-1504307651254-35680f356dfd",
    imgAlt: "20-seater eco-friendly toilet facility at Anyimadukrom, Obuasi East",
    gallery: ["photo-1504307651254-35680f356dfd", "photo-1541888946425-d81bb19240f5", "photo-1487958449943-2429e8be8625"],
    scope: [
      "Construction of a 20-seater eco-friendly toilet facility for the Anyimadukrom community.",
      "Eco-sanitation design supporting safe waste handling and environmental protection.",
      "Civil works including structure, ventilation and site development.",
      "Public health infrastructure delivered for community use."
    ],
    services: ["Civil Engineering", "Water & Infrastructure Services", "Environmental Responsibility"]
  },
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
    img: "photo-1586773860418-d37222d8fce3",
    imgAlt: "Renovation works at the AngloGold Ashanti Mine Hospital for the AGA Health Foundation",
    gallery: ["photo-1586773860418-d37222d8fce3", "photo-1581091226825-a6a2a5aee158", "photo-1512917774080-9991f1c4c750"],
    scope: [
      "Renovation works within the operational AngloGold Ashanti Mine Hospital environment.",
      "Upgrades delivered under strict safety and infection-control site protocols.",
      "Building, finishing and servicing works coordinated with hospital operations.",
      "Delivered for the AGA Health Foundation."
    ],
    services: ["Renovation Works", "Commercial Construction", "Safety Management"]
  },
  {
    slug: "anyinam-methodist-school",
    name: "Anyinam Methodist School — Classrooms Block",
    title: "Renovation of Primary 'A' Classrooms Block — Anyinam Methodist School | X-Mell Company Ltd",
    description: "X-Mell Company Ltd renovated the Primary 'A' Classrooms Block at Anyinam Methodist School, Obuasi — education infrastructure renovation in Ghana.",
    category: "Renovation · Education",
    keywords: "school renovation Ghana, classroom block renovation Obuasi, education construction Ghana, X-Mell Company",
    location: "Anyinam, Obuasi, Ashanti Region, Ghana",
    client: "Anyinam Methodist School",
    type: "Renovation — Education Facility",
    img: "photo-1562774053-701939374585",
    imgAlt: "Renovation of the Primary A classrooms block at Anyinam Methodist School",
    gallery: ["photo-1562774053-701939374585", "photo-1580582932707-520aed937b7b", "photo-1503387762-592deb58ef4e"],
    scope: [
      "Renovation of the Primary 'A' Classrooms Block at Anyinam Methodist School.",
      "Structural repairs, roofing, flooring and finishing works.",
      "Improved, safer learning environment delivered for pupils and staff.",
      "Works scheduled to respect the operating school calendar."
    ],
    services: ["Renovation Works", "Building Construction", "Project Management"]
  },
  {
    slug: "kajaji-hotel",
    name: "Kajaji Three-Storey Hotel Project",
    title: "Three-Storey Hotel Project — Kajaji, Bono-East | X-Mell Company Ltd",
    description: "X-Mell Company Ltd constructed a three-storey hotel in Kajaji, Bono-East Region — commercial hospitality construction in Ghana.",
    category: "Commercial · Hospitality",
    keywords: "hotel construction Ghana, commercial construction Bono-East, hospitality building Ghana, X-Mell Company",
    location: "Kajaji, Bono-East Region, Ghana",
    client: "Private Client",
    type: "Commercial Construction — Hospitality",
    img: "photo-1566073771259-6a8506099945",
    imgAlt: "Three-storey hotel project at Kajaji, Bono-East Region",
    gallery: ["photo-1566073771259-6a8506099945", "photo-1545324418-cc1a3fa10c00", "photo-1600585154340-be6161a56a0c"],
    scope: [
      "Construction of a three-storey hotel building in Kajaji, Bono-East Region.",
      "Reinforced concrete frame, masonry and full building envelope works.",
      "Guest rooms, circulation and service areas built to hospitality standards.",
      "Multi-storey structural delivery outside our home region — nationwide capability."
    ],
    services: ["Commercial Construction", "Civil Engineering", "Project Management"]
  }
];

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "projects");
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const check = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;
const arrow = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`;

const img = (id, w, alt, eager) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80" alt="${alt}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'}`;

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
  <meta property="og:image" content="https://images.unsplash.com/${p.img}?auto=format&fit=crop&w=1200&q=80">
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
    "image": "https://images.unsplash.com/${p.img}?auto=format&fit=crop&w=1200&q=80",
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
      <a href="../index.html#contact" class="btn btn-amber header-cta desktop">Request a Quote</a>
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
            ${p.scope.map((s) => `<li style="color:var(--steel)"><span class="tick" style="border-color:var(--charcoal);background:var(--charcoal);color:var(--amber)">${check}</span>${s}</li>`).join("\n            ")}
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
