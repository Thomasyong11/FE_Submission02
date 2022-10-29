document.title = "Freddy's Artisanal Halloween Candy Shop";

let toggle = document.querySelector(".toggle");
let show = document.querySelector(".show");
let disabled = document.querySelector(".disabled");

function Animatedtoggle() {
  toggle.classList.toggle("active");
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

// class Login extends HTMLElement {
//   connectedCallback() {
//     this.innerHTML = `
//         <div class="form login">
//         <div class="form-content">
//         <header class="header-main">
//           <text class="header-text"
//             >Freddy's Artisanal Halloween Candy Shop</text
//           >
//           <img class="freddy-logo" src="assets/Freddys_Logo.svg" />
//         </header>
//         <form action="#">
//           <div class="field input-field">
//             <input type="text" placeholder="username" class="input" />
//           </div>
//           <div class="field input-field">
//             <input type="password" placeholder="********" class="password" />
//           </div>
//           <div class="field button-field">
//             <button>Login</button>
//           </div>
//         </form>
//       </div>`;
//   }
// }

// customElements.define("app-login", Login);
