const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

/* ---------------- CONFIG ---------------- */
const STAR_COUNT = 180;
const NEBULA_COUNT = 5;

/* ---------------- STARS ---------------- */
const stars = Array.from({ length: STAR_COUNT }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  vx: (Math.random() - 0.5) * 0.15,
  vy: (Math.random() - 0.5) * 0.15,
  r: Math.random() * 1.4 + 0.4,
  a: Math.random() * 0.6 + 0.4
}));

/* ---------------- NEBULAS ---------------- */
const nebulas = Array.from({ length: NEBULA_COUNT }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  r: 200 + Math.random() * 250,
  dx: (Math.random() - 0.5) * 0.04,
  dy: (Math.random() - 0.5) * 0.04,
  hue: 210 + Math.random() * 80
}));

function drawNebula(n) {
  const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
  g.addColorStop(0, `hsla(${n.hue},70%,60%,0.10)`);
  g.addColorStop(0.45, `hsla(${n.hue},70%,40%,0.06)`);
  g.addColorStop(1, "transparent");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
  ctx.fill();
}

/* ---------------- ANIMATE ---------------- */
function animate() {
  ctx.clearRect(0, 0, w, h);

  /* Nebulosas */
  nebulas.forEach(n => {
    n.x += n.dx;
    n.y += n.dy;

    if (n.x < -n.r) n.x = w + n.r;
    if (n.y < -n.r) n.y = h + n.r;
    if (n.x > w + n.r) n.x = -n.r;
    if (n.y > h + n.r) n.y = -n.r;

    drawNebula(n);
  });

  /* Estrellas */
  stars.forEach(s => {
    s.x += s.vx;
    s.y += s.vy;

    if (s.x < 0 || s.x > w) s.vx *= -1;
    if (s.y < 0 || s.y > h) s.vy *= -1;

    ctx.beginPath();
    ctx.fillStyle = `rgba(255,255,255,${s.a})`;
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();


