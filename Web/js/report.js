const g_reportProductList = [];

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
            g_reportProductList.push(product);
        });
    })
    .catch((err) => {console.error(err)});

function setupReportPage() {
    const mainNode = document.querySelector('main');
    const childNode = document.createElement('h1');
    childNode.innerText = 'Report';
    mainNode.insertAdjacentElement('afterbegin', childNode);
        
    const reportForm = document.createElement('form');
    reportForm.setAttribute('id', 'reportForm');
    reportForm.addEventListener('change', repopulateReportList);
    mainNode.insertAdjacentElement('beforeend', reportForm);
    
    const reportFormDateLabel = document.createElement('label');
    reportFormDateLabel.innerText = 'Year';
    reportFormDateLabel.setAttribute('for', 'Year');
    reportForm.insertAdjacentElement('beforeend', reportFormDateLabel);

    const reportFormDateInput = document.createElement('select');
    reportFormDateInput.setAttribute('id', 'Year')
    reportFormDateInput.setAttribute('name', 'Year')

    const years = [];
    const currentYear = (new Date()).getFullYear();
    for(let i = 2017; i <= currentYear; i++){
        years.push(i);
    }
    years.forEach(function(year){
        const option = document.createElement('option');
        option.setAttribute('value', year);
        option.innerText = year;
        reportFormDateInput.insertAdjacentElement('beforeend', option);
    });
    reportForm.insertAdjacentElement('beforeend', reportFormDateInput);

    const reportFormUsersLabel = document.createElement('label');
    reportFormUsersLabel.innerText = 'User';
    reportFormUsersLabel.setAttribute('for', 'User');
    reportForm.insertAdjacentElement('beforeend', reportFormUsersLabel);

    const reportFormAllUserOption = document.createElement('option');
    reportFormAllUserOption.setAttribute('value', 'all');
    reportFormAllUserOption.innerText = 'All';

    const reportFormUsersInput = document.createElement('select');
    reportFormUsersInput.setAttribute('id', 'User');
    reportFormUsersInput.setAttribute('name', 'User');
    reportFormUsersInput.insertAdjacentElement('beforeend', reportFormAllUserOption);
    reportForm.insertAdjacentElement('beforeend', reportFormUsersInput);

    fetch(`http://localhost:57005/api/user`)
        .then((response) => {
            return response.json();
        })
        .then((items) => {
            items.forEach((item) => {
                const option = document.createElement('option');
                option.setAttribute('value', item.id);
                option.innerText = (item.firstName + " " + item.lastName);
                reportFormUsersInput.insertAdjacentElement('beforeend', option);
            });
        })
        .catch((err) => {console.error(err)});

    const reportList = document.createElement('ul');
    reportList.setAttribute('id', 'reportList');
    mainNode.insertAdjacentElement('beforeend', reportList);

    const reportFormTotalSales = document.createElement('div');
    reportFormTotalSales.setAttribute('id', 'totalSales');
    mainNode.insertAdjacentElement('beforeend', reportFormTotalSales);
    
    let dummyEvent = {}; //created to avoid any runtime errors when first calling repopulateReportList()
    dummyEvent.preventDefault = () => {
        return null;
    }
    repopulateReportList(dummyEvent);
}

function repopulateReportList(event){
    event.preventDefault();
    let dateSelect = document.getElementById('Year');
    let selectedYear = dateSelect.options[dateSelect.selectedIndex].value;
    
    let userSelect = document.getElementById('User');
    let selectedUser = userSelect.options[userSelect.selectedIndex].value;

    const reportList = document.getElementById('reportList');
    while(reportList.firstChild){
        reportList.firstChild.remove();
    }
    
    if(selectedUser == 'all') {
        generateReportList(`http://localhost:57005/api/transactionitem/foryear/${selectedYear}`);
    }
    else {
        generateReportList(`http://localhost:57005/api/transactionitem/foryearanduser/${selectedYear}/${selectedUser}`);
    }
}

function generateReportList(apiurl){
    const reportList = document.getElementById('reportList');
    let reportRunningTotal = 0;
    const reportProductList = [];

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
                reportProductList.push(product);
            });

            fetch(apiurl)
                .then((response) => {
                    return response.json();
                })
                .then((items) => {
                    items.forEach((item) => {
                        reportProductList.forEach((product) => {
                            if(item.productId == product.id){
                                product.count += 1;
                                reportRunningTotal += item.salePrice;                    
                            }
                        });
                    });

                    reportProductList.forEach((product) => {
                        if(product.count != 0){
                            let listItem = document.createElement('li');
                    
                            let listItemName = document.createElement('div');
                            listItemName.innerText = product.name;
                            listItem.insertAdjacentElement('beforeend', listItemName);
                    
                            let listItemCount = document.createElement('div');
                            listItemCount.innerText = product.count;
                            listItem.insertAdjacentElement('beforeend', listItemCount);
                    
                            reportList.insertAdjacentElement('beforeend', listItem);
                        }
                    });

                    const reportFormTotalSales = document.getElementById("totalSales")

                    reportFormTotalSales.innerText = "Total Sales: $" + reportRunningTotal.toFixed(2);
                })
                .catch((err) => {console.error(err)});
        })
        .catch((err) => {console.error(err)});
}