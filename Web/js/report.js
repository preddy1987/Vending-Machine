function setupReportPage() {
    const mainNode = document.querySelector('main');
    const childNode = document.createElement('h1');
    childNode.innerText = 'Report';
    mainNode.insertAdjacentElement('afterbegin', childNode);
}

const head = document.querySelector('head');
const reportCSS = document.createElement('link');
reportCSS.setAttribute('href', "css/report.css");
reportCSS.setAttribute('rel', "stylesheet");
head.insertAdjacentElement('beforeend', reportCSS);

const allUserOption = document.createElement('option');
allUserOption.setAttribute('value', 'all');
allUserOption.innerText = 'All';

const usersInput = document.createElement('select');
usersInput.setAttribute('id', 'User');
usersInput.setAttribute('name', 'User');
usersInput.insertAdjacentElement('beforeend', allUserOption);

const totalSales = document.createElement('div');
totalSales.setAttribute('id', 'totalSales');

const main = document.querySelector('main');
const years = [];
const currentYear = (new Date()).getFullYear();

for(let i = 2017; i <= currentYear; i++){
    years.push(i);
}

const productList = [];

fetch(`http://localhost:57005/api/product`)
    .then((response) => {
        return response.json();
    })
    .then((items) => {
        items.forEach((item) => {
            let product = {};
            product.id = item.id;
            product.name = item.name;
            product.count = 0;
            productList.push(product);
        });
    })
    .catch((err) => {console.error(err)});

fetch(`http://localhost:57005/api/user`)
    .then((response) => {
        return response.json();
    })
    .then((items) => {
        items.forEach((item) => {
            const option = document.createElement('option');
            option.setAttribute('value', item.id);
            option.innerText = (item.firstName + " " + item.lastName);
            usersInput.insertAdjacentElement('beforeend', option);
        });
    })
    .catch((err) => {console.error(err)});

function createReportPage(){
    const titleTag = document.createElement('h2');
    titleTag.innerText = 'Reports';
    main.insertAdjacentElement('afterbegin', titleTag);
    
    const reportForm = document.createElement('form');
    reportForm.addEventListener('change', repopulateList);
    main.insertAdjacentElement('beforeend', reportForm);

    const dateLabel = document.createElement('label');
    dateLabel.innerText = 'Year';
    dateLabel.setAttribute('for', 'Year');
    reportForm.insertAdjacentElement('beforeend', dateLabel);

    const dateInput = document.createElement('select');
    dateInput.setAttribute('id', 'Year')
    dateInput.setAttribute('name', 'Year')
    years.forEach(function(year){
        const option = document.createElement('option');
        option.setAttribute('value', year);
        option.innerText = year;
        dateInput.insertAdjacentElement('beforeend', option);
    });
    reportForm.insertAdjacentElement('beforeend', dateInput);

    const usersLabel = document.createElement('label');
    usersLabel.innerText = 'User';
    usersLabel.setAttribute('for', 'User');
    reportForm.insertAdjacentElement('beforeend', usersLabel);
    
    reportForm.insertAdjacentElement('beforeend', usersInput);

    const list = document.createElement('ul');
    main.insertAdjacentElement('beforeend', list);

    main.insertAdjacentElement('beforeend', totalSales);
}

function repopulateList(event){
    event.preventDefault();
    let dateSelect = document.getElementById('Year');
    let selectedYear = dateSelect.options[dateSelect.selectedIndex].value;
    
    let userSelect = document.getElementById('User');
    let selectedUser = userSelect.options[userSelect.selectedIndex].value;

    const list = document.querySelector("ul");
    while(list.firstChild){
        list.firstChild.remove();
    }

    productList.forEach((product) => {
        product.count = 0;
    });
    
    if(selectedUser == 'all') {
        generateList(`http://localhost:57005/api/transactionitem/foryear/${selectedYear}`);
    }
    else {
        generateList(`http://localhost:57005/api/transactionitem/foryearanduser/${selectedYear}/${selectedUser}`);
    }
}

function generateList(apiurl){
    const list = document.querySelector("ul");
    let runningTotal = 0;

    fetch(apiurl)
    .then((response) => {
        return response.json();
    })
    .then((items) => {
        items.forEach((item) => {
            productList.forEach((product) => {
                if(item.productId == product.id){
                    product.count += 1;
                    runningTotal += item.salePrice;                    
                }
            });
        });

        productList.forEach((product) => {
            if(product.count != 0){
                let listItem = document.createElement('li');
        
                let listItemName = document.createElement('div');
                listItemName.innerText = product.name;
                listItem.insertAdjacentElement('beforeend', listItemName);
        
                let listItemCount = document.createElement('div');
                listItemCount.innerText = product.count;
                listItem.insertAdjacentElement('beforeend', listItemCount);
        
                list.insertAdjacentElement('beforeend', listItem);
            }
        });

        totalSales.innerText = "Total Sales: $" + runningTotal.toFixed(2);
    })
    .catch((err) => {console.error(err)});
}

createReportPage();