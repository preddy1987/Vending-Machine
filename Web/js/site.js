function setPageTitle(title) {
    const header = document.querySelector('head title');
    header.innerText = title;
}

function createVendingPage() {
    clearMainNode();
    setupVendingPage();
    setNavSelection('navVending');
}

function createLogPage() {
    clearMainNode();
    setupLogPage();
    setNavSelection('navLog');
}

function createReportPage() {
    clearMainNode();
    setupReportPage();
    setNavSelection('navReport');
}

function createLoginPage() {
    clearMainNode();
    setupLoginPage();
    setNavSelection('navLogin');
}

function createRegistrationPage() {
    clearMainNode();
    setupRegistrationPage();
    setNavSelection('navRegister');
}

function createAdminPage() {
    clearMainNode();
    setupAdminPage();
    setNavSelection('navAdmin');
}

function createAboutPage() {
    clearMainNode();
    setupAboutPage();
    setNavSelection('navAbout');
}

function setNavSelection(navLinkId) {
    //<span class="sr-only">(current)</span> 
    //div[class*="test"]
    const newNode = document.getElementById(navLinkId).parentNode;
    const activeNode = document.querySelector('header nav li[class*="active"]');
    activeNode.classList.remove("active");
    newNode.classList.add("active");
    // spanNode = spanNode.parentNode.removeChild(spanNode);
    // currentNode.insertAdjacentElement('beforeend', spanNode);
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
