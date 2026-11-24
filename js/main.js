/* Kreung LA — small bits of interactivity. No libraries needed. */
(function () {
  "use strict";

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      }
    });
  }

  /* ---------- Hero video: respect reduced-motion and data saver ---------- */
  var video = document.querySelector(".hero__media video");
  if (video) {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var saveData = navigator.connection && navigator.connection.saveData;
    if (reduce || saveData) {
      video.removeAttribute("autoplay");
      video.pause();
    }
  }

  /* ---------- Hide the floating "Get a quote" button when the form is on screen ---------- */
  var mobileCta = document.querySelector(".mobile-cta");
  var quote = document.getElementById("quote");
  if (mobileCta && "IntersectionObserver" in window) {
    var targets = [quote, document.querySelector(".hero"), document.querySelector(".page-hero"), document.querySelector(".site-footer")].filter(Boolean);
    var visible = new Set();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) visible.add(en.target); else visible.delete(en.target);
      });
      mobileCta.classList.toggle("is-hidden", visible.size > 0);
    }, { threshold: 0.05 });
    targets.forEach(function (t) { io.observe(t); });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Quote estimator ----------
     PLACEHOLDER PRICES — Sam to confirm. Change the numbers here and
     the estimate on the page updates automatically. */
  var PRICING = {
    packages: {            // price per guest
      classic: 24,
      signature: 32,
      feast: 40
    },
    service: {             // flat fee + per-guest add-on
      dropoff: { flat: 75, perGuest: 0, label: "Drop-off delivery" },
      buffet: { flat: 150, perGuest: 4, label: "Buffet setup + staff" },
      grill: { flat: 450, perGuest: 6, label: "Live grill on-site" }
    },
    extras: {              // per guest
      dessert: 4,
      drinks: 3,
      disposables: 2
    },
    minGuests: 20
  };

  var form = document.getElementById("quote-form");
  if (!form) return;

  // Pre-select event type from the link, e.g. /?event=corporate#quote
  var params = new URLSearchParams(window.location.search);
  var eventParam = params.get("event");
  var eventSelect = form.querySelector("#event-type");
  if (eventParam && eventSelect) {
    Array.prototype.forEach.call(eventSelect.options, function (opt) {
      if (opt.value === eventParam) eventSelect.value = eventParam;
    });
  }

  var guests = form.querySelector("#guests");
  var guestsOut = form.querySelector("#guests-out");
  var totalEl = document.getElementById("estimate-total");
  var linesEl = document.getElementById("estimate-lines");
  var hiddenEstimate = form.querySelector("#estimate-field");

  function money(n) {
    return "$" + Math.round(n).toLocaleString("en-US");
  }

  function update() {
    var g = Math.max(PRICING.minGuests, parseInt(guests.value, 10) || PRICING.minGuests);
    guestsOut.textContent = guests.value >= 300 ? "300+" : g;

    var pkgInput = form.querySelector('input[name="package"]:checked');
    var svcInput = form.querySelector('input[name="service"]:checked');
    var pkg = pkgInput ? pkgInput.value : "classic";
    var svc = svcInput ? svcInput.value : "dropoff";

    var food = PRICING.packages[pkg] * g;
    var s = PRICING.service[svc];
    var service = s.flat + s.perGuest * g;
    var extras = 0;
    form.querySelectorAll('input[name="extras"]:checked').forEach(function (el) {
      extras += (PRICING.extras[el.value] || 0) * g;
    });
    var total = food + service + extras;
    // Show a friendly range rather than an exact number
    var low = total * 0.92, high = total * 1.1;

    totalEl.textContent = money(low) + " – " + money(high);
    linesEl.innerHTML =
      "<li>Food: " + money(food) + " (" + g + " guests × " + money(PRICING.packages[pkg]) + ")</li>" +
      "<li>" + s.label + ": " + money(service) + "</li>" +
      (extras ? "<li>Add-ons: " + money(extras) + "</li>" : "");

    if (hiddenEstimate) {
      hiddenEstimate.value = money(low) + " – " + money(high) + " (" + g + " guests, " + pkg + ", " + svc + ")";
    }
  }

  form.addEventListener("input", update);
  form.addEventListener("change", update);
  update();
})();
