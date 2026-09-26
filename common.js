// Shared helpers used on every page.

const formatPrice = (n) =>
  "€" + n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const escapeHTML = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const bedIcon = `<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true"><path d="M3 6h2v6h14a2 2 0 0 1 2 2v5h-2v-2H5v2H3zm5 1a2 2 0 1 1 0 4 2 2 0 0 1 0-4m3 1h6a2 2 0 0 1 2 2v1h-8z"/></svg>`;
const bathIcon = `<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true"><path d="M7 4a2 2 0 0 1 2 2h-2v6h14v2a5 5 0 0 1-3 4.6V21h-2v-2H8v2H6v-2.4A5 5 0 0 1 3 14v-2h2V6a4 4 0 0 1 2-2"/></svg>`;

function cardHTML(l) {
  return `
  <a class="card" href="property.html?id=${l.id}">
    <div class="card-media"><img src="${l.image}" alt="${escapeHTML(l.name)}" loading="lazy"></div>
    <div class="card-body">
      <div class="card-meta">
        <span class="address">${escapeHTML(l.street)}, ${escapeHTML(l.city)}, ${escapeHTML(l.state)}</span>
        <span class="icon" title="Bedrooms">${bedIcon}${l.beds}</span>
        <span class="icon" title="Bathrooms">${bathIcon}${l.baths}</span>
      </div>
      <h3>${escapeHTML(l.name)}</h3>
      <p class="price">${formatPrice(l.price)}</p>
    </div>
  </a>`;
}

// Fill the City / Type selects of a search form from the listing data.
function fillSearchOptions(form, params = new URLSearchParams()) {
  const city = form.querySelector('[name="city"]');
  const type = form.querySelector('[name="type"]');
  const price = form.querySelector('[name="price"]');
  if (city) {
    city.innerHTML = `<option value="">All cities</option>` + CITIES.map((c) => `<option>${c}</option>`).join("");
    city.value = params.get("city") || "";
  }
  if (type) {
    type.innerHTML = `<option value="">Any type</option>` + TYPES.map((t) => `<option>${t}</option>`).join("");
    type.value = params.get("type") || "";
  }
  if (price) {
    const caps = [600000, 800000, 950000, 1300000];
    price.innerHTML = `<option value="">Any price</option>` + caps.map((c) => `<option value="${c}">Up to ${formatPrice(c)}</option>`).join("");
    price.value = params.get("price") || "";
  }
}

// Mobile nav
const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav-toggle");
if (nav && toggle) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
}

// Forms without a backend: show a confirmation message instead of submitting.
document.querySelectorAll("form[data-demo]").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) return form.reportValidity();
    const msg = form.querySelector(".form-success");
    if (msg) msg.hidden = false;
    form.querySelectorAll("input, textarea, select").forEach((el) => {
      if (el.type !== "submit" && !el.dataset.keep) el.value = "";
    });
  });
});

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
