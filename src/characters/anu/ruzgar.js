// Rüzgâr: drifting brush streaks and paint flecks behind the hero, like the portrait's background.
(function () {
  var canvases = document.querySelectorAll("canvas.wind");
  var still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  canvases.forEach(function (canvas) {
    var ctx = canvas.getContext("2d");
    var w = 0, h = 0, dpr = 1, streaks = [], flecks = [], t = 0, colors = {};

    function readColors() {
      var s = getComputedStyle(canvas);
      colors.streak = s.getPropertyValue("--streak").trim() || "rgba(0,0,0,.2)";
      colors.crimson = s.getPropertyValue("--crimson").trim() || "#a5142c";
      colors.emerald = s.getPropertyValue("--emerald").trim() || "#1d6a4d";
      colors.gold = s.getPropertyValue("--gold").trim() || "#9a6d16";
    }

    function rand(a, b) { return a + Math.random() * (b - a); }

    function seed() {
      var n = Math.round(Math.max(10, w / 70));
      streaks = [];
      for (var i = 0; i < n; i++) {
        streaks.push({ x: rand(-w, w), y: rand(0, h), len: rand(80, 260), amp: rand(6, 26), speed: rand(0.35, 1.1), width: rand(0.6, 2.2), phase: rand(0, 6.28) });
      }
      flecks = [];
      var palette = [colors.crimson, colors.crimson, colors.emerald, colors.gold];
      for (var j = 0; j < Math.round(n * 1.3); j++) {
        flecks.push({ x: rand(0, w), y: rand(0, h), size: rand(2, 6), rot: rand(0, 6.28), spin: rand(-0.02, 0.02), speed: rand(0.4, 1.4), color: palette[j % palette.length], alpha: rand(0.25, 0.7) });
      }
    }

    function resize() {
      var r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      readColors(); seed(); draw();
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = "round";
      ctx.strokeStyle = colors.streak;
      streaks.forEach(function (s) {
        ctx.lineWidth = s.width;
        ctx.beginPath();
        for (var k = 0; k <= 24; k++) {
          var px = s.x + (k / 24) * s.len;
          var py = s.y + Math.sin(k / 24 * 3.1 + s.phase + t * 0.01) * s.amp;
          if (k === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.stroke();
      });
      flecks.forEach(function (f) {
        ctx.save();
        ctx.globalAlpha = f.alpha;
        ctx.fillStyle = f.color;
        ctx.translate(f.x, f.y);
        ctx.rotate(f.rot);
        ctx.fillRect(-f.size, -f.size * 0.35, f.size * 2, f.size * 0.7);
        ctx.restore();
      });
    }

    function step() {
      t++;
      streaks.forEach(function (s) {
        s.x += s.speed;
        if (s.x > w + 20) { s.x = -s.len - rand(0, w * 0.5); s.y = rand(0, h); }
      });
      flecks.forEach(function (f) {
        f.x += f.speed; f.y += Math.sin((t + f.x) * 0.01) * 0.3; f.rot += f.spin;
        if (f.x > w + 10) { f.x = -10; f.y = rand(0, h); }
      });
      draw();
      if (!still) requestAnimationFrame(step);
    }

    resize();
    window.addEventListener("resize", resize);
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () { readColors(); seed(); draw(); });
    if (!still) requestAnimationFrame(step);
  });
})();
