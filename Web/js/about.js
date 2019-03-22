function setupAboutPage() {
    const mainNode = document.querySelector('main');
    const childNode = document.createElement('h1');
    childNode.innerText = 'About';
    mainNode.insertAdjacentElement('afterbegin', childNode);
}