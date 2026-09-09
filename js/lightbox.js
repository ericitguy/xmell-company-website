/* ============================================================
   X-MELL — LIGHTBOX
   Gallery lightbox for project detail pages.
   - Keyboard: ← → navigate, +/- zoom, 0 reset, Escape close
   - Click image: zoom to click point; click again: reset
   - Arrow buttons + counter for mouse/touch users
   - Focus is trapped while open and restored on close
   ============================================================ */
(function () {
  "use strict";

  var galleries = document.querySelectorAll(".gallery");
  if (!galleries.length) return;

  /* ---------- Shared overlay, built once on first open ---------- */
  var overlay = null, stage = null, imgEl = null, counter = null, caption = null, hint = null, live = null;
  var prevBtn = null, nextBtn = null, closeBtn = null, zoomBtn = null;
  var items = [];
  var current = 0;
  var zoomed = false;
  var lastFocused = null;

  var ICON = {
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
    zoomIn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>',
    zoomOut: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/><path d="M8 11h6"/></svg>',
    prev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>'
  };

  function buildOverlay() {
    overlay = document.createElement("div");
    overlay.className = "lightbox";
    overlay.hidden = true;
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Project image viewer");

    overlay.innerHTML =
      '<div class="lb-header">' +
      '  <span class="lb-counter"></span>' +
      '  <span class="lb-zoom-hint" aria-hidden="true"><span class="lb-key">CLICK</span> or press + to zoom · 0 to reset</span>' +
      '</div>' +
      '<div class="lb-stage">' +
      '  <img alt="">' +
      '  <button type="button" class="lb-btn lb-nav lb-prev" aria-label="Previous image">' + ICON.prev + '</button>' +
      '  <button type="button" class="lb-btn lb-nav lb-next" aria-label="Next image">' + ICON.next + '</button>' +
      '</div>' +
      '<p class="lb-caption"></p>' +
      '<div class="lb-actions" style="position:absolute;right:clamp(0.8rem,2.5vw,2rem);top:clamp(0.8rem,2.5vw,2rem)">' +
      '  <button type="button" class="lb-btn lb-zoom" aria-label="Zoom image">' + ICON.zoomIn + '</button>' +
      '  <button type="button" class="lb-btn lb-close" aria-label="Close image viewer">' + ICON.close + '</button>' +
      '</div>';

    document.body.appendChild(overlay);

    // Live region announces image changes to screen readers
    live = document.createElement("span");
    live.className = "sr-only";
    live.setAttribute("aria-live", "polite");
    overlay.appendChild(live);

    stage = overlay.querySelector(".lb-stage");
    imgEl = overlay.querySelector(".lb-stage img");
    counter = overlay.querySelector(".lb-counter");
    caption = overlay.querySelector(".lb-caption");
    hint = overlay.querySelector(".lb-zoom-hint");
    prevBtn = overlay.querySelector(".lb-prev");
    nextBtn = overlay.querySelector(".lb-next");
    closeBtn = overlay.querySelector(".lb-close");
    zoomBtn = overlay.querySelector(".lb-zoom");

    closeBtn.addEventListener("click", close);
    zoomBtn.addEventListener("click", toggleZoomCenter);
    prevBtn.addEventListener("click", function () { step(-1); });
    nextBtn.addEventListener("click", function () { step(1); });

    // Zoom to click point
    imgEl.addEventListener("click", function (e) {
      if (!zoomed) {
        var rect = imgEl.getBoundingClientRect();
        var zx = ((e.clientX - rect.left) / rect.width) * 100;
        var zy = ((e.clientY - rect.top) / rect.height) * 100;
        setZoom(true, zx, zy);
      } else {
        setZoom(false);
      }
    });

    // Click on the dark backdrop (not the image or buttons) closes
    overlay.addEventListener("click", function (e) {
      if (e.target === stage) close();
    });

    document.addEventListener("keydown", onKeydown);
  }

  /* ---------- Zoom ---------- */
  function setZoom(on, zx, zy) {
    zoomed = on;
    if (on) {
      imgEl.classList.add("zoomed");
      imgEl.style.setProperty("--zx", (zx || 50) + "%");
      imgEl.style.setProperty("--zy", (zy || 50) + "%");
      zoomBtn.innerHTML = ICON.zoomOut;
      zoomBtn.setAttribute("aria-label", "Reset zoom");
      if (hint) hint.style.opacity = "0";
    } else {
      imgEl.classList.remove("zoomed");
      zoomBtn.innerHTML = ICON.zoomIn;
      zoomBtn.setAttribute("aria-label", "Zoom image");
      if (hint) hint.style.opacity = "";
    }
  }

  function toggleZoomCenter() {
    setZoom(!zoomed);
  }

  /* ---------- Navigation ---------- */
  function render() {
    var item = items[current];
    imgEl.src = item.src;
    imgEl.alt = item.alt;
    counter.textContent = "IMG " + String(current + 1).padStart(2, "0") + " / " + String(items.length).padStart(2, "0");
    caption.textContent = item.alt;
    if (live) live.textContent = "Image " + (current + 1) + " of " + items.length + ": " + item.alt;
    setZoom(false);
    prevBtn.disabled = items.length < 2;
    nextBtn.disabled = items.length < 2;
  }

  function step(dir) {
    if (items.length < 2) return;
    current = (current + dir + items.length) % items.length;
    render();
  }

  /* ---------- Focus management ---------- */
  function focusables() {
    return overlay.querySelectorAll("button:not(:disabled)");
  }

  function trapFocus(e) {
    var els = focusables();
    var first = els[0];
    var last = els[els.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function onKeydown(e) {
    if (overlay.hidden) return;
    switch (e.key) {
      case "Escape": close(); break;
      case "ArrowLeft": step(-1); break;
      case "ArrowRight": step(1); break;
      case "+": case "=": setZoom(true); break;
      case "-": case "_": setZoom(false); break;
      case "0": setZoom(false); break;
      case "Tab": trapFocus(e); break;
    }
  }

  /* ---------- Open / close ---------- */
  function open(galleryImgs, index) {
    if (!overlay) buildOverlay();
    items = galleryImgs.map(function (im) {
      // Use a larger source for the lightbox where the CDN pattern allows
      var src = im.currentSrc || im.src;
      return { src: src, alt: im.alt || "" };
    });
    current = index;
    lastFocused = document.activeElement;
    render();
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function close() {
    overlay.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  /* ---------- Wire gallery thumbnails ---------- */
  galleries.forEach(function (gallery) {
    gallery.querySelectorAll("img").forEach(function (im, i) {
      var wrap = document.createElement("button");
      wrap.type = "button";
      wrap.className = "gallery-item";
      wrap.setAttribute("aria-label", "View image: " + (im.alt || "project photo") + " (opens image viewer)");
      wrap.setAttribute("aria-haspopup", "dialog");
      im.parentNode.insertBefore(wrap, im);
      wrap.appendChild(im);
      wrap.addEventListener("click", function () {
        var all = [...gallery.querySelectorAll("img")];
        var idx = all.indexOf(im);
        open(all, idx === -1 ? i : idx);
      });
    });
  });
})();
