function doDataLoad() {
    fetch('http://localhost:57005/api/log/getall') 
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let logData = data;
        /*displayGroceries(groceries);*/
      })
      .catch((err) => console.error(err));
}

/*function buildHTML() {
    const mainNode = document.querySelector('main');
    loggingNode = document.createElement('div');
    loggingNode.classList.add("row");
    loggingNode.classList.add("headerRow");
    mainNode.insertAdjacentElement('beforeend',loggingNode);
    childNode = document.createElement('div');
    childNode.classList.add("col-sm-1");
    loggingNode.insertAdjacentElement('beforeend',childNode);
    childNode = document.createElement('div');
    childNode.classList.add("col-3");
    childNode.classList.add("content");
    childNode.innerText = "Date";
    loggingNode.insertAdjacentElement('beforeend',childNode);
    childNode = document.createElement('div');
    childNode.classList.add("col-4");
    childNode.classList.add("transaction");
    childNode.classList.add("content");
    childNode.innerText = "Action";
    loggingNode.insertAdjacentElement('beforeend',childNode);
    childNode = document.createElement('div');
    childNode.classList.add("col-2");
    childNode.classList.add("amount");
    childNode.classList.add("content");
    childNode.innerText = "Amt";
    loggingNode.insertAdjacentElement('beforeend',childNode);
    childNode = document.createElement('div');
    childNode.classList.add("col-sm-1");
    loggingNode.insertAdjacentElement('beforeend',childNode);
}*/
function getAllUsers() {
fetch('http://localhost:57005/api/user') 
.then((response) => {
  return response.json();
})
.then((data) => {
  let userData = data;
  populateUserDropdown(userData);
})
.catch((err) => console.error(err));
}

function populateUserDropdown(userData) {
  const boxNode = document.getElementById('users');

  userData.forEach ( (user) => {
    const optionNode = document.createElement('option');
    optionNode.setAttribute('value',user.id);
    optionNode.innerText=user.firstName + ' ' + user.lastName;;
    boxNode.insertAdjacentElement('beforeend',optionNode);
  });
}

function getAllProducts() {
  fetch('http://localhost:57005/api/product') 
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let productData = data;
    populateProductsDropdown(productData);
  })
  .catch((err) => console.error(err));
}

function populateProductsDropdown(productData) {
  const boxNode = document.getElementById('products');
  productData.forEach ( (product) => {
    const optionNode = document.createElement('option');
    optionNode.setAttribute('value',product.id);
    optionNode.innerText=product.name;
    boxNode.insertAdjacentElement('beforeend',optionNode);
  });
}

function getAllOperationTypes() {
  fetch('http://localhost:57005/api/operationtype') 
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let opData = data;
    populateOperationTypeDropdown(opData);
  })
  .catch((err) => console.error(err));
  }

function populateOperationTypeDropdown(opData) {
  const boxNode = document.getElementById('operations');
  opData.forEach ( (operation) => {
    const optionNode = document.createElement('option');
    optionNode.setAttribute('value',operation.id);
    optionNode.innerText=operation.name;
    boxNode.insertAdjacentElement('beforeend',optionNode);
  });
}

function buildHTML () {
  const mainNode = document.querySelector('main');
  let templateHTML= '<div class="container" id="logBox">\n';
  templateHTML +=       '<div class="logHeading">\n<div class="logTitle">History</div>\n';
  templateHTML +=       '<div class="logDropDowns">\n<select id="operations">\n<option value="all">All Operation Types</option>\n</select>\n</div>\n';
  templateHTML +=       '<div class="logDropDowns">\n<select id="users">\n<option value="all">All Users</option>\n</select>\n</div>';
  templateHTML +=       '<div class="logDropDowns">\n<select id="products">\n<option value="all">All Products</option>\n</select>\n</div>';
  templateHTML +=  '</div>';
  templateHTML +=  '<div class="row headerRow">\n<div class="col-sm-1"></div>\n<div class="col-3 content">\n\tDate\n</div>';
  templateHTML +=  '<div class="col-4 transaction content">\n\tAction\n</div>\n<div class="col-2 amount content">\n\tAmt\n</div>';
  templateHTML +=  '<div class="col-sm-1"></div>\n';
  templateHTML +=  '</div>\n</div>';
  mainNode.innerHTML = templateHTML;
  //templateHTML +=  '';
}

/* function setupLogPage() {
    buildHTML();
    getAllUsers();
    getAllProducts();
    getAllOperationTypes();
    doDataLoad();
}
*/

document.addEventListener("DOMContentLoaded", () => {
    buildHTML();
    getAllUsers();
    getAllProducts();
    getAllOperationTypes();
    doDataLoad();
    });