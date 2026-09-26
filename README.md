# Vik Homes

Static real-estate website for Vik Homes. Open `index.html` in a browser — no build step.

## Pages
- `index.html` – home (hero, search, Most Viewed carousel)
- `listings.html` – all homes, filtered by `?city=`, `?type=`, `?price=`, `?q=`, sorted by `?sort=`
- `property.html?id=<id>` – property details, viewing request form, similar homes
- `location.html` – homes by city
- `about.html` – about us
- `contacts.html` – contact details and form
- `support.html` – help topics and searchable FAQ

## Files
- `data.js` – the property listings (edit this to add/change homes)
- `common.js` – shared helpers (cards, prices, mobile menu, forms)
- `script.js`, `listings.js`, `property.js`, `support.js` – page scripts
- `styles.css` – all styles (responsive)
- `images/` – property photos

Forms have no backend yet: they validate and show a confirmation message but don't send anything.
