// ########## Create references ##########

const btn = document.querySelector(".btn");
const main = document.querySelector("main");

// ########## Create event listeners ##########

btn.addEventListener("click", () => {
  btn.innerHTML = /*html*/ `<div class="loader"></div>`;

  // setTimeout just to delay the fetch in order to see what happens. Takes two arguments. The first argument is the callback that will execute after a time delay, which is the second argument.
  setTimeout(() => {
    console.log("log after 2000ms");
    btn.innerText = "Click to fetch users";
  }, 2000);
});
