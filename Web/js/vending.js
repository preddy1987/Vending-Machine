


function buildCategoryForm()
{
    const main = document.querySelector('main');
    let divCategoryContainer = document.createElement('div');
    main.insertAdjacentElement("beforeend", divCategoryContainer);
    const CategoryForm =  document.createElement('FORM');
    CategoryForm.method = "POST";
    CategoryForm.action = "api/category/Post";
    divCategoryContainer.insertAdjacentElement("beforeend", CategoryForm);

    // let labelBox = document.createElement("label");
    // labelBox.name = "Id";
    // labelBox.for = "Id";
    // labelBox.innerText = "Enter Id: ";
    // CategoryForm.insertAdjacentElement("beforeend", labelBox);

    // let inputBox = document.createElement("input");
    // inputBox.type = "text";
    // inputBox.name = "Id";
    // inputBox.placeholder = "Enter Id";
    // CategoryForm.insertAdjacentElement("beforeend", inputBox);
    divCategoryContainer = document.createElement('div');
    CategoryForm.insertAdjacentElement("beforeend", divCategoryContainer);

    labelBox = document.createElement("label");
    labelBox.name = "Name";
    labelBox.for = "Name";
    labelBox.innerText = "Enter Name: ";
    divCategoryContainer.insertAdjacentElement("beforeend", labelBox);

    inputBox = document.createElement("input");
    inputBox.type = "text";
    inputBox.name = "Name";
    inputBox.placeholder = "Enter Name";
    divCategoryContainer.insertAdjacentElement("beforeend", inputBox);

    divCategoryContainer = document.createElement('div');
    CategoryForm.insertAdjacentElement("beforeend", divCategoryContainer);

    labelBox = document.createElement("label");
    labelBox.name = "Noise";
    labelBox.for = "Noise";
    labelBox.innerText = "Enter Noise: ";
    divCategoryContainer.insertAdjacentElement("beforeend", labelBox);

    inputBox = document.createElement("input");
    inputBox.type = "text";
    inputBox.name = "Noise";
    inputBox.placeholder = "Enter Noise";
    divCategoryContainer.insertAdjacentElement("beforeend", inputBox);

    divCategoryContainer = document.createElement('div');
    CategoryForm.insertAdjacentElement("beforeend", divCategoryContainer);

    let inputButton = document.createElement("button");
    inputButton.type = "submit";
    inputButton.value = "Post Category";
    inputButton.innerText = "Post Category";
    divCategoryContainer.insertAdjacentElement("beforeend", inputButton);


} 



document.addEventListener("DOMContentLoaded", (event) => {

    buildCategoryForm();
    //name
    //noise


});