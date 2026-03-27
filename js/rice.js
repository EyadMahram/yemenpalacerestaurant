/* ─── Rice Grain Background Animation ─── */
(function () {
  const canvas = document.getElementById('rice-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W = 0, H = 0;
  const GRAIN_COUNT = 90;
  const grains = [];

  function rand(min, max) { return min + Math.random() * (max - min); }

  function createGrain(randomY) {
    return {
      x:      rand(0, W),
      y:      randomY ? rand(0, H) : rand(-30, -10),
      w:      rand(1.2, 2.4),
      h:      rand(5, 11),
      angle:  rand(-0.5, 0.5),
      speed:  rand(0.12, 0.32),
      sway:   rand(0, Math.PI * 2),
      swaySpd:rand(0.004, 0.012),
      swayAmt:rand(0.15, 0.55),
      opacity:rand(0.08, 0.28),
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
      // Warm gold tint for the rice grains
      ctx.fillStyle = '#c8a16a';
      ctx.beginPath();
      ctx.ellipse(0, 0, g.w, g.h, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Update position
      g.y      += g.speed;
      g.sway   += g.swaySpd;
      g.x      += Math.sin(g.sway) * g.swayAmt;

      // Reset when off-screen
      if (g.y > H + 20) {
        Object.assign(g, createGrain(false));
      }
    }
    requestAnimationFrame(draw);
  }

  init();
  draw();
})();
