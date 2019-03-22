function setupVendingPage() {
    const mainNode = document.querySelector('main');
    const childNode = document.createElement('h1');
    childNode.innerText = 'Vending';
    mainNode.insertAdjacentElement('afterbegin', childNode);
}