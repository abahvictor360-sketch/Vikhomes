// Property detail page, driven by ?id=<listing id>.

const id = new URLSearchParams(location.search).get("id");
const home = LISTINGS.find((l) => l.id === id);

if (!home) {
  document.getElementById("not-found").hidden = false;
  document.getElementById("p-name").textContent = "Home not found";
} else {
  const $ = (sel) => document.getElementById(sel);
  const address = `${home.street}, ${home.city}, ${home.state}`;

  document.title = `${home.name} — Vik Homes`;
  $("hero").style.setProperty("--hero", `url('${home.image}')`);
  $("crumb-name").textContent = home.name;
  $("p-name").textContent = home.name;
  $("p-address").textContent = address;

  $("p-photo").src = home.image;
  $("p-photo").alt = `${home.name}, ${address}`;
  $("p-beds").textContent = home.beds;
  $("p-baths").textContent = home.baths;
  $("p-area").textContent = `${home.area} m²`;
  $("p-year").textContent = home.year;
  $("p-parking").textContent = home.parking;
  $("p-description").textContent = home.description;
  $("p-features").innerHTML = home.features.map((f) => `<li>${escapeHTML(f)}</li>`).join("");

  $("p-specs").innerHTML = [
    ["Property type", home.type],
    ["City", `${home.city}, ${home.state}`],
    ["Year built", home.year],
    ["Living area", `${home.area} m²`],
    ["Price per m²", formatPrice(Math.round(home.price / home.area))],
    ["Bedrooms / bathrooms", `${home.beds} / ${home.baths}`],
    ["Parking spaces", home.parking],
  ].map(([k, v]) => `<tr><th scope="row">${k}</th><td>${escapeHTML(v)}</td></tr>`).join("");

  $("p-type").textContent = `${home.type} · ${home.city}`;
  $("p-price").textContent = formatPrice(home.price);
  $("p-message").value = `Hi, I'm interested in ${home.name} (${address}).`;

  const similar = LISTINGS
    .filter((l) => l.id !== home.id)
    .sort((a, b) => (b.type === home.type) - (a.type === home.type) || Math.abs(a.price - home.price) - Math.abs(b.price - home.price))
    .slice(0, 3);
  $("similar").innerHTML = similar.map(cardHTML).join("");

  // Mortgage calculator (standard repayment formula)
  const calc = $("calc");
  calc.price.value = home.price;
  function updateCalc() {
    const price = Math.max(0, Number(calc.price.value) || 0);
    const deposit = price * Math.min(100, Math.max(0, Number(calc.deposit.value) || 0)) / 100;
    const loan = price - deposit;
    const r = (Number(calc.rate.value) || 0) / 100 / 12;
    const n = Math.max(1, Number(calc.years.value) || 1) * 12;
    const monthly = r ? (loan * r) / (1 - Math.pow(1 + r, -n)) : loan / n;
    $("calc-monthly").textContent = formatPrice(Math.round(monthly));
    $("calc-deposit").textContent = formatPrice(Math.round(deposit));
    $("calc-loan").textContent = formatPrice(Math.round(loan));
    $("calc-interest").textContent = formatPrice(Math.max(0, Math.round(monthly * n - loan)));
  }
  calc.addEventListener("input", updateCalc);
  calc.addEventListener("submit", (e) => e.preventDefault());
  updateCalc();

  $("property").hidden = false;
}
