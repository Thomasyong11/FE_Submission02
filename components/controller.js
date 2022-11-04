//Login
async function login(event) {
  event.preventDefault();
  const username = "freddy";
  const password = "ElmStreet2019";
  try {
    const result = await (
      await fetch("https://freddy.codesubmit.io/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
  // console.log("first", refresh_token);
  // console.log("ali", window.localStorage.getItem("tokens"));
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
    window.localStorage.setItem("tokens", JSON.stringify(result));
    //console.log("fef", JSON.parse(window.localStorage.getItem("tokens")));
    //console.log(decoded);

    const navigate = "/dashboard";
    window.navigate = navigate;
  }
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

//dashboard
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
  console.log("bestsellers", dataSet[0].bestsellers);
  bestsellers = dataSet[0].bestsellers;
  //call loadtable function
  loadTableData(bestsellers);
  return data;
}
//function to load data to table
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

//function to passed to window.onload, this is to allow multiple functions to be run when windows loads
function runOnLoad() {
  dashboard();
  getOrders();
  protectedRoute();
}
window.onload = runOnLoad;

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
//order data variable
var orderData = [];
//variable to store order data filtered by page number
var oderDataByPage;
async function getOrders() {
  let token = JSON.parse(window.localStorage.getItem("tokens"));
  const access_token = token.access_token;
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
  console.log("od", orderData);
  //getting items by their page number for pagnation function
  oderDataByPage = orderData[page - 1].orders;
  //filter with search term
  if (search_term) {
    var filteredData = oderDataByPage.filter((order) =>
      order.product.name.toLowerCase().includes(search_term)
    );
    loadOrderData(filteredData);
    console.log("fil", filter);
  } else {
    loadOrderData(oderDataByPage);
  }

  console.log("page-fil", oderDataByPage);
}
//function to change date format
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
}
