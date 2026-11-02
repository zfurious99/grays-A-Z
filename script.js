// Open / closed status, computed in Michigan time
(function () {
  var weekday = [480, 1080];
  var schedule = { 0: null, 1: weekday, 2: weekday, 3: weekday, 4: weekday, 5: weekday, 6: null };
  var el = document.getElementById("open-status");
  if (!el) return;
  try {
    var parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Detroit", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23" }).formatToParts(new Date());
    var get = function (t) { return parts.find(function (p) { return p.type === t; }).value; };
    var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
    var mins = (parseInt(get("hour"), 10) % 24) * 60 + parseInt(get("minute"), 10);
    document.querySelectorAll(".hours tr").forEach(function (tr) {
      if (tr.dataset.days.split(",").indexOf(String(day)) !== -1) tr.classList.add("today");
    });
    var hrs = schedule[day];
    if (hrs && mins >= hrs[0] && mins < hrs[1]) {
      el.textContent = "Open now · until 6 PM";
      el.classList.add("open");
    } else {
      el.textContent = "Closed now";
    }
    el.hidden = false;
  } catch (e) { /* hours table still shows without the status */ }
})();

// Phone / tablet menu
(function () {
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  function setOpen(open) {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Close" : "Menu";
  }

  toggle.addEventListener("click", function () {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      setOpen(false);
      toggle.focus();
    }
  });
})();

// Quote form: keep photo uploads under Netlify's size limit
(function () {
  var form = document.getElementById("quote-form");
  var msg = document.getElementById("photo-msg");
  if (!form || !msg) return;
  var LIMIT = 8 * 1024 * 1024;
  var inputs = form.querySelectorAll('input[type="file"]');

  function totalSize() {
    var total = 0;
    inputs.forEach(function (input) {
      if (input.files && input.files[0]) total += input.files[0].size;
    });
    return total;
  }

  function check() {
    var mb = totalSize() / (1024 * 1024);
    if (mb * 1024 * 1024 > LIMIT) {
      msg.textContent = "Your photos add up to " + mb.toFixed(1) + " MB. The limit is 8 MB, so remove one, or text your photos to (781) 500-2445 instead.";
      msg.classList.add("error");
      return false;
    }
    msg.textContent = "Up to 3 photos, 8 MB total.";
    msg.classList.remove("error");
    return true;
  }

  inputs.forEach(function (input) { input.addEventListener("change", check); });
  form.addEventListener("submit", function (e) {
    if (!check()) {
      e.preventDefault();
      msg.focus();
    }
  });
})();
