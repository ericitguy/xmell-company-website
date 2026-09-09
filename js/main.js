/* ============================================================
   X-MELL — SHARED SITE BEHAVIOUR
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Skip link visibility fallback ---------- */
  var skipLink = document.querySelector(".skip-link");
  if (skipLink) {
    skipLink.addEventListener("focus", function () { skipLink.classList.add("focused"); });
    skipLink.addEventListener("blur", function () { skipLink.classList.remove("focused"); });
  }

  /* ---------- Header state ---------- */
  var header = document.getElementById("siteHeader");
  var lastScrolled = null;
  function onScroll() {
    if (!header) return;
    var scrolled = window.scrollY > 24;
    if (scrolled !== lastScrolled) {
      header.classList.toggle("scrolled", scrolled);
      lastScrolled = scrolled;
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("primaryNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
  var counters = document.querySelectorAll("[data-count]");

  function animateCounter(el) {
    if (el.dataset.done) return;
    el.dataset.done = "1";
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = target;
      return;
    }
    var dur = 1400;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // Viewport check used both by the observer and as a guaranteed fallback:
  // content must never stay hidden if IntersectionObserver is unavailable or suspended.
  function checkViewport() {
    var threshold = window.innerHeight - 40;
    revealEls.forEach(function (el) {
      if (el.classList.contains("in")) return;
      if (el.getBoundingClientRect().top < threshold) el.classList.add("in");
    });
    counters.forEach(function (el) {
      if (el.dataset.done) return;
      var top = el.getBoundingClientRect().top;
      if (top < window.innerHeight * 0.6) animateCounter(el);
    });
  }

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });

    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  // Direct scroll/resize fallback (cheap after first pass — elements exit the
  // loop via their class check) + safety sweep after load
  function onViewportChange() {
    checkViewport();
  }
  window.addEventListener("scroll", onViewportChange, { passive: true });
  window.addEventListener("resize", onViewportChange, { passive: true });
  window.addEventListener("load", checkViewport);
  setTimeout(checkViewport, 1200);
  checkViewport();

  /* ---------- Project filter ---------- */
  var filterBar = document.querySelector(".filter-bar");
  var projCards = document.querySelectorAll(".proj-card[data-category]");
  if (filterBar && projCards.length) {
    filterBar.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (!btn) return;
      var filter = btn.getAttribute("data-filter");
      filterBar.querySelectorAll(".filter-btn").forEach(function (b) {
        b.classList.toggle("active", b === btn);
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      projCards.forEach(function (card) {
        var cats = (card.getAttribute("data-category") || "").split(/\s+/);
        var show = filter === "all" || cats.indexOf(filter) !== -1;
        card.classList.toggle("hidden", !show);
      });
    });
  }

  /* ---------- Enquiry form ---------- */
  var form = document.getElementById("enquiryForm");
  var status = document.getElementById("formStatus");
  var summary = document.getElementById("errorSummary");
  if (form) {
    form.setAttribute("novalidate", "");

    var labels = { "f-name": "Full name", "f-email": "Email", "f-phone": "Phone", "f-type": "Project type", "f-message": "Message" };

    function validateField(field) {
      var ok = !!field.value.trim();
      var errEl = document.getElementById(field.id + "-error");
      if (ok) {
        field.removeAttribute("aria-invalid");
        field.style.borderColor = "";
        if (errEl) errEl.textContent = "";
      } else {
        field.setAttribute("aria-invalid", "true");
        field.style.borderColor = "#ff6b5e";
        if (errEl) errEl.textContent = (labels[field.id] || "This field") + " is required.";
      }
      return ok;
    }

    // Inline validation on blur, cleared as the user fixes the field
    form.querySelectorAll("[required]").forEach(function (field) {
      field.addEventListener("blur", function () {
        if (field.getAttribute("aria-invalid") === "true" || field.value.trim()) validateField(field);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var firstInvalid = null;
      form.querySelectorAll("[required]").forEach(function (field) {
        if (!validateField(field) && !firstInvalid) firstInvalid = field;
      });

      if (firstInvalid) {
        if (summary) {
          summary.textContent = "Some fields need attention before we can send your enquiry. Fields marked in red are required.";
          summary.classList.add("show");
        }
        if (status) status.classList.remove("show");
        firstInvalid.focus();
        return;
      }
      if (summary) summary.classList.remove("show");

      // Build a WhatsApp handoff with the enquiry details
      var data = new FormData(form);
      var lines = [
        "Hello X-Mell, I'd like to request a consultation.",
        "",
        "Name: " + (data.get("name") || ""),
        "Organization: " + (data.get("organization") || "—"),
        "Email: " + (data.get("email") || ""),
        "Phone: " + (data.get("phone") || ""),
        "Project Type: " + (data.get("projectType") || "—"),
        "Project Location: " + (data.get("projectLocation") || "—"),
        "Estimated Scope: " + (data.get("projectScope") || "—"),
        "",
        "Message: " + (data.get("message") || "")
      ];
      var waUrl = "https://wa.me/233248705479?text=" + encodeURIComponent(lines.join("\n"));

      if (status) {
        status.textContent = "Thank you — opening WhatsApp to send your enquiry…";
        status.classList.add("show");
      }
      window.open(waUrl, "_blank", "noopener");
      form.reset();
    });

    // Clear stale error styling when the user starts typing again
    form.addEventListener("input", function (e) {
      var field = e.target;
      if (field.matches("[required]") && field.getAttribute("aria-invalid") === "true" && field.value.trim()) {
        validateField(field);
      }
    });
  }

  /* ---------- Active nav indicator ---------- */
  var navLinks = document.querySelectorAll('.nav a[href*="#"]');
  if (navLinks.length && "IntersectionObserver" in window) {
    var sections = [];
    navLinks.forEach(function (link) {
      var hash = link.getAttribute("href").split("#")[1];
      if (!hash) return;
      var sec = document.getElementById(hash);
      if (sec) sections.push({ link: link, sec: sec });
    });
    if (sections.length) {
      var nio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navLinks.forEach(function (l) { l.classList.remove("active"); });
            var match = sections.find(function (s) { return s.sec === entry.target; });
            if (match) {
              navLinks.forEach(function (l) { l.removeAttribute("aria-current"); });
              match.link.setAttribute("aria-current", "true");
            }
          }
        });
      }, { rootMargin: "-30% 0px -60% 0px" });
      sections.forEach(function (s) { nio.observe(s.sec); });
    }
  }
})();
