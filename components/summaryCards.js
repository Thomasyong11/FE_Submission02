//webcomponent for summary cards
class SummaryCard extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `<div>
    <span>${this.getAttribute("period")}</span>
    <div>$${this.getAttribute(
      "amount"
    )} <span>/ </span>9 <span>orders</span></div>
  </div>`;
  }
}
window.customElements.define("summary-card", SummaryCard);
