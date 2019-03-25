function setupReportPage() {
    const mainNode = document.querySelector('main');
    const reportContainer = document.createElement('div');
    reportContainer.setAttribute('id', 'report-box');
    mainNode.insertAdjacentElement('afterbegin', reportContainer);

    const reportTitle = document.createElement('h4');
    reportTitle.setAttribute('id', 'report-title');
    reportTitle.innerText = 'Report';
    reportContainer.insertAdjacentElement('afterbegin', reportTitle);
        
    const reportForm = document.createElement('form');
    reportForm.setAttribute('id', 'report-form');
    reportForm.addEventListener('change', repopulateReportList);
    reportContainer.insertAdjacentElement('beforeend', reportForm);

    const reportDateDiv = document.createElement('div');
    reportForm.insertAdjacentElement('beforeend', reportDateDiv);
    
    const reportFormDateLabel = document.createElement('label');
    reportFormDateLabel.innerText = 'Year';
    reportFormDateLabel.setAttribute('for', 'Year');
    reportDateDiv.insertAdjacentElement('beforeend', reportFormDateLabel);

    const reportFormDateInput = document.createElement('select');
    reportFormDateInput.setAttribute('id', 'Year')
    reportFormDateInput.setAttribute('name', 'Year')

    const years = [];
    const currentYear = (new Date()).getFullYear();
    for(let i = currentYear; i >= 2015; i--){
        years.push(i);
    }
    years.forEach(function(year){
        const option = document.createElement('option');
        option.setAttribute('value', year);
        option.innerText = year;
        reportFormDateInput.insertAdjacentElement('beforeend', option);
    });
    reportDateDiv.insertAdjacentElement('beforeend', reportFormDateInput);

    const reportUserDiv = document.createElement('div');
    reportForm.insertAdjacentElement('beforeend', reportUserDiv);

    const reportFormUsersLabel = document.createElement('label');
    reportFormUsersLabel.innerText = 'User';
    reportFormUsersLabel.setAttribute('for', 'User');
    reportUserDiv.insertAdjacentElement('beforeend', reportFormUsersLabel);

    const reportFormAllUserOption = document.createElement('option');
    reportFormAllUserOption.setAttribute('value', 'all');
    reportFormAllUserOption.innerText = 'All';

    const reportFormUsersInput = document.createElement('select');
    reportFormUsersInput.setAttribute('id', 'User');
    reportFormUsersInput.setAttribute('name', 'User');
    reportFormUsersInput.insertAdjacentElement('beforeend', reportFormAllUserOption);
    reportUserDiv.insertAdjacentElement('beforeend', reportFormUsersInput);

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
    reportList.setAttribute('id', 'report-list');
    reportContainer.insertAdjacentElement('beforeend', reportList);

    const reportFormTotalSales = document.createElement('div');
    reportFormTotalSales.setAttribute('id', 'total-sales');
    reportContainer.insertAdjacentElement('beforeend', reportFormTotalSales);
    
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

    const reportList = document.getElementById('report-list');
    while(reportList.firstChild){
        reportList.firstChild.remove();
    }

    const reportColumnHeaders = document.createElement('li');
    reportColumnHeaders.setAttribute('style', 'font-weight: bold;');
    const snackNameHeader = document.createElement('div');
    snackNameHeader.setAttribute('class', 'report-item-name');
    snackNameHeader.innerText = 'Snack Name';
    reportColumnHeaders.insertAdjacentElement('beforeend', snackNameHeader);
    const snackAmountHeader = document.createElement('div');
    snackAmountHeader.setAttribute('class', 'report-item-amount');
    snackAmountHeader.innerText = 'Amount Sold';
    reportColumnHeaders.insertAdjacentElement('beforeend', snackAmountHeader);
    reportList.insertAdjacentElement('beforeend', reportColumnHeaders);

    if(selectedUser == 'all') {
        generateReportList(`http://localhost:57005/api/transactionitem/foryear/${selectedYear}`);
    }
    else {
        generateReportList(`http://localhost:57005/api/transactionitem/foryearanduser/${selectedYear}/${selectedUser}`);
    }
}

function generateReportList(apiurl){
    const reportList = document.getElementById('report-list');
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

                    let rowCount = 0;

                    reportProductList.forEach((product) => {
                        if(product.count != 0){
                            let listItem = document.createElement('li');

                            if ((rowCount % 2) == 0) {
                                listItem.setAttribute('class', 'grey-background');
                            }

                            rowCount++;
                    
                            let listItemName = document.createElement('div');
                            listItemName.setAttribute('class', 'report-item-name');
                            listItemName.innerText = product.name;
                            listItem.insertAdjacentElement('beforeend', listItemName);
                    
                            let listItemCount = document.createElement('div');
                            listItemCount.setAttribute('class', 'report-item-amount');
                            listItemCount.innerText = product.count;
                            listItem.insertAdjacentElement('beforeend', listItemCount);
                    
                            reportList.insertAdjacentElement('beforeend', listItem);
                        }
                    });

                    const reportFormTotalSales = document.getElementById("total-sales");
                    const reportFormTotalSalesHead = document.createElement('span');
                    reportFormTotalSalesHead.innerText = "Total Sales:";
                    reportFormTotalSales.insertAdjacentElement('beforeend', reportFormTotalSalesHead);
                    reportFormTotalSales.insertAdjacentText('beforeend', ` $${reportRunningTotal.toFixed(2)}`);
                })
                .catch((err) => {console.error(err)});
        })
        .catch((err) => {console.error(err)});
}