const pageTitle = "Vending Machine";
const buttonNames = [
    {name: "About"},
    {name: "Admin"},
    {name: "Log"},
    {name: "Report"},
    {name: "Site"},
    {name: "User"},
    {name: "Vending"}
]

function setPageTitle() {
    const header = document.querySelector('header');
    const title = document.createElement('h1');
    title.innerText = pageTitle;
    header.insertAdjacentElement('beforeend', title);
  }

  setPageTitle();
