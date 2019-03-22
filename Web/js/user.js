function setupLoginPage() {
    const mainNode = document.querySelector('main');
    const childNode = document.createElement('h1');
    childNode.innerText = 'Login';
    mainNode.insertAdjacentElement('afterbegin', childNode);
}

function setupRegistrationPage() {
    const mainNode = document.querySelector('main');
    const childNode = document.createElement('h1');
    childNode.innerText = 'Registration';
    mainNode.insertAdjacentElement('afterbegin', childNode);
}