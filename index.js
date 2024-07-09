// ########## Create references ##########

const btn = document.querySelector(".btn");
const main = document.querySelector("main");

// ########## Create event listeners ##########

btn.addEventListener("click", () => {
  btn.innerHTML = /*html*/ `<div class="loader"></div>`;

  // setTimeout just to delay the fetch in order to see what happens. Takes two arguments. The first argument is the callback that will execute after a time delay, which is the second argument.
  setTimeout(() => {
    fetchUsers().then((users) => {
      console.log(users);

      // I want to convert the array of users object in to an array with html string that I can inject in to the DOM.
      const usersAsHTML = users.map((user) => createCard(user));
      console.log("userAsHtml:", usersAsHTML);

      console.log(usersAsHTML.join(""));
      main.innerHTML = usersAsHTML.join("");
    });

    btn.innerText = "Click to fetch users";
  }, 2000);
});

// ########## Test Code ##########

// const users = fetchUsers();
// console.log("users:", users);

// Docs on response object: https://developer.mozilla.org/en-US/docs/Web/API/Response

// The above will just get the promise object since it doesn't "respect" the asyncronous nature of the metho, and that's kist how it is. We can't just add "await" since "await" is only allowed inside a function that has been tagged with "async".

// Solution: use .then().

// fetchUsers().then((users) => {
//   console.log(users);
// });

// ########## Functions ##########

function createCard(user) {
  const html = `
  <article class="card" id="${user.id}">
    <div class="card-header">
      <span class="avatar material-symbols-outlined">account_circle</span>
      <div class="info">
        <p class="name">${user.name}</p>
        <p class="username">${user.username}</p>
      </div>
    </div>

    <div class="card-content">
      <div class="phone">
        <span class="material-symbols-outlined"> call </span>
        <p>${user.phone}</p>
      </div>
      <div class="email">
        <span class="material-symbols-outlined"> mail </span>
        <p>${user.email}</p>
      </div>
      <div class="website">
        <span class="material-symbols-outlined"> language </span>
        <p>${user.website}</p>
      </div>
      <div class="address">
        <span class="material-symbols-outlined"> location_on </span>
        <p>${user.address.street}, ${user.address.suite}</p>
      </div>

      <div class="company">
        <div class="square"></div>
        <div class="info">
          <p class="name">${user.company.name}</p>
          <div class="catch-phrase">
            <p>${user.company.catchPhrase}</p>
            <p>${user.company.bs}</p>
          </div>
        </div>
      </div>
    </div>
  </article>
  `;

  return html;
}

async function fetchUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    // console.log("response:", response);

    const users = await response.json();
    // console.log("data:", data);

    return users;
  } catch (error) {
    console.log(error);
  }
}
