const main = document.querySelector('main');
const years = [];
let currentYear = (new Date()).getFullYear();

for(let i = 2015; i <= currentYear; i++){
    years.push(i);
}

function createInputFields(){
    while(main.firstChild){
        main.firstChild.remove();
    }
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
    const list = document.createElement('ul');
    main.insertAdjacentElement('beforeend', list);
}

function repopulateList(event){
    event.preventDefault();
    let dateSelect = document.getElementById('Year');
    let selectedYear = dateSelect.options[dateSelect.selectedIndex].value;

    const list = document.querySelector("ul");
    while(list.firstChild){
        list.firstChild.remove();
    }
    
    fetch(`http://localhost:57005/api/transactionitem/foryear/${selectedYear}`)
    .then((response) => {
        return response.json();
    })
    .then((items) => {
            items.forEach((item) => {
                let itemString = "Transaction ID: " + item.vendingTransactionId + " Product ID: " + item.productId +
                                " salePrice: " + item.salePrice + " ID: " + item.id; 
                let listItem = document.createElement('li');
                listItem.innerText = itemString;
                list.insertAdjacentElement('beforeend', listItem);
            });
    })
    .catch((err) => {console.error(err)});
}
createInputFields();