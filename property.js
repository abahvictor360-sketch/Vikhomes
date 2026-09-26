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

  $("p-type").textContent = `${home.type} · ${home.city}`;
  $("p-price").textContent = formatPrice(home.price);
  $("p-message").value = `Hi, I'm interested in ${home.name} (${address}).`;

  const similar = LISTINGS
    .filter((l) => l.id !== home.id)
    .sort((a, b) => (b.type === home.type) - (a.type === home.type) || Math.abs(a.price - home.price) - Math.abs(b.price - home.price))
    .slice(0, 3);
  $("similar").innerHTML = similar.map(cardHTML).join("");

  $("property").hidden = false;
}
