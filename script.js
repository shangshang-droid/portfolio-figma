(function () {
  var root = document.documentElement;
  var nav = document.getElementById("nav");
  var navLinks = document.getElementById("navLinks");
  var menuBtn = document.getElementById("menuBtn");
  var themeBtn = document.getElementById("themeBtn");
  var copyBtn = document.getElementById("copyBtn");
  var copyStatus = document.getElementById("copyStatus");
  var mail = document.getElementById("mail");
 
  /* ---- Footer year ---- */
  document.getElementById("year").textContent = new Date().getFullYear();
 
  /* ---- Theme toggle (remembers choice) ---- */
  function currentTheme() {
    var set = root.getAttribute("data-theme");
    if (set) return set;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
 
  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    var next = theme === "dark" ? "light" : "dark";
    themeBtn.textContent = theme === "dark" ? "Light" : "Dark";
    themeBtn.setAttribute("aria-label", "Switch to " + next + " theme");
  }
 
  try {
    var saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);
  } catch (e) {}
  applyTheme(currentTheme());
 
  themeBtn.addEventListener("click", function () {
    var next = currentTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
 
  /* ---- Mobile menu ---- */
  function setMenu(open) {
    navLinks.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.textContent = open ? "Close" : "Menu";
  }
 
  menuBtn.addEventListener("click", function () {
    setMenu(!navLinks.classList.contains("open"));
  });
 
  navLinks.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });
 
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });
 
  /* ---- Nav border once the page scrolls ---- */
  function onScroll() {
    nav.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
 
  /* ---- Copy email ---- */
  copyBtn.addEventListener("click", function () {
    var email = mail.textContent.trim();
 
    function done(ok) {
      copyBtn.textContent = ok ? "Copied" : "Copy failed";
      copyStatus.textContent = ok ? "Email copied to clipboard" : "Could not copy the email";
      setTimeout(function () { copyBtn.textContent = "Copy email"; }, 2000);
    }
 
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(function () { done(true); }, function () { done(false); });
    } else {
      done(false);
    }
  });
})();
 
