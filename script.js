// Home page: Most Viewed carousel and search bar.

const PER_PAGE_DESKTOP = 3;

const track = document.getElementById("track");
const dots = document.getElementById("dots");
let page = 0;
let pages = 0;

function perPage() {
  if (window.matchMedia("(max-width: 640px)").matches) return 1;
  if (window.matchMedia("(max-width: 1100px)").matches) return 2;
  return PER_PAGE_DESKTOP;
}

function render() {
  const n = perPage();
  pages = Math.ceil(LISTINGS.length / n);
  track.innerHTML = "";
  dots.innerHTML = "";

  for (let p = 0; p < pages; p++) {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.innerHTML = LISTINGS.slice(p * n, p * n + n).map(cardHTML).join("");
    track.appendChild(slide);

    const dot = document.createElement("button");
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", `Page ${p + 1}`);
    dot.addEventListener("click", () => go(p));
    dots.appendChild(dot);
  }
  go(Math.min(page, pages - 1));
}

function go(p) {
  page = (p + pages) % pages;
  track.style.transform = `translateX(-${page * 100}%)`;
  [...dots.children].forEach((d, i) => d.setAttribute("aria-selected", i === page));
}

// Swipe support
let startX = null;
track.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX), { passive: true });
track.addEventListener("touchend", (e) => {
  if (startX === null) return;
  const dx = e.changedTouches[0].clientX - startX;
  if (Math.abs(dx) > 40) go(page + (dx < 0 ? 1 : -1));
  startX = null;
});

let lastPerPage = perPage();
window.addEventListener("resize", () => {
  if (perPage() !== lastPerPage) {
    lastPerPage = perPage();
    page = 0;
    render();
  }
});

render();
fillSearchOptions(document.getElementById("search"));
