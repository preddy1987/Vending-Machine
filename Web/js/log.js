let g_logData = [];
let g_logUserData = [];
let g_logProductData = [];
let g_logOperationData = [];

function getLogData() {
    fetch('http://localhost:57005/api/log/getall') 
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        g_logData = data;
        displayLogData(g_logData);
      })
      .catch((err) => console.error(err));
}

function displayLogData(logData) {
  logDivNode = document.querySelector('.container');
  logData.forEach ( (entry) => {
    const rowNode = document.createElement('div');
    rowNode.classList.add('log-row');
    let logHTML = logRowTemplateString(entry.timeStampStr,entry.operationType, "$"+`${entry.price.toFixed(2)}`);
    rowNode.innerHTML = logHTML;
    logDivNode.insertAdjacentElement('beforeend',rowNode);
 });
}

function getAllUsers() {
fetch('http://localhost:57005/api/user') 
.then((response) => {
  return response.json();
})
.then((data) => {
  g_logUserData = data;
  populateUserDropdown(g_logUserData);
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
    g_logProductData = data;
    populateProductsDropdown(g_logProductData);
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
    g_logOperationData = data;
    populateOperationTypeDropdown(g_logOperationData);
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

function logRowTemplateString(dateString,opString,amtString){
  rowTemplateHTML =  `<div class="col-sm-1"></div>\n<div class="col-3">${dateString}</div>\n`;
  rowTemplateHTML +=  `<div class="col-4">${opString}</div>\n<div class="col-2">${amtString}</div>`;
  rowTemplateHTML +=  '<div class="col-sm-1"></div>\n';
  rowTemplateHTML +=  '</div>';
  return rowTemplateHTML;
}

function buildHTML () {
  const mainNode = document.querySelector('main');
  let templateHTML= '<div class="container" id="logBox">\n';
  templateHTML +=       '<div class="logHeading">\n<div class="logTitle">History</div>\n';
  templateHTML +=       '<div class="logDropDowns">\n<select id="operations">\n<option value="all">All Operation Types</option>\n</select>\n</div>\n';
  templateHTML +=       '<div class="logDropDowns">\n<select id="users">\n<option value="all">All Users</option>\n</select>\n</div>';
  templateHTML +=       '<div class="logDropDowns">\n<select id="products">\n<option value="all">All Products</option>\n</select>\n</div>';
  templateHTML +=  '</div>';
  templateHTML +=  '<div class="log-row log-headerRow">\n'
  templateHTML +=  logRowTemplateString('Date','Action','Amt');
  templateHTML += '\n</div>'
  mainNode.innerHTML = templateHTML;
  rowNode = mainNode.querySelector('.col-3');
  rowNode.classList.add('content');
  rowNode = mainNode.querySelector('.col-4');
  rowNode.classList.add('transaction');
  rowNode.classList.add('content');
  rowNode = mainNode.querySelector('.col-2');
  rowNode.classList.add('amount');
  rowNode.classList.add('content');
  //templateHTML +=  '';

}

function setupLogPage() {
    buildHTML();
    getAllUsers();
    getAllProducts();
    getAllOperationTypes();
    getLogData();
}
/*


function setupLogPage() {
    const mainNode = document.querySelector('main');
    const childNode = document.createElement('h1');
    childNode.innerText = 'Log';
    mainNode.insertAdjacentElement('afterbegin', childNode);
}
*/
