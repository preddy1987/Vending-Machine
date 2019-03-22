function setPageTitle(title) {
    const header = document.querySelector('head title');
    header.innerText = title;
}

function createVendingPage() {
    clearMainNode();
    setupVendingPage();
    //update nav bar
}

function createLogPage() {
    clearMainNode();
    setupLogPage();
    //update nav bar
}

function createReportPage() {
    clearMainNode();
    setupReportPage();
    //update nav bar
}

function createLoginPage() {
    clearMainNode();
    setupLoginPage();
    //update nav bar
}

function createRegistrationPage() {
    clearMainNode();
    setupRegistrationPage();
    //update nav bar
}

function createAdminPage() {
    clearMainNode();
    setupAdminPage();
    //update nav bar
}

function createAboutPage() {
    clearMainNode();
    setupAboutPage();
    //update nav bar
}

function clearMainNode() {
    const headerNode = document.querySelector('header');
    let mainNode = document.querySelector('main');
    const bodyNode = document.querySelector('body');
    bodyNode.removeChild(mainNode);
    mainNode = document.createElement('main');
    headerNode.insertAdjacentElement('afterend', mainNode);
}

function registerNavBarEvents() {
    document.getElementById('navVending').addEventListener('click', createVendingPage);
    document.getElementById('navLog').addEventListener('click', createLogPage);
    document.getElementById('navReport').addEventListener('click', createReportPage);
    document.getElementById('navLogin').addEventListener('click', createLoginPage);
    document.getElementById('navRegister').addEventListener('click', createRegistrationPage);
    document.getElementById('navAdmin').addEventListener('click', createAdminPage);
    document.getElementById('navAbout').addEventListener('click', createAboutPage);
}

setPageTitle("Vndr II");
registerNavBarEvents();
createVendingPage();
