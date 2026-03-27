/* ─── Rice Grain Background Animation ─── */
(function () {
  const canvas = document.getElementById('rice-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W = 0, H = 0;
  const GRAIN_COUNT = 220;
  const grains = [];

  function rand(min, max) { return min + Math.random() * (max - min); }

  function createGrain(randomY) {
    return {
      x:       rand(0, W),
      y:       randomY ? rand(0, H) : rand(-30, -10),
      w:       rand(1.5, 2.8),
      h:       rand(6, 14),
      angle:   rand(-0.6, 0.6),
      speed:   rand(0.45, 1.05),
      sway:    rand(0, Math.PI * 2),
      swaySpd: rand(0.010, 0.024),
      swayAmt: rand(0.30, 0.85),
      opacity: rand(0.10, 0.40),
    };
  }

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function init() {
    resize();
    grains.length = 0;
    for (let i = 0; i < GRAIN_COUNT; i++) grains.push(createGrain(true));
    window.addEventListener('resize', resize);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const g of grains) {
      ctx.save();
      ctx.translate(g.x, g.y);
      ctx.rotate(g.angle);
      ctx.globalAlpha = g.opacity;
      ctx.fillStyle = '#c8a16a';
      ctx.beginPath();
      ctx.ellipse(0, 0, g.w, g.h, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      g.y      += g.speed;
      g.sway   += g.swaySpd;
      g.x      += Math.sin(g.sway) * g.swayAmt;

      if (g.y > H + 20) {
        Object.assign(g, createGrain(false));
      }
    }
    requestAnimationFrame(draw);
  }

  init();
  draw();
})();
