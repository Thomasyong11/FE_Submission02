async function login(event) {
  event.preventDefault();
  const username = "freddy";
  const password = "ElmStreet2019";
  console.log(username);
  try {
    const result = await (
      await fetch("https://freddy.codesubmit.io/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // mode: "cors",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
    ).json();
    if (result.access_token) {
      window.localStorage.setItem("tokens", JSON.stringify(result));
      window.location.href = "dashboard.html";
    } else {
      //alert user and
      //navigate to home
      window.alert("wrong credentials");
      window.location.href = "index.html";
    }
  } catch (error) {
    console.log("error", error);
  }
}
//refresh token function
async function checkRefreshToken() {
  let token = JSON.parse(window.localStorage.getItem("tokens"));
  const refresh_token = token.refresh_token;
  console.log("first", refresh_token);
  console.log("ali", window.localStorage.getItem("tokens"));
  const access_token = token.access_token;
  var decoded = atob(access_token.split(".")[1]);
  if (decoded.exp < new Date() / 1000) {
    const result = await (
      await fetch("https://freddy.codesubmit.io/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + refresh_token,
        },
      })
    ).json();
    // console.log("results", result);

    console.log("fef", JSON.parse(window.localStorage.getItem("tokens")));
    console.log(decoded);

    const navigate = "/dashboard";
    window.navigate = navigate;
  }
  window.localStorage.setItem("tokens", JSON.stringify(result));
}

checkRefreshToken();

//LogOut
const logout = document.querySelector(".logout");

logout.addEventListener("click", async () => {
  if (!logout) return;
  window.localStorage.removeItem("tokens");
  this.window.navigate("index");
});

//protected routes
async function protectedRoute() {
  if (!window.localStorage.getItem("tokens")) {
    window.alert("not authorized to perform this action");
    location = "/index.html";
    return;
  }
}

let dataSet = [];

async function dashboard() {
  // let token = JSON.parse(sessionStorage.getItem("tokens"));
  let token = JSON.parse(window.localStorage.getItem("tokens"));
  const access_token = token.access_token;
  const data = await (
    await fetch("https://freddy.codesubmit.io/dashboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    })
  ).json();
  dataSet.push(data.dashboard);
  console.log(dataSet[0].bestsellers);
  bestsellers = dataSet[0].bestsellers;
  loadTableData(bestsellers);
  return data;
}

function loadTableData(itemData) {
  const tableBody = document.getElementById("tableData");
  let items = itemData.slice(0, 4);
  let dataHtml = "";
  for (let item of items) {
    dataHtml += `<tr><td>${item.product.name}</td><td>${
      item.price ? item.price : ""
    }</td><td>${item.units}</td><td>${item.revenue}</td></tr>`;
  }
  tableBody.innerHTML = dataHtml;
}

function runOnLoad() {
  dashboard();
  getOrders();
  protectedRoute();
}
window.onload = runOnLoad;

let orderData = [];
var page = 1;
function pageCounter() {
  var pagenumber = document.getElementById("pagenumber");

  if (page === 3) {
    page -= 2;
  } else {
    page++;
  }

  pagenumber.innerHTML = page;
  searchItems();
}
//search functionality
let search_term = "";
search_text = document.addEventListener("keydown", (event) => {
  getSearchTerm();
});
function getSearchTerm() {
  let search_text = document.getElementById("search").value;
  search_term = search_text.toLowerCase();
  console.log("search", search_term);
  getOrders();
}
//variable to store order data
var od;

async function getOrders() {
  console.log(page);
  let token = JSON.parse(window.localStorage.getItem("tokens"));
  const access_token = token.access_token;
  console.log(page);
  const data = await (
    await fetch(
      `https://freddy.codesubmit.io/orders?page=${page}&q=${search_term}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    )
  ).json();
  orderData.push(data);
  console.log(orderData);
  od = orderData[page - 1].orders;
  //filter with search term
  if (search_term) {
    var filter = od.filter((order) =>
      order.product.name.toLowerCase().includes(search_term)
    );
    loadOrderData(filter);
    console.log("fil", filter);
  } else {
    loadOrderData(od);
  }

  console.log(od);
}
function getDate(date) {
  let sysDate = new Date(date);
  newDate = sysDate.toLocaleDateString();
  return newDate;
}
function loadOrderData(itemData) {
  const tableBody = document.getElementById("orderTableData");
  let dataHtml = "";
  for (let item of itemData) {
    dataHtml += `<tr><td>${
      item.product.name ? item.product.name : ""
    }</td><td>${item.created_at ? getDate(item.created_at) : ""}</td><td>${
      item.price ? item.price : ""
    }</td><td  class="${item.status}" value="${item.status}">${
      item.status ? item.status : ""
    }</td></tr>`;
  }
  tableBody.innerHTML = dataHtml;

  //console.log(dataHtml);
}
// const collection = document.getElementsByTagName("td");

// // let arry = [...collection.item];

// var arr = [];
// [].push.apply(arr, collection);
// console.log(arr);

// for (let i = 0; i < collection.length; i++) {
//   if (collection.item(i).innerHTML === "processing") {
//     collection.item(i).classList.add("processing");
//   }
//   // collection.item(i).style.fontSize = "24px";
// }
//in order to update the search terms
// function searchItems() {
//   getOrders();
// }

// let statusText = document.getElementById(".td").innerHTML;

// function colorStatus() {
//   if (statusText === "processing") {
//     td.setAttribute("class", "processing");
//   } else if (statusText === "delivered") {
//     td.setAttribute("class", "processing");
//   } else {
//     td.setAttribute("class", "processing");
//   }
// }
// let itemData = [
//   { product: "rice", price: 100, unitsold: 20, revenue: 2000 },
//   { product: "salt", price: 100, unitsold: 20, revenue: 2000 },
//   { product: "pepper", price: 100, unitsold: 20, revenue: 2000 },
//   { product: "kenkey", price: 100, unitsold: 20, revenue: 2000 },
// ];

//in order to set innerHtml property for the tablebody i used the window onload callback function
// window.onload = () => {
//   bestsellers = itemData[0].bestsellers;
//   loadTableData(bestsellers);
//   console.log("data", bestsellers);
// };

let statusElm = document.getElementsByTagName;
console.log(statusElm.textContent, "relem");
