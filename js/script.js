//global variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const modalNext = document.querySelector("#modal-next");
const modalBack = document.querySelector("#modal-back");

//employee filter
const searchBar = document.forms["search-form"].querySelector('input');
searchBar.addEventListener('keyup', function(e) {
  const term = e.target.value.toLowerCase();
  const employees = document.getElementsByClassName('card-text');
  Array.from(employees).forEach(function(employee){
    const userName = employee.firstElementChild.textContent;
    if(userName.toLowerCase().indexOf(term)!= -1){
      employee.parentNode.style.display = 'grid';
    } else {
      employee.parentNode.style.display = 'none';
    }
  })
})

//fetch data from API
fetch(urlAPI)
.then(res => res.json())
.then(res => res.results)
.then(displayEmployees)
.catch(err => console.log(err))

function displayEmployees(employeeData) {
  employees = employeeData;

  let employeeHTML = '';

  employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;

    employeeHTML += `
      <div class="card" data-index="${index}">
      <img class="avatar" src="${picture.large}" />
      <div class="card-text">
      <h2 class="name">${name.first} ${name.last}</h2>
      <p class="email">${email}</p>
      <p class="address">${city}</p>
      </div>
      </div>
      `
    });

    gridContainer.innerHTML = employeeHTML;
  }

function displayModal(index) {

  let { name, dob, phone, email, location: { city, street, state, postcode
  }, picture } = employees[index];

  let date = new Date(dob.date);

  const modalHTML = `
    <span>${index}</span>
    <img class="avatar" src="${picture.large}" />
    <div class="text-container">
      <h2 class="name">${name.first} ${name.last}</h2>
      <p class="email">${email}</p>
      <p class="address">${city}</p>
      <hr />
      <p>${phone}</p>
      <p class="address">${street} ${state} ${postcode}</p>
      <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
  `;

  overlay.classList.remove("hidden");
  modalContainer.innerHTML = modalHTML;
}

gridContainer.addEventListener('click', e => {

  if (e.target !== gridContainer) {

    const card = e.target.closest(".card");
    const index = card.getAttribute('data-index');
    console.log(index);
    console.log(employees);
    displayModal(index);
    return index;
  }
});

modalClose.addEventListener('click', () => {
  overlay.classList.add("hidden");
});

modalNext.addEventListener('click', () => {
  let index = document.querySelector('span').innerHTML;
  index++;
  console.log(index);
  if(index >= 12) {
    displayModal(0);
  }
  else if(index <= 12) {
    displayModal(index);
  }
});

modalBack.addEventListener('click', () => {
  let index = document.querySelector('span').innerHTML;
  if(index >= 1) {
    index--;
    console.log(index);
    displayModal(index);
  }
  else {
    console.log(index);
    displayModal(11);
  }
});
