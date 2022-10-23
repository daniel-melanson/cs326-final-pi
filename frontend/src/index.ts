import bootstrap from "bootstrap";


const popoverTriggerList = document.querySelectorAll(
  '[data-bs-toggle="popover"]'
);
const popoverList = Array.from(popoverTriggerList).map(
  (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
);

customElements.define("filter-category", FilterCategory);
