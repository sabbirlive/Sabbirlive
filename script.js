// Running timecode in the viewfinder
(function () {
  var el = document.getElementById('timecode');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!el || reduce) return;
  var start = Date.now();
  function pad(n) { return String(n).padStart(2, '0'); }
  setInterval(function () {
    var s = Math.floor((Date.now() - start) / 1000);
    el.textContent = pad(Math.floor(s / 3600)) + ':' + pad(Math.floor(s / 60) % 60) + ':' + pad(s % 60);
  }, 1000);
})();

// English / বাংলা toggle
(function () {
  var btn = document.getElementById('langToggle');
  var nodes = document.querySelectorAll('[data-en][data-bn]');
  function apply(lang) {
    nodes.forEach(function (n) { n.textContent = n.getAttribute('data-' + lang); });
    document.documentElement.lang = lang;
    btn.textContent = lang === 'bn' ? 'English' : 'বাংলা';
    btn.setAttribute('aria-pressed', lang === 'bn');
    try { localStorage.setItem('lang', lang); } catch (e) {}
  }
  var saved = 'en';
  try { saved = localStorage.getItem('lang') || 'en'; } catch (e) {}
  if (saved === 'bn') apply('bn');
  btn.addEventListener('click', function () {
    apply(document.documentElement.lang === 'bn' ? 'en' : 'bn');
  });
})();

document.getElementById('year').textContent = new Date().getFullYear();
