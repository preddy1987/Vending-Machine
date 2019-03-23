function setupLogPage() {
    const mainNode = document.querySelector('main');
    const childNode = document.createElement('h1');
    childNode.innerText = 'Log';
    mainNode.insertAdjacentElement('afterbegin', childNode);
}