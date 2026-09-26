// Support page: filter FAQs by topic or search text.

const items = [...document.querySelectorAll("#faq details")];
const search = document.getElementById("faq-search");
const reset = document.getElementById("faq-reset");
const title = document.getElementById("faq-title");
const empty = document.getElementById("faq-empty");
let topic = "";

function apply() {
  const q = search.value.trim().toLowerCase();
  let shown = 0;
  items.forEach((d) => {
    const match = (!topic || d.dataset.topic === topic) && (!q || d.textContent.toLowerCase().includes(q));
    d.hidden = !match;
    if (match) shown++;
  });
  empty.hidden = shown > 0;
  reset.hidden = !topic && !q;
  document.querySelectorAll("#topics .tile").forEach((t) => t.classList.toggle("active", t.dataset.topic === topic));
  const active = document.querySelector(`#topics [data-topic="${topic}"] h3`);
  title.textContent = active ? `${active.textContent} Questions` : "Frequently Asked Questions";
}

document.querySelectorAll("#topics .tile").forEach((t) =>
  t.addEventListener("click", () => {
    topic = topic === t.dataset.topic ? "" : t.dataset.topic;
    apply();
    document.getElementById("faq").scrollIntoView({ behavior: "smooth", block: "start" });
  })
);

search.addEventListener("input", apply);
reset.addEventListener("click", () => {
  topic = "";
  search.value = "";
  apply();
});
