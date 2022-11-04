let token = JSON.parse(window.localStorage.getItem("tokens"));
const access_token = token.access_token;
console.log("sumtks", access_token);
var allOrderData = [];
var total = 0;
var totalOrders = 0;
var lastYrTotalOrders = [];
async function getOrders() {
  const data = await (
    await fetch(`https://freddy.codesubmit.io/orders?`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    })
  ).json();
  allOrderData.push(data);
  console.log("allod", allOrderData[0].orders);
  let dataitems = allOrderData[0].orders;
  for (let data of dataitems) {
    if (new Date(data.created_at).getFullYear() === 2021) {
      total += data.total;
      lastYrTotalOrders.push(data);
    }
  }
  //dynamically display last yr summary data
  document.getElementById("yramount").innerHTML = total;
  document.getElementById("torders").innerHTML = lastYrTotalOrders.length;
  console.log(total, lastYrTotalOrders.length);
}
document.getElementById("lastyr").innerHTML = `<div><span>Last Year</span>
<div><span id="yramount"> </span> <span>/ </span><span id="torders"></span> <span>orders</span></div>`;
window.onload = getOrders();
//webcomponent for summary cards
class SummaryCard extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `<div>
    <span>${this.getAttribute("period")}</span>
    <div><span>$${this.getAttribute(
      "amount"
    )} </span> <span>/ </span><span>${this.getAttribute(
      "orders"
    )} </span> <span>orders</span></div>
  </div>`;
  }
}
window.customElements.define("summary-card", SummaryCard);
