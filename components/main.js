//WebPage title
document.title = "Freddy's Artisanal Halloween Candy Shop";

//Toggle switch for revenue
let toggle = document.querySelector(".toggle");
let show = document.querySelector(".show");
let disabled = document.querySelector(".disabled");
let day = document.getElementById("days");
let period = document.getElementById("period");

function Animatedtoggle() {
  toggle.classList.toggle("active");
  if (toggle.classList.contains("active")) {
    day.innerHTML = 12;
    period.innerHTML = " months";
  } else {
    day.innerHTML = 7;
    period.innerHTML = " days";
  }
  if (toggle.classList.contains("active") && show.classList.contains("show")) {
    show.classList.remove("show");
    show.classList.add("disabled");
    disabled.classList.remove("disabled");
    disabled.classList.add("show");
  } else {
    show.classList.remove("disabled");
    show.classList.add("show");
    disabled.classList.remove("show");
    disabled.classList.add("disabled");
  }
}

//Best sellers table
//dummy data

// let itemData = [
//   { product: "rice", price: 100, unitsold: 20, revenue: 2000 },
//   { product: "salt", price: 100, unitsold: 20, revenue: 2000 },
//   { product: "pepper", price: 100, unitsold: 20, revenue: 2000 },
//   { product: "kenkey", price: 100, unitsold: 20, revenue: 2000 },
// ];

// //in order to set innerHtml property for the tablebody i used the window onload callback function
// window.onload = () => {
//   loadTableData(itemData);
// };

// function loadTableData(itemData) {
//   const tableBody = document.getElementById("tableData");
//   let dataHtml = "";
//   for (let item of itemData) {
//     dataHtml += `<tr><td>${item.product}</td><td>${item.price}</td><td>${item.unitsold}</td><td>${item.revenue}</td></tr>`;
//   }
//   //   console.log(dataHtml);
//   tableBody.innerHTML = dataHtml;
// }
