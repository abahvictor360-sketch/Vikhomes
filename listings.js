// Listings page: filter and sort homes from the URL query.

const params = new URLSearchParams(location.search);
const form = document.getElementById("search");
fillSearchOptions(form, params);
form.q.value = params.get("q") || "";

const sortSelect = document.getElementById("sort");
sortSelect.value = params.get("sort") || "";
form.sort.value = sortSelect.value;

function filtered() {
  const city = params.get("city");
  const type = params.get("type");
  const price = Number(params.get("price")) || Infinity;
  const q = (params.get("q") || "").trim().toLowerCase();

  let list = LISTINGS.filter((l) =>
    (!city || l.city === city) &&
    (!type || l.type === type) &&
    l.price <= price &&
    (!q || [l.name, l.street, l.city, l.state, l.type].join(" ").toLowerCase().includes(q))
  );

  const sorters = {
    "price-asc": (a, b) => a.price - b.price,
    "price-desc": (a, b) => b.price - a.price,
    newest: (a, b) => b.year - a.year,
    beds: (a, b) => b.beds - a.beds,
  };
  const sort = sorters[params.get("sort")];
  if (sort) list = [...list].sort(sort);
  return list;
}

function renderChips() {
  const labels = {
    city: (v) => v,
    type: (v) => v,
    price: (v) => `Up to ${formatPrice(Number(v))}`,
    q: (v) => `“${v}”`,
  };
  const chips = document.getElementById("chips");
  chips.innerHTML = "";
  for (const key of Object.keys(labels)) {
    const value = params.get(key);
    if (!value) continue;
    const next = new URLSearchParams(params);
    next.delete(key);
    const a = document.createElement("a");
    a.className = "chip";
    a.href = "listings.html" + (next.toString() ? "?" + next : "");
    a.innerHTML = `${escapeHTML(labels[key](value))} <span aria-hidden="true">×</span>`;
    a.setAttribute("aria-label", `Remove filter ${labels[key](value)}`);
    chips.appendChild(a);
  }
}

const list = filtered();
document.getElementById("results").innerHTML = list.map(cardHTML).join("");
document.getElementById("results-count").textContent =
  `${list.length} ${list.length === 1 ? "home" : "homes"} found`;
document.getElementById("empty").hidden = list.length > 0;
renderChips();

sortSelect.addEventListener("change", () => {
  form.sort.value = sortSelect.value;
  form.submit();
});
