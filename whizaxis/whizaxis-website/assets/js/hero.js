/* WhizAxis — home hero animations
   1) Headline: words slide in, "Complexity" scrambles, last line types and rotates.
   2) Orbit: scattered tools (complexity) -> one connected system -> AI moving work
      between departments (operational excellence). Loops; pauses when off-screen.
   To change the rotating phrases, edit data-words on .type-text in index.html. */
(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Headline ---------------- */
  var title = document.querySelector(".hero-title");
  var typeEl = document.querySelector(".type-text");
  var caret = document.querySelector(".type-caret");
  if (title && typeEl && !reduce) {
    title.classList.add("anim");
    var words = (typeEl.dataset.words || typeEl.textContent).split("|");

    // scramble "Complexity" once, then settle
    var sc = title.querySelector(".w-scramble");
    if (sc) {
      var finalTxt = sc.textContent, glyphs = "#%&*<>/\\[]{}=+?~", frame = 0, total = 26;
      sc.style.width = sc.getBoundingClientRect().width + "px";
      sc.classList.add("scrambling");
      setTimeout(function run() {
        frame++;
        var out = "";
        for (var i = 0; i < finalTxt.length; i++) {
          out += i < (frame / total) * finalTxt.length ? finalTxt[i] : glyphs[Math.floor(Math.random() * glyphs.length)];
        }
        sc.textContent = out;
        if (frame < total) setTimeout(run, 38);
        else { sc.textContent = finalTxt; sc.classList.remove("scrambling"); sc.style.width = ""; }
      }, 250);
    }

    // Build every phrase up front, stacked in the same spot. The box takes the size of the
    // longest phrase, and letters are only shown/hidden, so lines never re-wrap or jump.
    var wrap = typeEl.parentElement;
    wrap.classList.add("js");
    wrap.removeChild(typeEl);
    var phrases = words.map(function (w) {
      var el = document.createElement("span");
      el.className = "tw grad-text";
      var chars = [];
      var broke = false;
      for (var i = 0; i < w.length; i++) {
        if (w[i] === " " && !broke) { el.appendChild(document.createElement("br")); broke = true; continue; } // first space = new line
        var c = document.createElement("span");
        c.className = "ch"; c.textContent = w[i];
        el.appendChild(c); chars.push(c);
      }
      wrap.insertBefore(el, caret);
      return { el: el, chars: chars };
    });
    function placeCaret(ph, n) {
      if (!caret) return;
      var box = wrap.getBoundingClientRect();
      var ref = n > 0 ? ph.chars[n - 1] : ph.chars[0];
      var r = ref.getBoundingClientRect();
      var x = (n > 0 ? r.right : r.left) - box.left + 2;
      var y = r.top - box.top + r.height * 0.12;
      caret.style.height = (r.height * 0.78) + "px";
      caret.style.transform = "translate(" + x + "px," + y + "px)";
    }
    var wi = 0, ci = 0, deleting = false;
    phrases[0].el.classList.add("cur");
    placeCaret(phrases[0], 0);
    window.addEventListener("resize", function () { placeCaret(phrases[wi], ci); });
    function typeLoop() {
      var ph = phrases[wi];
      caret && caret.classList.add("typing");
      if (!deleting) {
        ph.chars[ci].classList.add("on"); ci++;
        placeCaret(ph, ci);
        if (ci === ph.chars.length) {
          deleting = true;
          caret && caret.classList.remove("typing");
          return setTimeout(typeLoop, wi === 0 ? 3800 : 2600); // hold the main phrase longer
        }
        return setTimeout(typeLoop, 55 + Math.random() * 45);
      }
      ci--; ph.chars[ci].classList.remove("on");
      placeCaret(ph, ci);
      if (ci === 0) {
        deleting = false;
        ph.el.classList.remove("cur");
        wi = (wi + 1) % phrases.length;
        phrases[wi].el.classList.add("cur");
        placeCaret(phrases[wi], 0);
        return setTimeout(typeLoop, 350);
      }
      setTimeout(typeLoop, 28);
    }
    setTimeout(typeLoop, 1000);
  }

  /* ---------------- Orbit ---------------- */
  var card = document.querySelector(".orbit-card");
  if (!card) return;
  var nodes = [].slice.call(card.querySelectorAll(".onode"));
  var trail = card.querySelector(".o-trail");
  var dot = card.querySelector(".o-dot");
  var halo = card.querySelector(".o-dot-halo");
  var spoke = card.querySelector(".o-spoke");
  var tangle = card.querySelector(".o-tangle");
  var status = card.querySelector(".core-status");
  var stateTxt = card.querySelector(".orbit-state b");
  var feed = card.querySelector(".orbit-feed");
  var pill = document.querySelector(".hero-pill");
  var pillItems = pill ? pill.querySelectorAll(".pill-item") : [];
  var R = 165, C = 250, N = nodes.length, STEP = 360 / N;

  // orbit position (%) and a messy "before" position for each node
  var chaosPos = [[24, 28, -14], [70, 27, 11], [33, 80, 8], [78, 67, -9], [20, 46, 16], [48, 15, -18]];
  function pt(deg, r) { var a = deg * Math.PI / 180; return [C + r * Math.sin(a), C - r * Math.cos(a)]; }
  nodes.forEach(function (n, i) {
    var p = pt(i * STEP, R);
    n.style.setProperty("--ox", (p[0] / 5) + "%");
    n.style.setProperty("--oy", (p[1] / 5) + "%");
    var k = chaosPos[i % chaosPos.length];
    n.style.setProperty("--kx", k[0] + "%");
    n.style.setProperty("--ky", k[1] + "%");
    n.style.setProperty("--kr", k[2] + "deg");
  });

  // tangled lines between the scattered tools
  var pairs = [[0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 0], [5, 2], [1, 4], [3, 0]];
  var svgNS = "http://www.w3.org/2000/svg";
  pairs.forEach(function (pr, j) {
    var a = chaosPos[pr[0]], b = chaosPos[pr[1]];
    var x1 = a[0] * 5, y1 = a[1] * 5, x2 = b[0] * 5, y2 = b[1] * 5;
    var bend = (j % 2 ? 1 : -1) * (60 + j * 9);
    var mx = (x1 + x2) / 2 + bend, my = (y1 + y2) / 2 - bend * .6;
    var path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", "M" + x1 + " " + y1 + " Q" + mx + " " + my + " " + x2 + " " + y2);
    tangle.appendChild(path);
  });

  function setTrail(from, to) {
    var len = Math.max(0, to - from);
    trail.style.strokeDasharray = len + " 360";
    trail.style.strokeDashoffset = -from;
  }
  function setDot(deg) {
    var p = pt(deg, R);
    dot.setAttribute("cx", p[0]); dot.setAttribute("cy", p[1]);
    halo.setAttribute("cx", p[0]); halo.setAttribute("cy", p[1]);
  }
  function setSpoke(i) {
    var p = pt(i * STEP, R - 34);
    spoke.setAttribute("x2", p[0]); spoke.setAttribute("y2", p[1]);
    spoke.classList.add("on");
  }
  function setStatus(txt) {
    status.classList.add("swap");
    setTimeout(function () { status.textContent = txt; status.classList.remove("swap"); }, 220);
  }
  function setPhase(p) { // 0 complexity, 1 transformation, 2 AI & automation
    card.classList.toggle("chaos", p === 0);
    card.classList.toggle("organizing", p === 1);
    if (pill) {
      pill.classList.add("live");
      pill.classList.remove("p0", "p1", "p2"); pill.classList.add("p" + p);
      [].forEach.call(pillItems, function (el, k) { el.classList.toggle("on", k === p); });
    }
  }
  function log(label, text, warn) {
    var li = document.createElement("li");
    if (warn) li.className = "warn";
    li.innerHTML = '<span class="ck">' + (warn ? "!" : "✓") + "</span><b></b><span class=\"t\"></span>";
    li.querySelector("b").textContent = label;
    li.querySelector(".t").textContent = text;
    feed.insertBefore(li, feed.firstChild);
    while (feed.children.length > 3) feed.removeChild(feed.lastChild);
  }

  // Reduced motion: show the finished, connected state only
  if (reduce) {
    setPhase(2);
    nodes.forEach(function (n) { n.classList.add("done"); });
    setTrail(0, 360); dot.style.opacity = 0; halo.style.opacity = 0;
    status.textContent = "All connected";
    stateTxt.textContent = "One connected system";
    log("Lead-to-cash", "Every department on one system");
    return;
  }

  // A small clock that only runs while the hero is visible
  var clock = 0, last = null, paused = false, jobs = [];
  function tick(now) {
    if (last !== null && !paused) clock += Math.min(now - last, 100);
    last = now;
    jobs.slice().forEach(function (j) { j(); });
    requestAnimationFrame(tick);
  }
  function drop(fn) { var k = jobs.indexOf(fn); if (k > -1) jobs.splice(k, 1); }
  function wait(ms) {
    return new Promise(function (res) {
      var end = clock + ms;
      var fn = function () { if (clock >= end) { drop(fn); res(); } };
      jobs.push(fn);
    });
  }
  function tween(ms, onFrame) {
    return new Promise(function (res) {
      var s = clock;
      var fn = function () {
        var p = Math.min(1, (clock - s) / ms);
        onFrame(p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);
        if (p >= 1) { drop(fn); res(); }
      };
      jobs.push(fn);
    });
  }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) { paused = !es[0].isIntersecting; }, { threshold: 0.05 }).observe(card);
  }
  requestAnimationFrame(tick);

  var complexity = [
    ["Sales", "Order re-typed into Excel"],
    ["Inventory", "Stock count doesn't match"],
    ["Accounting", "Month-end close running late"]
  ];

  // start in the scattered state without a visible slide
  card.classList.add("no-trans"); setPhase(0); void card.offsetWidth;
  setTimeout(function () { card.classList.remove("no-trans"); }, 50);

  async function story() {
    for (;;) {
      // 1 — Business complexity
      setPhase(0);
      nodes.forEach(function (n) { n.classList.remove("done", "active"); });
      spoke.classList.remove("on");
      setTrail(0, 0); setDot(0);
      status.textContent = "Complexity";
      stateTxt.textContent = "Disconnected tools";
      for (var c = 0; c < complexity.length; c++) { log(complexity[c][0], complexity[c][1], true); await wait(900); }
      await wait(700);

      // 2 — Business transformation
      setPhase(1);
      stateTxt.textContent = "Transforming";
      setStatus("Connecting");
      log("WhizAxis", "Processes mapped to one ERP");
      await wait(1700);

      // 3 — AI & automation: work flows around the connected system
      setPhase(2);
      stateTxt.textContent = "Live · AI at work";
      for (var lap = 0; lap < 2; lap++) {
        for (var i = 0; i < N; i++) {
          var n = nodes[i];
          n.classList.add("active");
          setSpoke(i);
          setStatus(n.dataset.status);
          log(n.querySelector(".olabel").textContent, n.dataset.event);
          await wait(1500);
          n.classList.remove("active"); n.classList.add("done");
          var from = i * STEP;
          await tween(850, function (e) { var d = from + STEP * e; setTrail(0, d); setDot(d); });
        }
        spoke.classList.remove("on");
        setStatus("All connected");
        log("Lead-to-cash", "Full cycle closed in one system");
        await wait(2400);
        if (lap === 0) {
          nodes.forEach(function (n) { n.classList.remove("done"); });
          setTrail(0, 0); setDot(0);
        }
      }
      await wait(600);
    }
  }
  story();
})();
