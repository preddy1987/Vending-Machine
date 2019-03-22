function setupReportPage() {
    const mainNode = document.querySelector('main');
    const childNode = document.createElement('h1');
    childNode.innerText = 'Report';
    mainNode.insertAdjacentElement('afterbegin', childNode);
}