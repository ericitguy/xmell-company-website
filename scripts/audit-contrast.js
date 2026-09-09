/* WCAG AA contrast audit for the X-Mell site.
   Run: node scripts/audit-contrast.js
   Computes contrast ratios for every foreground/background pair actually used,
   with alpha compositing for translucent layers. */

function hexToRgb(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  return [0, 1, 2].map(i => parseInt(hex.slice(i * 2, i * 2 + 2), 16) / 255);
}

function relLum(rgb) {
  const [r, g, b] = rgb.map(c => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(fg, bg) {
  const l1 = relLum(fg), l2 = relLum(bg);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

// Composite rgba over solid background
function composite(fgRgba, bgRgb) {
  const a = fgRgba[3];
  return fgRgba.slice(0, 3).map((c, i) => c * a + bgRgb[i] * (1 - a));
}

const C = {
  charcoal: hexToRgb('#0e1116'),
  graphite: hexToRgb('#1a1f26'),
  graphite2: hexToRgb('#232a33'),
  steel: hexToRgb('#3d4653'),
  mist: hexToRgb('#8a94a1'),
  cloud: hexToRgb('#c6ccd4'),
  paper: hexToRgb('#f6f7f8'),
  white: hexToRgb('#ffffff'),
  amber: hexToRgb('#f5a800'),
  amberDeep: hexToRgb('#d99400'),
  amberInk: hexToRgb('#8a6400'),
  errorRed: hexToRgb('#ff6b5e')
};

const results = [];
function check(name, fg, bg, sizes) {
  const ratio = contrast(fg, bg);
  const normal = ratio >= 4.5, large = ratio >= 3.0;
  results.push({ name, ratio: ratio.toFixed(2), normal, large, sizes });
}

// ============ DARK SECTIONS (charcoal bg) ============
check('white on charcoal (headings/body)', C.white, C.charcoal);
check('cloud on charcoal (lead text)', C.cloud, C.charcoal);
check('mist on charcoal (secondary)', C.mist, C.charcoal);
check('amber on charcoal (eyebrows)', C.amber, C.charcoal);
check('amber on graphite (legend)', C.amber, C.graphite);

// Buttons
check('charcoal on amber (primary btn)', C.charcoal, C.amber);
check('white on charcoal (btn-dark)', C.white, C.charcoal);
check('white on charcoal btn ghost border-only', C.white, C.charcoal);

// header on scrolled bg (charcoal @ .92 over unknown — assume worst over dark image)
const headerBg = composite([0x0e / 255, 0x11 / 255, 0x16 / 255, 0.92], C.charcoal);
check('nav white-ish on header rgba', C.white, headerBg);
const navMuted = composite([0xff / 255, 0xff / 255, 0xff / 255, 0.78], C.charcoal);
check('nav link 78% white on header', navMuted, headerBg);

// ============ LIGHT SECTIONS ============
check('charcoal on paper', C.charcoal, C.paper);
check('charcoal on white', C.charcoal, C.white);
check('steel on white (muted body)', C.steel, C.white);
check('steel on paper', C.steel, C.paper);
check('amber-deep on white (value h3 hover)', C.amberInk, C.white);
check('amber-deep on paper', C.amberInk, C.paper);
check('amber-ink on white (light eyebrows)', C.amberInk, C.white);
check('amber-ink on paper', C.amberInk, C.paper);

// Form
check('error red on graphite (field-error)', C.errorRed, C.graphite);
check('error red on charcoal (error-summary)', C.errorRed, C.charcoal);
check('amber form-status on graphite', C.amber, C.graphite);
check('mist label on graphite (field labels)', C.mist, C.graphite);
check('white input text on charcoal field', C.white, C.charcoal);

// Stats strip (amber bg)
check('charcoal on amber (stat numbers)', C.charcoal, C.amber);
check('charcoal 72% on amber (stat labels)', composite([0x0e / 255, 0x11 / 255, 0x16 / 255, 0.72], C.amber), C.amber);

// Mining overlay text (cloud on near-black overlay ~ #0a0c0f composite over image: worst-case light spot)
check('cloud on mining overlay (worst-case #1a1d22)', C.cloud, hexToRgb('#1a1d22'));

// Client cards hover: white name on charcoal
check('white client name on charcoal (hover)', C.white, C.charcoal);
check('steel client-sub on paper (fixed)', C.steel, C.paper);

// Footer
check('mist on charcoal (footer links)', C.mist, C.charcoal);
check('cloud on charcoal (footer headings white)', C.white, C.charcoal);

// ============ REPORT ============
console.log('WCAG 2.1 AA CONTRAST AUDIT — X-Mell Company Ltd');
console.log('='.repeat(70));
let fails = 0;
for (const r of results) {
  const status = r.normal ? 'PASS AA (4.5)' : (r.large ? 'PASS large-text only (3.0)' : 'FAIL');
  if (!r.normal) fails++;
  console.log(`${status.padEnd(26)} ${String(r.ratio).padStart(5)}:1  ${r.name}`);
}
console.log('='.repeat(70));
console.log(`${results.length} pairs checked, ${results.filter(r => !r.normal).length} below 4.5:1 (${fails} strict fails)\n`);
