// Tesbih: her tıklama bir istiğfar. Sayı tarayıcıda saklanır.
(function () {
  var btn = document.querySelector(".tesbih");
  if (!btn) return;
  var countEl = btn.querySelector(".count");
  var labelEl = btn.querySelector(".label");
  var phrases = ["Estağfirullah", "Sübhanallah", "Elhamdülillah", "Allahu Ekber"];
  var n = 0;
  try { n = parseInt(localStorage.getItem("sam-tesbih") || "0", 10) || 0; } catch (e) {}

  function render() {
    countEl.textContent = n % 99;
    labelEl.textContent = phrases[Math.floor((n % 99) / 33) % phrases.length];
  }
  render();

  btn.addEventListener("click", function () {
    n += 1;
    try { localStorage.setItem("sam-tesbih", String(n)); } catch (e) {}
    render();
    btn.classList.add("tick");
    setTimeout(function () { btn.classList.remove("tick"); }, 150);
  });
})();

// Çarşaf: yüzü örten perde. Tıklayınca açılır/kapanır.
document.querySelectorAll("[data-veil]").forEach(function (el) {
  el.addEventListener("click", function () {
    var open = el.classList.toggle("unveiled");
    var hint = el.querySelector(".veil-hint");
    if (hint) hint.textContent = open ? "çarşafı ört" : "çarşafı aç";
  });
});
