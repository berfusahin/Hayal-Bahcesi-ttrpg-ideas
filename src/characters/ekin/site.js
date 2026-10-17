// Işıksız Bahçe — mask toggle and wall visions, shared by every page.
(function () {
  var KEY = "ekin-mask";
  var body = document.body;
  var btn = document.querySelector(".mask-toggle");

  function setMask(on) {
    body.classList.toggle("mask", on);
    if (btn) {
      btn.textContent = on ? "Maskeyi çıkar" : "Maskeyi tak";
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    }
    try { localStorage.setItem(KEY, on ? "1" : "0"); } catch (e) {}
  }

  var saved = false;
  try { saved = localStorage.getItem(KEY) === "1"; } catch (e) {}
  setMask(saved);
  if (btn) btn.addEventListener("click", function () { setMask(!body.classList.contains("mask")); });

  // She cannot hear, only see: words and signs surface on the walls and fade.
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var words = [
    "Tik Tak", "Tik Tak", "Gecenin yolcuları", "♂ Mars izliyor", "27", "12 değil, 27",
    "◉ ◉ ◉", "Anne?", "aslan gözleri", "kısır güneş", "sırtlan kıkırdıyor",
    "bahçeni sula", "kan damlıyor", "hiç gitmediler ki", "yüzü yok", "137"
  ];
  var layer = document.createElement("div");
  layer.className = "vision-layer";
  layer.setAttribute("aria-hidden", "true");
  body.appendChild(layer);

  function spawn() {
    if (!body.classList.contains("mask") && !document.hidden) {
      var el = document.createElement("span");
      el.className = "vision-word";
      el.textContent = words[Math.floor(Math.random() * words.length)];
      var side = Math.random() < 0.5;
      el.style.left = (side ? 1 + Math.random() * 10 : 78 + Math.random() * 14) + "vw";
      el.style.top = (8 + Math.random() * 84) + "vh";
      el.style.fontSize = (0.75 + Math.random() * 0.9).toFixed(2) + "rem";
      el.style.rotate = (Math.random() * 16 - 8).toFixed(1) + "deg";
      layer.appendChild(el);
      setTimeout(function () { el.remove(); }, 7200);
    }
    setTimeout(spawn, 3500 + Math.random() * 5000);
  }
  setTimeout(spawn, 2500);
})();
