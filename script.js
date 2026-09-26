const listings = [
  { name: "Ocean Breeze Villa", address: "123 Main Street, Anytown, CA 12345", beds: 4, baths: 2, price: 910000, image: "images/house-1.jpg" },
  { name: "Jakson House", address: "456 Oak Avenue, New York, NY 10001", beds: 1, baths: 2, price: 750000, image: "images/house-2.jpg" },
  { name: "Lakeside Cottage", address: "789 Maple Lane, Los Angeles, 90001", beds: 3, baths: 1, price: 540000, image: "images/house-3.jpg" },
  { name: "Sunset Ridge Manor", address: "21 Ridge Road, Austin, TX 73301", beds: 5, baths: 3, price: 1250000, image: "images/house-4.jpg" },
  { name: "Palm Court Residence", address: "88 Palm Court, Miami, FL 33101", beds: 4, baths: 3, price: 980000, image: "images/house-5.jpg" },
  { name: "Cedar Grove Home", address: "14 Cedar Grove, Seattle, WA 98101", beds: 4, baths: 2, price: 865000, image: "images/house-6.jpg" },
];

const PER_PAGE_DESKTOP = 3;

const bedIcon = `<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true"><path d="M3 6h2v6h14a2 2 0 0 1 2 2v5h-2v-2H5v2H3zm5 1a2 2 0 1 1 0 4 2 2 0 0 1 0-4m3 1h6a2 2 0 0 1 2 2v1h-8z"/></svg>`;
const bathIcon = `<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true"><path d="M7 4a2 2 0 0 1 2 2h-2v6h14v2a5 5 0 0 1-3 4.6V21h-2v-2H8v2H6v-2.4A5 5 0 0 1 3 14v-2h2V6a4 4 0 0 1 2-2"/></svg>`;

const formatPrice = (n) =>
  "€" + n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const cardHTML = (l) => `
  <article class="card">
    <div class="card-media"><img src="${l.image}" alt="${l.name}" loading="lazy"></div>
    <div class="card-body">
      <div class="card-meta">
        <span class="address">${l.address}</span>
        <span class="icon">${bedIcon}${l.beds}</span>
        <span class="icon">${bathIcon}${l.baths}</span>
      </div>
      <h3>${l.name}</h3>
      <p class="price">${formatPrice(l.price)}</p>
    </div>
  </article>`;

const track = document.getElementById("track");
const dots = document.getElementById("dots");
let page = 0;
let pages = 0;

function perPage() {
  return window.matchMedia("(max-width: 820px)").matches ? 1 : PER_PAGE_DESKTOP;
}

function render() {
  const n = perPage();
  pages = Math.ceil(listings.length / n);
  track.innerHTML = "";
  dots.innerHTML = "";

  for (let p = 0; p < pages; p++) {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.innerHTML = listings.slice(p * n, p * n + n).map(cardHTML).join("");
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

// Search bar: jump to listings
document.getElementById("search").addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("most-viewed").scrollIntoView({ behavior: "smooth" });
});

// Mobile nav
const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav-toggle");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
nav.querySelectorAll(".nav-links a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

document.getElementById("year").textContent = new Date().getFullYear();
