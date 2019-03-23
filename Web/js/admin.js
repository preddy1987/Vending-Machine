function setupAdminPage() {
    const mainNode = document.querySelector('main');
    const childNode = document.createElement('h1');
    childNode.innerText = 'Admin';
    mainNode.insertAdjacentElement('afterbegin', childNode);
}