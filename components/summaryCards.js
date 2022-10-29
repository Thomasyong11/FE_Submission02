class SummaryCard extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `<div>
    <span>${this.getAttribute("period")}</span>
    <div>$1456 <span>/ </span>9 <span>orders</span></div>
  </div>`;
  }
}
window.customElements.define("summary-card", SummaryCard);
