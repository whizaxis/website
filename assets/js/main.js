/* WhizAxis — site scripts */
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      toggle.classList.toggle("active");
      nav.classList.toggle("open");
      document.body.style.overflow = nav.classList.contains("open") ? "hidden" : "";
    });
    nav.querySelectorAll(".has-drop > button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (window.innerWidth <= 960) btn.parentElement.classList.toggle("open");
      });
    });
  }

  // Industry tabs
  var tabs = document.querySelectorAll(".ind-tab");
  var panel = document.querySelector(".ind-panel");
  if (tabs.length && panel) {
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) { t.classList.remove("active"); });
        tab.classList.add("active");
        panel.querySelector(".big-ic").textContent = tab.dataset.icon;
        panel.querySelector("h3").textContent = tab.dataset.title;
        panel.querySelector("p").textContent = tab.dataset.text;
        var chips = panel.querySelector(".chips");
        chips.innerHTML = "";
        tab.dataset.chips.split("|").forEach(function (c) {
          var s = document.createElement("span");
          s.className = "chip"; s.textContent = c; chips.appendChild(s);
        });
      });
    });
  }

  // FAQ accordion
  document.querySelectorAll(".faq-q").forEach(function (q) {
    q.addEventListener("click", function () {
      var item = q.parentElement;
      var a = item.querySelector(".faq-a");
      var open = item.classList.toggle("open");
      a.style.maxHeight = open ? a.scrollHeight + "px" : "0";
    });
  });

  // Count-up numbers
  var counters = document.querySelectorAll("[data-count]");
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target, end = parseInt(el.dataset.count, 10), suffix = el.dataset.suffix || "", cur = 0;
      var stepAmt = Math.max(1, Math.ceil(end / 40));
      var timer = setInterval(function () {
        cur += stepAmt;
        if (cur >= end) { cur = end; clearInterval(timer); }
        el.textContent = cur + suffix;
      }, 30);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(function (c) { io.observe(c); });

  // Reveal on scroll
  var rv = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); rv.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (el) { rv.observe(el); });

  // Contact forms
  // To receive messages without a mail app, create a free form at formspree.io
  // and paste your form ID below (e.g. "xyzabcd"). Leave empty to use email instead.
  var FORMSPREE_ID = "";
  var TO_EMAIL = "info@whizaxis.com";

  document.querySelectorAll("form.contact-form").forEach(function (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var msg = form.querySelector(".form-msg");
      if (form.querySelector(".hp input").value) return; // spam trap
      var data = new FormData(form);

      if (FORMSPREE_ID) {
        fetch("https://formspree.io/f/" + FORMSPREE_ID, {
          method: "POST", body: data, headers: { Accept: "application/json" }
        }).then(function (r) {
          msg.className = "form-msg " + (r.ok ? "ok" : "err");
          msg.textContent = r.ok ? "Thank you! We will get back to you within one business day." : "Something went wrong. Please email us directly.";
          if (r.ok) form.reset();
        }).catch(function () {
          msg.className = "form-msg err"; msg.textContent = "Network error. Please email us directly.";
        });
      } else {
        var body = "Name: " + data.get("name") + "\nCompany: " + (data.get("company") || "") +
          "\nEmail: " + data.get("email") + "\nPhone: " + (data.get("phone") || "") +
          "\nService: " + data.get("service") + "\n\n" + data.get("message");
        window.location.href = "mailto:" + TO_EMAIL + "?subject=" +
          encodeURIComponent("Website enquiry – " + data.get("service")) + "&body=" + encodeURIComponent(body);
        msg.className = "form-msg ok";
        msg.textContent = "Your email app is opening. Press send to reach us.";
      }
    });
  });

  // Year in footer
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
});
