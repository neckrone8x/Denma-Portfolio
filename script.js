/* =========================================================
   DENMA SOLUTIONS — Portfolio + Live Project Apps
   Complete script.js — self-contained
   ========================================================= */

/* ==========================================================
   PART 1 — PORTFOLIO (typing, theme, menu, scroll, tilt, etc)
   ========================================================== */
document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Typing effect ---------- */
  var typedText = document.getElementById('typed-text');
  if (typedText) {
    var phrases = ['Frontend Developer', 'JavaScript Enthusiast', 'Arduino Explorer', 'Problem Solver'];
    var pI = 0, cI = 0, del = false;
    (function type() {
      var cur = phrases[pI];
      typedText.textContent = del ? cur.substring(0, cI - 1) : cur.substring(0, cI + 1);
      cI += del ? -1 : 1;
      var delay = del ? 55 : 100;
      if (!del && cI === cur.length) { delay = 1800; del = true; }
      else if (del && cI === 0) { del = false; pI = (pI + 1) % phrases.length; delay = 500; }
      setTimeout(type, delay);
    })();
  }

  /* ---------- Theme toggle ---------- */
  var themeToggle = document.getElementById('themeToggle');
  var themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
  function setTheme(t) {
    document.body.classList.toggle('light-theme', t === 'light');
    if (themeIcon) themeIcon.className = t === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    try { localStorage.setItem('theme', t); } catch (e) {}
  }
  if (themeToggle) themeToggle.addEventListener('click', function () {
    setTheme(document.body.classList.contains('light-theme') ? 'dark' : 'light');
  });
  try {
    var savedTheme = localStorage.getItem('theme');
    if (savedTheme) setTheme(savedTheme);
    else if (window.matchMedia('(prefers-color-scheme: light)').matches) setTheme('light');
  } catch (e) {}

  /* ---------- Mobile menu ---------- */
  var menuToggle = document.getElementById('menuToggle');
  var navLinks = document.getElementById('navLinks');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      var ic = menuToggle.querySelector('i');
      if (ic) ic.className = navLinks.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
    });
    navLinks.querySelectorAll('a').forEach(function (l) {
      l.addEventListener('click', function () {
        navLinks.classList.remove('open');
        var ic = menuToggle.querySelector('i');
        if (ic) ic.className = 'fas fa-bars';
      });
    });
  }

  /* ---------- Scroll progress ---------- */
  var prog = document.getElementById('scrollProgress');
  if (prog) window.addEventListener('scroll', function () {
    var h = document.documentElement;
    var pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    prog.style.width = pct + '%';
  });

  /* ---------- Scroll to top ---------- */
  var st = document.getElementById('scrollTop');
  if (st) {
    window.addEventListener('scroll', function () { st.classList.toggle('visible', window.scrollY > 400); });
    st.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  /* ---------- Copy email ---------- */
  var ce = document.getElementById('copyEmail');
  var toast = document.getElementById('toast');
  function showToast(m) {
    if (!toast) return;
    toast.textContent = m;
    toast.classList.add('show');
    setTimeout(function () { toast.classList.remove('show'); }, 2500);
  }
  if (ce) ce.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText('denisotieno955@gmail.com').then(function () {
        showToast('Email copied to clipboard!');
      }).catch(function () { showToast('Failed to copy email.'); });
    }
  });

  /* ---------- Year ---------- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- Counters ---------- */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries, o) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var el = en.target;
          var t = parseInt(el.getAttribute('data-count'), 10);
          var c = 0, inc = Math.max(1, Math.ceil(t / 60));
          (function up() {
            c += inc;
            if (c >= t) { el.textContent = t; return; }
            el.textContent = c;
            requestAnimationFrame(up);
          })();
          o.unobserve(el);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { obs.observe(c); });
  }

  /* ---------- 3D tilt on chip ---------- */
  var chip = document.getElementById('chipWrap');
  if (chip && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var MAX = 14, tRX = 0, tRY = 0, cRX = 0, cRY = 0;
    (function upd() {
      cRX += (tRX - cRX) * 0.12;
      cRY += (tRY - cRY) * 0.12;
      chip.style.setProperty('--rx', cRX.toFixed(2) + 'deg');
      chip.style.setProperty('--ry', cRY.toFixed(2) + 'deg');
      requestAnimationFrame(upd);
    })();
    chip.addEventListener('pointermove', function (e) {
      var r = chip.getBoundingClientRect();
      var x = e.clientX - r.left, y2 = e.clientY - r.top;
      tRY = ((x - r.width / 2) / (r.width / 2)) * MAX;
      tRX = -((y2 - r.height / 2) / (r.height / 2)) * MAX;
      chip.style.setProperty('--spot-x', x + 'px');
      chip.style.setProperty('--spot-y', y2 + 'px');
      chip.classList.add('hovering');
    });
    chip.addEventListener('pointerleave', function () {
      tRX = 0; tRY = 0;
      chip.classList.remove('hovering');
    });
  }

  /* ---------- Mouse glow ---------- */
  var mg = document.querySelector('.mouse-glow');
  if (mg) document.addEventListener('mousemove', function (e) {
    mg.style.left = e.clientX + 'px';
    mg.style.top = e.clientY + 'px';
  });

  /* ---------- tsParticles ---------- */
  if (typeof tsParticles !== 'undefined') {
    tsParticles.load('tsparticles', {
      fpsLimit: 60,
      particles: {
        color: { value: '#00e6d4' },
        links: { color: '#00e6d4', distance: 150, enable: true, opacity: 0.12, width: 1 },
        move: { enable: true, speed: 0.85, direction: 'none', random: true, straight: false, outModes: { default: 'bounce' } },
        number: { density: { enable: true, area: 900 }, value: 30 },
        opacity: { value: 0.28 },
        shape: { type: 'circle' },
        size: { value: { min: 1, max: 2.5 } }
      },
      detectRetina: true
    });
  }
});


/* ==========================================================
   PART 2 — LIVING CLICK-REACTIVE BACKGROUND
   ========================================================== */
(function () {
  var canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var W = 0, H = 0, DPR = 1, t = 0;
  var particles = [], ripples = [], sparks = [], grid = [];
  var running = true, rafId = null;
  var px = { x: 0, y: 0, tx: 0, ty: 0 };

  function pal() {
    var light = document.body.classList.contains('light-theme');
    return light ? { a: '0,155,138' } : { a: '0,230,212' };
  }
  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * DPR; canvas.height = H * DPR;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    build();
  }
  function build() {
    var n = Math.min(100, Math.round((W * H) / 18000));
    particles = [];
    for (var i = 0; i < n; i++) {
      particles.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
        ox: 0, oy: 0, r: Math.random() * 1.8 + .6
      });
    }
    grid = [];
    var step = W < 700 ? 64 : 50;
    for (var x = step / 2; x < W; x += step)
      for (var y = step / 2; y < H; y += step)
        grid.push({ x: x, y: y, pulse: 0, phase: Math.random() * Math.PI * 2 });
  }
  function burst(x, y) {
    for (var i = 0; i < 3; i++) ripples.push({ x: x, y: y, r: 6, max: 180 + i * 90, life: 1, delay: i * 6, speed: 3.2 + i * .8 });
    for (var k = 0; k < 18; k++) {
      var a = (Math.PI * 2 * k) / 18 + Math.random() * .4;
      var s = 1.6 + Math.random() * 4;
      sparks.push({ x: x, y: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, decay: .014 + Math.random() * .02, r: Math.random() * 2 + 1 });
    }
    for (var g = 0; g < grid.length; g++) {
      var gp = grid[g];
      var d = Math.hypot(gp.x - x, gp.y - y);
      if (d < 420) gp.pulse = Math.max(gp.pulse, 1 - d / 420);
    }
    for (var p = 0; p < particles.length; p++) {
      var pp = particles[p];
      var dx = pp.x - x, dy = pp.y - y;
      var dd = Math.hypot(dx, dy) || 1;
      if (dd < 260) { var f = (1 - dd / 260) * 26; pp.ox += (dx / dd) * f; pp.oy += (dy / dd) * f; }
    }
  }
  window.addEventListener('pointerdown', function (e) {
    if (e.target.closest('a,button,input,textarea,select,.project-card,.social-card,.skill-tag,.theme-toggle,.menu-toggle,.email-highlight,.copy-icon,.about-card,.app-modal')) return;
    burst(e.clientX, e.clientY);
  });
  window.addEventListener('pointermove', function (e) {
    px.tx = (e.clientX / W - .5) * 2;
    px.ty = (e.clientY / H - .5) * 2;
  });
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { running = false; if (rafId) cancelAnimationFrame(rafId); }
    else if (!reduce) { running = true; loop(); }
  });
  function draw() {
    t += .016;
    var c = pal();
    ctx.clearRect(0, 0, W, H);
    px.x += (px.tx - px.x) * .05;
    px.y += (px.ty - px.y) * .05;
    // grid
    for (var i = 0; i < grid.length; i++) {
      var g = grid[i];
      g.pulse *= .94;
      var dr = Math.sin(t * .8 + g.phase) * 1.2;
      var gx = g.x + px.x * 8 + dr, gy = g.y + px.y * 8;
      ctx.beginPath();
      ctx.arc(gx, gy, 1 + g.pulse * 1.6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + c.a + ',' + (.06 + g.pulse * .5) + ')';
      ctx.fill();
    }
    // particles
    for (var p = 0; p < particles.length; p++) {
      var pp = particles[p];
      pp.ox *= .92; pp.oy *= .92;
      pp.x += pp.vx; pp.y += pp.vy;
      if (pp.x < -20) pp.x = W + 20;
      if (pp.x > W + 20) pp.x = -20;
      if (pp.y < -20) pp.y = H + 20;
      if (pp.y > H + 20) pp.y = -20;
      pp._dx = pp.x + pp.ox + px.x * 18;
      pp._dy = pp.y + pp.oy + px.y * 18;
      ctx.beginPath();
      ctx.arc(pp._dx, pp._dy, pp.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + c.a + ',.55)';
      ctx.fill();
    }
    // links
    var md = 150;
    for (var i2 = 0; i2 < particles.length; i2++) {
      var a2 = particles[i2];
      for (var j = i2 + 1; j < particles.length; j++) {
        var b = particles[j];
        var ddx = a2._dx - b._dx, ddy = a2._dy - b._dy;
        var d2 = ddx * ddx + ddy * ddy;
        if (d2 < md * md) {
          ctx.strokeStyle = 'rgba(' + c.a + ',' + ((1 - Math.sqrt(d2) / md) * .22) + ')';
          ctx.lineWidth = .8;
          ctx.beginPath(); ctx.moveTo(a2._dx, a2._dy); ctx.lineTo(b._dx, b._dy); ctx.stroke();
        }
      }
    }
    // ripples
    for (var r = ripples.length - 1; r >= 0; r--) {
      var rp = ripples[r];
      if (rp.delay > 0) { rp.delay--; continue; }
      rp.r += rp.speed;
      rp.life = 1 - rp.r / rp.max;
      if (rp.life <= 0) { ripples.splice(r, 1); continue; }
      ctx.beginPath();
      ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(' + c.a + ',' + (rp.life * .7) + ')';
      ctx.lineWidth = 2 * rp.life + .4;
      ctx.stroke();
    }
    // sparks
    for (var s = sparks.length - 1; s >= 0; s--) {
      var sp = sparks[s];
      sp.x += sp.vx; sp.y += sp.vy;
      sp.vx *= .96; sp.vy *= .96; sp.vy += .04;
      sp.life -= sp.decay;
      if (sp.life <= 0) { sparks.splice(s, 1); continue; }
      ctx.beginPath();
      ctx.arc(sp.x, sp.y, sp.r * sp.life, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + c.a + ',' + sp.life + ')';
      ctx.fill();
    }
  }
  function loop() { if (!running) return; rafId = requestAnimationFrame(loop); draw(); }
  resize();
  window.addEventListener('resize', resize);
  if (reduce) draw(); else loop();
})();


/* ==========================================================
   PART 3 — LIVE PROJECT APPS (Weather, Snake, Calc, TTT,
            To-Do, Arduino) with self-injecting modal
   ========================================================== */
(function () {
  console.log('%c[Denma] Live apps starting…', 'color:#00e6d4;font-weight:bold');

  /* ----- Inject CSS once ----- */
  if (!document.getElementById('denmaAppCSS')) {
    var s = document.createElement('style');
    s.id = 'denmaAppCSS';
    s.textContent = `
.app-modal{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .3s;padding:16px;font-family:'Inter',system-ui,sans-serif}
.app-modal.open{opacity:1;pointer-events:auto}
.app-modal-backdrop{position:absolute;inset:0;background:rgba(2,4,12,.88);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
.app-modal-window{position:relative;width:100%;max-width:720px;max-height:92vh;background:linear-gradient(145deg,#0d1220,#0a0e18);border:1px solid #00e6d4;border-radius:20px;overflow:hidden;box-shadow:0 40px 100px -20px rgba(0,230,212,.4);display:flex;flex-direction:column;transform:translateY(20px) scale(.97);transition:transform .35s cubic-bezier(.22,1,.36,1);color:#eaf0ff}
.app-modal.open .app-modal-window{transform:translateY(0) scale(1)}
body.light-theme .app-modal-window{background:linear-gradient(145deg,#fff,#eef2ff);color:#0a0f1f}
.app-modal-bar{display:flex;align-items:center;gap:12px;padding:12px 16px;background:rgba(0,0,0,.35);border-bottom:1px solid rgba(139,92,246,.2)}
body.light-theme .app-modal-bar{background:rgba(0,0,0,.05)}
.app-modal-dots{display:flex;gap:6px}
.app-modal-dots span{width:11px;height:11px;border-radius:50%}
.app-modal-dots span:nth-child(1){background:#ff5f57}
.app-modal-dots span:nth-child(2){background:#febc2e}
.app-modal-dots span:nth-child(3){background:#28c840}
.app-modal-title{flex:1;font-family:'JetBrains Mono',monospace;font-size:.82rem;color:#8a93b0;letter-spacing:.5px;text-align:center}
.app-modal-close{background:rgba(0,230,212,.1);border:1px solid rgba(0,230,212,.35);color:#00e6d4;width:32px;height:32px;border-radius:8px;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;font-size:.9rem}
.app-modal-close:hover{background:#00e6d4;color:#05060f}
.app-modal-body{flex:1;overflow-y:auto;padding:22px}
.app-modal-body::-webkit-scrollbar{width:8px}
.app-modal-body::-webkit-scrollbar-thumb{background:rgba(0,230,212,.3);border-radius:4px}

.wx-app{display:flex;flex-direction:column;gap:16px}
.wx-search{display:flex;gap:10px}
.wx-search input{flex:1;padding:12px 16px;border-radius:12px;border:1px solid rgba(139,92,246,.25);background:rgba(0,0,0,.25);color:inherit;font-family:inherit;font-size:.92rem;outline:none}
body.light-theme .wx-search input{background:rgba(255,255,255,.75);color:#0a0f1f}
.wx-search input:focus{border-color:#00e6d4}
.wx-search button{padding:12px 20px;border-radius:12px;border:none;background:#00e6d4;color:#05060f;font-weight:700;cursor:pointer;font-family:inherit}
.wx-result{background:linear-gradient(135deg,rgba(0,230,212,.12),rgba(139,92,246,.08));border:1px solid rgba(0,230,212,.35);border-radius:18px;padding:24px;min-height:180px;display:flex;flex-direction:column;justify-content:center;text-align:center}
.wx-city{font-size:1.3rem;font-weight:700;margin-bottom:4px}
.wx-country{color:#8a93b0;font-size:.82rem;margin-bottom:12px;letter-spacing:1px}
.wx-temp{font-size:3.6rem;font-weight:800;color:#00e6d4;font-family:'JetBrains Mono',monospace;line-height:1;text-shadow:0 0 30px rgba(0,230,212,.45)}
.wx-cond{font-size:1rem;color:#8a93b0;margin:8px 0 16px}
.wx-details{display:flex;justify-content:center;gap:24px;flex-wrap:wrap;font-size:.85rem}
.wx-details div{display:flex;align-items:center;gap:6px;color:#8a93b0}
.wx-details i{color:#00e6d4}
.wx-hint{color:#8a93b0;font-size:.9rem;text-align:center}

.snake-app{display:flex;flex-direction:column;align-items:center;gap:14px}
.snake-hud{display:flex;gap:24px;font-family:'JetBrains Mono',monospace;font-size:.85rem;color:#8a93b0}
.snake-hud b{color:#00e6d4}
.snake-canvas{background:#060a12;border:1px solid rgba(0,230,212,.35);border-radius:12px;width:100%;max-width:380px;aspect-ratio:1;display:block;box-shadow:0 0 40px -10px rgba(0,230,212,.45);touch-action:none}
.snake-controls{display:grid;grid-template-columns:repeat(3,58px);grid-template-rows:repeat(2,58px);gap:6px}
.snake-controls button{background:rgba(18,22,42,.65);border:1px solid rgba(139,92,246,.25);color:#00e6d4;border-radius:12px;font-size:1.2rem;cursor:pointer;font-family:inherit}
.snake-controls button:active{transform:scale(.92);background:#00e6d4;color:#05060f}
.snake-controls .up{grid-column:2;grid-row:1}
.snake-controls .left{grid-column:1;grid-row:2}
.snake-controls .down{grid-column:2;grid-row:2}
.snake-controls .right{grid-column:3;grid-row:2}
.snake-btn{padding:10px 22px;border-radius:10px;background:#00e6d4;color:#05060f;border:none;font-weight:700;cursor:pointer;font-family:inherit}

.calc-app{max-width:340px;margin:0 auto;background:#0a0e18;border:1px solid rgba(139,92,246,.25);border-radius:20px;padding:18px}
body.light-theme .calc-app{background:#f8fafc}
.calc-display-live{background:rgba(0,230,212,.06);border:1px solid rgba(0,230,212,.35);border-radius:12px;padding:16px;margin-bottom:14px;text-align:right;font-family:'JetBrains Mono',monospace;min-height:80px;display:flex;flex-direction:column;justify-content:flex-end}
.calc-history{color:#8a93b0;font-size:.8rem;min-height:18px}
.calc-current{color:#00e6d4;font-size:2rem;font-weight:700;word-break:break-all;text-shadow:0 0 20px rgba(0,230,212,.45)}
.calc-keys-live{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.calc-keys-live button{padding:16px 0;border-radius:12px;border:1px solid rgba(139,92,246,.25);background:rgba(255,255,255,.04);color:inherit;font-family:'JetBrains Mono',monospace;font-size:1.05rem;font-weight:600;cursor:pointer}
body.light-theme .calc-keys-live button{background:rgba(0,0,0,.04);color:#0a0f1f}
.calc-keys-live button:hover{background:rgba(0,230,212,.12);border-color:#00e6d4}
.calc-keys-live button:active{transform:scale(.95)}
.calc-keys-live .op{color:#00e6d4}
.calc-keys-live .eq{background:#00e6d4;color:#05060f}
.calc-keys-live .span2{grid-column:span 2}
.calc-keys-live .danger{color:#ff6b8a}

.ttt-app{display:flex;flex-direction:column;align-items:center;gap:16px}
.ttt-status{font-family:'JetBrains Mono',monospace;font-size:.95rem;color:#00e6d4;letter-spacing:1px;text-align:center;min-height:24px}
.ttt-board-live{display:grid;grid-template-columns:repeat(3,80px);grid-template-rows:repeat(3,80px);gap:8px;background:rgba(139,92,246,.25);padding:8px;border-radius:16px;box-shadow:0 0 40px -15px rgba(0,230,212,.45)}
.ttt-board-live button{background:#0a0e18;border:none;border-radius:10px;font-size:2.2rem;font-weight:800;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;color:#eaf0ff}
body.light-theme .ttt-board-live button{background:#f8fafc}
.ttt-board-live button:hover:not(:disabled){background:rgba(0,230,212,.12)}
.ttt-board-live button.x{color:#00e6d4;text-shadow:0 0 20px rgba(0,230,212,.45)}
.ttt-board-live button.o{color:#f472b6;text-shadow:0 0 20px rgba(244,114,182,.6)}
.ttt-board-live button.win{background:rgba(0,230,212,.25);animation:winpulse .8s infinite}
@keyframes winpulse{0%,100%{box-shadow:0 0 0 0 rgba(0,230,212,.5)}50%{box-shadow:0 0 0 10px transparent}}
.ttt-scores{display:flex;gap:20px;font-family:'JetBrains Mono',monospace;font-size:.85rem;color:#8a93b0}
.ttt-scores b{color:#00e6d4;font-size:1.15rem}
.ttt-reset{padding:10px 24px;border-radius:10px;background:#00e6d4;color:#05060f;border:none;font-weight:700;cursor:pointer;font-family:inherit}

.todo-app{display:flex;flex-direction:column;gap:16px;max-width:500px;margin:0 auto}
.todo-input-row{display:flex;gap:10px}
.todo-input-row input{flex:1;padding:12px 16px;border-radius:12px;border:1px solid rgba(139,92,246,.25);background:rgba(0,0,0,.25);color:inherit;font-family:inherit;font-size:.92rem;outline:none}
body.light-theme .todo-input-row input{background:rgba(255,255,255,.75);color:#0a0f1f}
.todo-input-row input:focus{border-color:#00e6d4}
.todo-input-row button{padding:12px 20px;border-radius:12px;border:none;background:#00e6d4;color:#05060f;font-weight:700;cursor:pointer;font-family:inherit}
.todo-filters{display:flex;gap:8px;justify-content:center}
.todo-filters button{padding:6px 14px;border-radius:20px;border:1px solid rgba(139,92,246,.25);background:transparent;color:#8a93b0;cursor:pointer;font-family:inherit;font-size:.82rem}
.todo-filters button.active{background:#00e6d4;color:#05060f;border-color:#00e6d4;font-weight:700}
.todo-list{display:flex;flex-direction:column;gap:8px;max-height:320px;overflow-y:auto}
.todo-list-item{display:flex;align-items:center;gap:12px;padding:12px 14px;background:rgba(0,230,212,.05);border:1px solid rgba(139,92,246,.25);border-radius:12px;color:inherit}
.todo-list-item.done{opacity:.5}
.todo-list-item.done .todo-list-text{text-decoration:line-through}
.todo-check{width:22px;height:22px;border-radius:6px;border:2px solid rgba(0,230,212,.35);background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:transparent;font-size:.7rem}
.todo-list-item.done .todo-check{background:#00e6d4;border-color:#00e6d4;color:#05060f}
.todo-list-text{flex:1;font-size:.92rem;word-break:break-word}
.todo-del{background:transparent;border:none;color:#ff6b8a;cursor:pointer;font-size:1rem;padding:4px 8px;border-radius:6px}
.todo-empty{text-align:center;color:#8a93b0;font-style:italic;padding:30px 0;font-size:.9rem}

.arduino-app{display:flex;flex-direction:column;gap:16px}
.arduino-top{display:grid;grid-template-columns:1fr 1fr;gap:16px}
@media(max-width:560px){.arduino-top{grid-template-columns:1fr}}
.arduino-panel{background:rgba(0,230,212,.04);border:1px solid rgba(139,92,246,.25);border-radius:14px;padding:16px}
.arduino-panel h4{font-size:.78rem;text-transform:uppercase;letter-spacing:1.5px;color:#00e6d4;margin-bottom:12px;font-family:'JetBrains Mono',monospace}
.sensor-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;font-size:.85rem}
.sensor-row label{color:#8a93b0}
.sensor-row input[type=range]{width:52%;accent-color:#00e6d4}
.sensor-row b{font-family:'JetBrains Mono',monospace;color:#00e6d4;min-width:55px;text-align:right}
.led-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:6px}
.led-grid button{aspect-ratio:1;border-radius:50%;border:2px solid #2a2a2a;background:#151a24;cursor:pointer;transition:all .2s}
.led-grid button.on{background:#00e6d4;border-color:#00e6d4;box-shadow:0 0 20px #00e6d4,0 0 40px rgba(0,230,212,.45)}
.serial{background:#05070d;border:1px solid rgba(0,230,212,.35);border-radius:12px;padding:14px;font-family:'JetBrains Mono',monospace;font-size:.78rem;height:140px;overflow-y:auto;color:#00e6d4}
.serial-line{padding:2px 0;opacity:.9}
.serial-line::before{content:'> ';color:#8b5cf6}
.arduino-lcd{background:linear-gradient(135deg,#0a2818,#041a10);border:1px solid #0e6b51;border-radius:10px;padding:14px;font-family:'JetBrains Mono',monospace;color:#00ff88;text-shadow:0 0 10px #00ff88;font-size:.85rem;letter-spacing:1px;margin-top:10px}
.arduino-lcd div{margin:3px 0}
`;
    document.head.appendChild(s);
  }

  /* ----- Inject modal HTML once ----- */
  if (!document.getElementById('appModal')) {
    var m = document.createElement('div');
    m.id = 'appModal';
    m.className = 'app-modal';
    m.innerHTML =
      '<div class="app-modal-backdrop" data-close></div>' +
      '<div class="app-modal-window">' +
        '<div class="app-modal-bar">' +
          '<div class="app-modal-dots"><span></span><span></span><span></span></div>' +
          '<div class="app-modal-title" id="appModalTitle">Project</div>' +
          '<button class="app-modal-close" data-close><i class="fas fa-times"></i></button>' +
        '</div>' +
        '<div class="app-modal-body" id="appModalBody"></div>' +
      '</div>';
    document.body.appendChild(m);
  }

  var modal = document.getElementById('appModal');
  var modalTitle = document.getElementById('appModalTitle');
  var modalBody = document.getElementById('appModalBody');
  var cleanup = null;

  function open(title, html) {
    modalTitle.textContent = title;
    modalBody.innerHTML = html;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    if (cleanup) { cleanup(); cleanup = null; }
    setTimeout(function () { modalBody.innerHTML = ''; }, 350);
  }
  modal.querySelectorAll('[data-close]').forEach(function (el) {
    el.addEventListener('click', close);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) close();
  });

  /* ==================== WEATHER ==================== */
  function launchWeather() {
    open('weather-app — live',
      '<div class="wx-app">' +
        '<div class="wx-search">' +
          '<input type="text" id="wxCity" placeholder="City (Nairobi, London, Tokyo…)" value="Nairobi" />' +
          '<button id="wxGo"><i class="fas fa-search"></i> Search</button>' +
        '</div>' +
        '<div class="wx-result" id="wxResult"><div class="wx-hint">Loading…</div></div>' +
      '</div>');

    var input = document.getElementById('wxCity');
    var goBtn = document.getElementById('wxGo');
    var result = document.getElementById('wxResult');

    function txt(c) {
      var m = {0:'Clear sky',1:'Mainly clear',2:'Partly cloudy',3:'Overcast',45:'Fog',48:'Rime fog',51:'Light drizzle',53:'Drizzle',55:'Dense drizzle',61:'Slight rain',63:'Rain',65:'Heavy rain',71:'Slight snow',73:'Snow',75:'Heavy snow',80:'Rain showers',81:'Rain showers',82:'Violent showers',95:'Thunderstorm'};
      return m[c] || 'Cloudy';
    }
    function ico(c) {
      if (c === 0) return 'fa-sun';
      if (c <= 3) return 'fa-cloud-sun';
      if (c <= 48) return 'fa-smog';
      if (c <= 67) return 'fa-cloud-rain';
      if (c <= 77) return 'fa-snowflake';
      if (c <= 82) return 'fa-cloud-showers-heavy';
      return 'fa-bolt';
    }

    async function lookup(city) {
      result.innerHTML = '<div class="wx-hint">Fetching weather…</div>';
      try {
        var g = await fetch('https://geocoding-api.open-meteo.com/v1/search?name=' + encodeURIComponent(city) + '&count=1');
        var geo = await g.json();
        if (!geo.results || !geo.results.length) {
          result.innerHTML = '<div class="wx-hint">City not found. Try another.</div>';
          return;
        }
        var loc = geo.results[0];
        var w = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + loc.latitude + '&longitude=' + loc.longitude + '&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m');
        var wx = await w.json();
        var cur = wx.current;
        result.innerHTML =
          '<div class="wx-city"><i class="fas ' + ico(cur.weather_code) + '" style="color:#00e6d4;margin-right:8px"></i>' + loc.name + '</div>' +
          '<div class="wx-country">' + (loc.country || '') + '</div>' +
          '<div class="wx-temp">' + Math.round(cur.temperature_2m) + '°C</div>' +
          '<div class="wx-cond">' + txt(cur.weather_code) + '</div>' +
          '<div class="wx-details">' +
            '<div><i class="fas fa-temperature-half"></i> Feels ' + Math.round(cur.apparent_temperature) + '°C</div>' +
            '<div><i class="fas fa-droplet"></i> ' + cur.relative_humidity_2m + '%</div>' +
            '<div><i class="fas fa-wind"></i> ' + cur.wind_speed_10m + ' km/h</div>' +
          '</div>';
      } catch (err) {
        result.innerHTML = '<div class="wx-hint">Error: ' + err.message + '</div>';
      }
    }
    goBtn.addEventListener('click', function () { lookup(input.value.trim() || 'Nairobi'); });
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') goBtn.click(); });
    lookup('Nairobi');
  }

  /* ==================== SNAKE ==================== */
  function launchSnake() {
    open('snake-game — live',
      '<div class="snake-app">' +
        '<div class="snake-hud"><div>SCORE: <b id="sScore">0</b></div><div>HIGH: <b id="sHigh">0</b></div></div>' +
        '<canvas class="snake-canvas" id="sCanvas" width="400" height="400"></canvas>' +
        '<div class="snake-controls">' +
          '<button class="up" data-d="up"><i class="fas fa-arrow-up"></i></button>' +
          '<button class="left" data-d="left"><i class="fas fa-arrow-left"></i></button>' +
          '<button class="down" data-d="down"><i class="fas fa-arrow-down"></i></button>' +
          '<button class="right" data-d="right"><i class="fas fa-arrow-right"></i></button>' +
        '</div>' +
        '<button class="snake-btn" id="sRestart">Restart</button>' +
      '</div>');

    var cv = document.getElementById('sCanvas');
    var cx = cv.getContext('2d');
    var G = 20, C = cv.width / G;
    var snake, dir, nxt, food, score, high, speed, running, iv;

    try { high = parseInt(localStorage.getItem('snakeHigh') || '0', 10); } catch (e) { high = 0; }

    function reset() {
      snake = [{x:10,y:10},{x:9,y:10},{x:8,y:10}];
      dir = {x:1,y:0}; nxt = {x:1,y:0};
      score = 0; speed = 120; running = true;
      place(); hud();
      if (iv) clearInterval(iv);
      iv = setInterval(tick, speed);
    }
    function place() {
      do { food = { x: Math.floor(Math.random()*G), y: Math.floor(Math.random()*G) }; }
      while (snake.some(function(s){return s.x===food.x && s.y===food.y;}));
    }
    function hud() {
      document.getElementById('sScore').textContent = score;
      document.getElementById('sHigh').textContent = high;
    }
    function tick() {
      if (!running) return;
      dir = nxt;
      var h = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
      if (h.x < 0 || h.x >= G || h.y < 0 || h.y >= G) return end();
      if (snake.some(function(s){return s.x===h.x && s.y===h.y;})) return end();
      snake.unshift(h);
      if (h.x === food.x && h.y === food.y) {
        score += 10;
        if (score > high) { high = score; try { localStorage.setItem('snakeHigh', high); } catch(e){} }
        place();
        if (speed > 60) { speed -= 4; clearInterval(iv); iv = setInterval(tick, speed); }
        hud();
      } else snake.pop();
      draw();
    }
    function draw() {
      cx.fillStyle = '#060a12';
      cx.fillRect(0, 0, cv.width, cv.height);
      cx.strokeStyle = 'rgba(0,230,212,.08)';
      cx.lineWidth = 1;
      for (var i = 1; i < G; i++) {
        cx.beginPath(); cx.moveTo(i*C, 0); cx.lineTo(i*C, cv.height); cx.stroke();
        cx.beginPath(); cx.moveTo(0, i*C); cx.lineTo(cv.width, i*C); cx.stroke();
      }
      cx.fillStyle = '#f472b6';
      cx.shadowColor = '#f472b6'; cx.shadowBlur = 15;
      cx.beginPath(); cx.arc(food.x*C + C/2, food.y*C + C/2, C*.32, 0, Math.PI*2); cx.fill();
      cx.shadowColor = '#00e6d4'; cx.shadowBlur = 12;
      snake.forEach(function (s, i) {
        cx.fillStyle = i === 0 ? '#00ffd5' : 'rgba(0,230,212,' + Math.max(1 - i*.03, .4) + ')';
        cx.fillRect(s.x*C + 1, s.y*C + 1, C - 2, C - 2);
      });
      cx.shadowBlur = 0;
    }
    function end() {
      running = false;
      clearInterval(iv);
      cx.fillStyle = 'rgba(5,6,15,.9)';
      cx.fillRect(0, 0, cv.width, cv.height);
      cx.fillStyle = '#00e6d4';
      cx.font = 'bold 26px Inter, sans-serif';
      cx.textAlign = 'center';
      cx.fillText('GAME OVER', cv.width/2, cv.height/2 - 10);
      cx.fillStyle = '#8a93b0';
      cx.font = '14px JetBrains Mono, monospace';
      cx.fillText('Score: ' + score, cv.width/2, cv.height/2 + 22);
      cx.fillText('Press Restart', cv.width/2, cv.height/2 + 46);
    }
    function setDir(d) {
      if (d === 'up' && dir.y !== 1) nxt = {x:0,y:-1};
      if (d === 'down' && dir.y !== -1) nxt = {x:0,y:1};
      if (d === 'left' && dir.x !== 1) nxt = {x:-1,y:0};
      if (d === 'right' && dir.x !== -1) nxt = {x:1,y:0};
    }
    function keys(e) {
      var k = e.key;
      if (k === 'ArrowUp' || k === 'w' || k === 'W') { e.preventDefault(); setDir('up'); }
      if (k === 'ArrowDown' || k === 's' || k === 'S') { e.preventDefault(); setDir('down'); }
      if (k === 'ArrowLeft' || k === 'a' || k === 'A') { e.preventDefault(); setDir('left'); }
      if (k === 'ArrowRight' || k === 'd' || k === 'D') { e.preventDefault(); setDir('right'); }
    }
    document.addEventListener('keydown', keys);
    modal.querySelectorAll('.snake-controls button').forEach(function (b) {
      b.addEventListener('click', function () { setDir(b.getAttribute('data-d')); });
    });
    document.getElementById('sRestart').addEventListener('click', reset);
    cleanup = function () {
      running = false;
      if (iv) clearInterval(iv);
      document.removeEventListener('keydown', keys);
    };
    reset();
    draw();
  }

  /* ==================== CALCULATOR ==================== */
  function launchCalc() {
    open('calculator — live',
      '<div class="calc-app">' +
        '<div class="calc-display-live">' +
          '<div class="calc-history" id="cHist"></div>' +
          '<div class="calc-current" id="cCur">0</div>' +
        '</div>' +
        '<div class="calc-keys-live">' +
          '<button class="danger" data-k="C">C</button>' +
          '<button class="danger" data-k="DEL">⌫</button>' +
          '<button class="op" data-k="%">%</button>' +
          '<button class="op" data-k="/">÷</button>' +
          '<button data-k="7">7</button><button data-k="8">8</button><button data-k="9">9</button>' +
          '<button class="op" data-k="*">×</button>' +
          '<button data-k="4">4</button><button data-k="5">5</button><button data-k="6">6</button>' +
          '<button class="op" data-k="-">−</button>' +
          '<button data-k="1">1</button><button data-k="2">2</button><button data-k="3">3</button>' +
          '<button class="op" data-k="+">+</button>' +
          '<button class="span2" data-k="0">0</button>' +
          '<button data-k=".">.</button>' +
          '<button class="eq" data-k="=">=</button>' +
        '</div>' +
      '</div>');

    var curEl = document.getElementById('cCur');
    var histEl = document.getElementById('cHist');
    var current = '0', history = '';

    function render() { curEl.textContent = current; histEl.textContent = history; }

    function input(k) {
      if (k === 'C') { current = '0'; history = ''; }
      else if (k === 'DEL') { current = current.length > 1 ? current.slice(0, -1) : '0'; }
      else if (k === '=') {
        try {
          var val = Function('"use strict";return(' + current + ')')();
          if (isFinite(val)) {
            history = current + ' =';
            current = String(Math.round(val * 1e10) / 1e10);
          } else current = 'Error';
        } catch (e) { current = 'Error'; }
      }
      else if (k === '%') {
        try { current = String(parseFloat(current) / 100); } catch (e) {}
      }
      else if ('0123456789.'.indexOf(k) !== -1) {
        if (current === '0' && k !== '.') current = k;
        else if (k === '.' && current.indexOf('.') !== -1) {}
        else current += k;
      }
      else {
        if (current === 'Error') current = '0';
        current += k;
      }
      render();
    }
    modal.querySelectorAll('.calc-keys-live button').forEach(function (b) {
      b.addEventListener('click', function () { input(b.getAttribute('data-k')); });
    });
    function keys(e) {
      var k = e.key;
      if ('0123456789.'.indexOf(k) !== -1) input(k);
      else if (k === '+' || k === '-' || k === '*' || k === '/') input(k);
      else if (k === 'Enter' || k === '=') { e.preventDefault(); input('='); }
      else if (k === 'Backspace') input('DEL');
      else if (k === 'Escape') input('C');
    }
    document.addEventListener('keydown', keys);
    cleanup = function () { document.removeEventListener('keydown', keys); };
    render();
  }

  /* ==================== TIC TAC TOE ==================== */
  function launchTTT() {
    open('tic-tac-toe — live',
      '<div class="ttt-app">' +
        '<div class="ttt-status" id="tStatus">Player X\'s turn</div>' +
        '<div class="ttt-board-live" id="tBoard">' +
          '<button data-i="0"></button><button data-i="1"></button><button data-i="2"></button>' +
          '<button data-i="3"></button><button data-i="4"></button><button data-i="5"></button>' +
          '<button data-i="6"></button><button data-i="7"></button><button data-i="8"></button>' +
        '</div>' +
        '<div class="ttt-scores"><div>X: <b id="tX">0</b></div><div>O: <b id="tO">0</b></div><div>Draws: <b id="tD">0</b></div></div>' +
        '<button class="ttt-reset" id="tReset">New Round</button>' +
      '</div>');

    var board = ['','','','','','','','',''];
    var turn = 'X', over = false;
    var scores = { X: 0, O: 0, D: 0 };
    var statusEl = document.getElementById('tStatus');
    var cells = modal.querySelectorAll('#tBoard button');
    var wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

    function sc() {
      document.getElementById('tX').textContent = scores.X;
      document.getElementById('tO').textContent = scores.O;
      document.getElementById('tD').textContent = scores.D;
    }
    function checkWin() {
      for (var i = 0; i < wins.length; i++) {
        var w = wins[i];
        if (board[w[0]] && board[w[0]] === board[w[1]] && board[w[1]] === board[w[2]]) {
          w.forEach(function (idx) { cells[idx].classList.add('win'); });
          return board[w[0]];
        }
      }
      return board.every(function (c) { return c; }) ? 'D' : null;
    }
    function click(i) {
      if (over || board[i]) return;
      board[i] = turn;
      cells[i].textContent = turn === 'X' ? '×' : '○';
      cells[i].classList.add(turn.toLowerCase());
      var r = checkWin();
      if (r === 'X' || r === 'O') {
        over = true; scores[r]++;
        statusEl.textContent = '🎉 Player ' + r + ' wins!';
        sc();
      } else if (r === 'D') {
        over = true; scores.D++;
        statusEl.textContent = 'Draw!';
        sc();
      } else {
        turn = turn === 'X' ? 'O' : 'X';
        statusEl.textContent = 'Player ' + turn + '\'s turn';
      }
    }
    function reset() {
      board = ['','','','','','','','',''];
      turn = 'X'; over = false;
      statusEl.textContent = 'Player X\'s turn';
      cells.forEach(function (c) { c.textContent = ''; c.className = ''; });
    }
    cells.forEach(function (b) {
      b.addEventListener('click', function () { click(parseInt(b.getAttribute('data-i'), 10)); });
    });
    document.getElementById('tReset').addEventListener('click', reset);
    sc();
  }

  /* ==================== TO-DO ==================== */
  function launchTodo() {
    open('todo-app — live',
      '<div class="todo-app">' +
        '<div class="todo-input-row">' +
          '<input type="text" id="tdInput" placeholder="What needs to be done?" />' +
          '<button id="tdAdd"><i class="fas fa-plus"></i> Add</button>' +
        '</div>' +
        '<div class="todo-filters">' +
          '<button data-f="all" class="active">All</button>' +
          '<button data-f="active">Active</button>' +
          '<button data-f="done">Done</button>' +
        '</div>' +
        '<div class="todo-list" id="tdList"></div>' +
      '</div>');

    var KEY = 'denmaTodos';
    var todos;
    try { todos = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { todos = []; }
    var filter = 'all';
    var listEl = document.getElementById('tdList');
    var inputEl = document.getElementById('tdInput');

    function save() { try { localStorage.setItem(KEY, JSON.stringify(todos)); } catch (e) {} }
    function render() {
      listEl.innerHTML = '';
      var f = todos.filter(function (t) {
        if (filter === 'active') return !t.done;
        if (filter === 'done') return t.done;
        return true;
      });
      if (!f.length) {
        listEl.innerHTML = '<div class="todo-empty">Nothing here yet — add a task above.</div>';
        return;
      }
      f.forEach(function (t) {
        var item = document.createElement('div');
        item.className = 'todo-list-item' + (t.done ? ' done' : '');
        item.innerHTML = '<button class="todo-check"><i class="fas fa-check"></i></button><span class="todo-list-text"></span><button class="todo-del"><i class="fas fa-trash"></i></button>';
        item.querySelector('.todo-list-text').textContent = t.text;
        item.querySelector('.todo-check').addEventListener('click', function () { t.done = !t.done; save(); render(); });
        item.querySelector('.todo-del').addEventListener('click', function () {
          todos = todos.filter(function (x) { return x !== t; });
          save(); render();
        });
        listEl.appendChild(item);
      });
    }
    function add() {
      var val = inputEl.value.trim();
      if (!val) return;
      todos.unshift({ text: val, done: false, id: Date.now() });
      inputEl.value = '';
      save(); render();
    }
    document.getElementById('tdAdd').addEventListener('click', add);
    inputEl.addEventListener('keydown', function (e) { if (e.key === 'Enter') add(); });
    modal.querySelectorAll('.todo-filters button').forEach(function (b) {
      b.addEventListener('click', function () {
        modal.querySelectorAll('.todo-filters button').forEach(function (x) { x.classList.remove('active'); });
        b.classList.add('active');
        filter = b.getAttribute('data-f');
        render();
      });
    });
    render();
  }

  /* ==================== ARDUINO ==================== */
  function launchArduino() {
    open('arduino-lab — simulated IoT',
      '<div class="arduino-app">' +
        '<div class="arduino-top">' +
          '<div class="arduino-panel">' +
            '<h4>Sensors</h4>' +
            '<div class="sensor-row"><label>Temperature</label><input type="range" id="aT" min="0" max="50" value="24" /><b id="aTV">24°C</b></div>' +
            '<div class="sensor-row"><label>Light</label><input type="range" id="aL" min="0" max="1023" value="512" /><b id="aLV">512</b></div>' +
            '<div class="sensor-row"><label>Humidity</label><input type="range" id="aH" min="0" max="100" value="60" /><b id="aHV">60%</b></div>' +
            '<div class="arduino-lcd"><div id="lcd1">TEMP: 24.0 C</div><div id="lcd2">HUM:  60 %</div></div>' +
          '</div>' +
          '<div class="arduino-panel">' +
            '<h4>LED Matrix</h4>' +
            '<div class="led-grid" id="lGrid">' +
              '<button></button><button></button><button></button><button></button>' +
              '<button></button><button></button><button></button><button></button>' +
              '<button></button><button></button><button></button><button></button>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="arduino-panel">' +
          '<h4>Serial Monitor</h4>' +
          '<div class="serial" id="serial"></div>' +
        '</div>' +
      '</div>');

    var serial = document.getElementById('serial');
    var t = document.getElementById('aT');
    var l = document.getElementById('aL');
    var h = document.getElementById('aH');
    var lcd1 = document.getElementById('lcd1');
    var lcd2 = document.getElementById('lcd2');

    function log(msg) {
      var line = document.createElement('div');
      line.className = 'serial-line';
      line.textContent = '[' + new Date().toLocaleTimeString() + '] ' + msg;
      serial.appendChild(line);
      serial.scrollTop = serial.scrollHeight;
      while (serial.children.length > 60) serial.removeChild(serial.firstChild);
    }
    function update() {
      document.getElementById('aTV').textContent = t.value + '°C';
      document.getElementById('aLV').textContent = l.value;
      document.getElementById('aHV').textContent = h.value + '%';
      lcd1.textContent = 'TEMP: ' + parseFloat(t.value).toFixed(1) + ' C';
      lcd2.textContent = 'HUM:  ' + h.value + ' %';
    }
    t.addEventListener('input', function () { update(); log('TEMP_READ → ' + t.value + '°C'); });
    l.addEventListener('input', function () { update(); log('LIGHT_READ → ' + l.value); });
    h.addEventListener('input', function () { update(); log('HUM_READ → ' + h.value + '%'); });
    modal.querySelectorAll('#lGrid button').forEach(function (b) {
      b.addEventListener('click', function () {
        b.classList.toggle('on');
        log('LED → ' + (b.classList.contains('on') ? 'ON' : 'OFF'));
      });
    });
    log('Arduino Uno connected on COM3');
    log('Sketch: denma_sensors.ino loaded');
    log('Serial baud rate: 9600');
    var auto = setInterval(function () {
      log('HEARTBEAT → uptime ' + Math.floor(performance.now() / 1000) + 's');
    }, 5000);
    cleanup = function () { clearInterval(auto); };
    update();
  }

  /* ---------- Attach launchers to project cards ---------- */
  var map = {
    weather: launchWeather,
    snake: launchSnake,
    calculator: launchCalc,
    tictactoe: launchTTT,
    todo: launchTodo,
    arduino: launchArduino
  };

  function attach() {
    var cards = document.querySelectorAll('.project-card');
    cards.forEach(function (card) {
      if (card.dataset.bound === '1') return;
      card.dataset.bound = '1';
      var h3 = card.querySelector('h3');
      if (!h3) return;
      var t = h3.textContent.toLowerCase();
      var key = null;
      if (t.indexOf('weather') !== -1) key = 'weather';
      else if (t.indexOf('snake') !== -1) key = 'snake';
      else if (t.indexOf('calculator') !== -1) key = 'calculator';
      else if (t.indexOf('tac') !== -1) key = 'tictactoe';
      else if (t.indexOf('to-do') !== -1 || t.indexOf('todo') !== -1) key = 'todo';
      else if (t.indexOf('arduino') !== -1) key = 'arduino';
      if (!key) return;
      card.style.cursor = 'pointer';
      card.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('[Denma] Launching:', key);
        map[key]();
      });
    });
    console.log('[Denma] Wired up ' + cards.length + ' project cards.');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attach);
  } else {
    attach();
  }
  // Backup in case cards render late
  setTimeout(attach, 500);
  setTimeout(attach, 1500);

  console.log('%c[Denma] ✓ Live apps ready. Click any project card.', 'color:#00e6d4;font-weight:bold');
})();