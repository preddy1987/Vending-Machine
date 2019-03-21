window.buttonNames = [
    {name: "About"},
    {name: "Admin"},
    {name: "Log"},
    {name: "Report"},
    {name: "Site"},
    {name: "User"},
    {name: "Vending"}
]

function setPageTitle(title) {
    const header = document.querySelector('head title');
    header.innerText = title;
}

/**
 * Removes all the existing css files except for site.css and adds the ones passed into this function to the index.html
 * @param {array strings} fileNames 
 */
function setCssFiles(fileNames) {

}

/**
 * Removes all the existing javascript files except for site.js and adds the ones passed into this function to the index.html
 * @param {array strings} fileNames 
 */
function setJsFiles(fileNames) {

}

setPageTitle("Vndr");
