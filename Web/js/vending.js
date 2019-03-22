inventory = [];

function loadInventory()
{
    console.log("Load Inventory List...");
  
    fetch('http://localhost:57005/api/vendingItem') 
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        displayInventoryList(data);
      })
      .catch((err) => console.error(err));

}

function GetVendingItem(key)
{
    const uri = "http://localhost:57005/api/vendingItem/" + key;
    fetch(uri) 
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //Check to see if there are any left.
      if(data[0].product.price > 0)
      {

      }

    })
    .catch((err) => console.error(err));


}

function BuildInventory(data) {
    for(let i=0; i<data.length; i++)
    {
        let InventoryItem = {};
        InventoryItem.Name = data[i].product.name;
        InventoryItem.Quantity = data[i].inventory.qty;
        InventoryItem.Key = data[i].inventory.key;
        InventoryItem.Row = data[i].inventory.row;
        InventoryItem.Column = data[i].inventory.column;
        InventoryItem.Price = data[i].product.price;
        InventoryItem.CategoryName = data[i].category.name;
        InventoryItem.Image = data[i].product.image;
        InventoryItem.Noise = data[i].category.noise;

        inventory.push(InventoryItem);
    }
}

function BuyThis (event)
{
    const myTarget = event.currentTarget;
    const key = myTarget.getAttribute("data");
    alert("You tried to buy this item.");
    GetVendingItem(key);
   
}

function displayInventoryList(data) {
    console.log("Display Shopping List...");

    //ClearInventoryList();

    BuildInventory(data);

    //Build the main container.
    const main = document.querySelector('main');
    let divVendingContainer = document.createElement('div');
    divVendingContainer.classList.add('vendingContainer');
    main.insertAdjacentElement("beforeend", divVendingContainer);

    //Build the first row.
    let currentRow = 0;
    // let rowContainer = document.createElement('div');
    // rowContainer.classList.add('rowContainer');
    // divVendingContainer.insertAdjacentElement("beforeend", rowContainer);

    inventory.forEach((listItem) => {
        if(listItem.Row != currentRow)
            {
                //Build a new row container.
                rowContainer = document.createElement('div');
                rowContainer.classList.add('rowContainer');
                divVendingContainer.insertAdjacentElement("beforeend", rowContainer);
            
                currentRow++;
            }
        //Add a new container to hold the vending item.    
        let vendItemContainer = document.createElement('div');
        vendItemContainer.classList.add('vendItemContainer');
        vendItemContainer.addEventListener("click", BuyThis);
        vendItemContainer.setAttribute("data", listItem.Key);
        rowContainer.insertAdjacentElement("beforeend", vendItemContainer);
           
        //Add three containers for the image, name, and price.
        let imageDiv = document.createElement('div');
        imageDiv.classList.add('imageDiv');
        vendItemContainer.insertAdjacentElement("beforeend", imageDiv);
        let imageImg = document.createElement('img');
        imageImg.setAttribute("src",listItem.Image);
        imageImg.classList.add('imageImg');
        imageDiv.insertAdjacentElement("beforeend", imageImg);
      


        let nameDiv = document.createElement('div');
        nameDiv.classList.add('nameDiv');
        nameDiv.innerText = listItem.Name;
        vendItemContainer.insertAdjacentElement("beforeend", nameDiv);
      
        let priceDiv = document.createElement('div');
        priceDiv.classList.add('priceDiv');
        priceDiv.innerText = `$ ${CurrencyFormatted(listItem.Price)} `;
        vendItemContainer.insertAdjacentElement("beforeend", priceDiv);
      


        // let liItem = document.createElement('li');
        // liItem.innerText = `${listItem.Name} ${listItem.Key} ${listItem.Quantity} ${listItem.Row} ${listItem.Column} ${listItem.Price} ${listItem.CategoryName} ${listItem.Image} ${listItem.Noise}  `;
        
        // divCategoryContainer.appendChild(liItem);
      });
}

function ClearInventoryList() {
    const childs = document.querySelectorAll("main");
    // const childs = Array.from(container.children);
    childs.forEach( (element) => {
      // if(element.tagName != 'TEMPLATE')  
      //    container.removeChild(element);
        element.parentNode.removeChild(element);
    });
    
  }

  function CurrencyFormatted(amount) {
	var i = parseFloat(amount);
	if(isNaN(i)) { i = 0.00; }
	var minus = '';
	if(i < 0) { minus = '-'; }
	i = Math.abs(i);
	i = parseInt((i + .005) * 100);
	i = i / 100;
	s = new String(i);
	if(s.indexOf('.') < 0) { s += '.00'; }
	if(s.indexOf('.') == (s.length - 2)) { s += '0'; }
	s = minus + s;
	return s;
}
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



function SetupVendingPage() {
    loadInventory();
 
}

