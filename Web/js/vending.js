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
      if(data.product.price <= Window.Balance)
      {
            Window.Balance -= data.product.price;
            let vendingBalance = document.getElementById("balance");
            vendingBalance.innerText = `$ ${CurrencyFormatted(Window.Balance)} `;
            ShowStatusMessage("Vend Successful", "btn-success");
            UpdateQuantity(data);
        }
        else
        {
            // let statusMessage = document.getElementById("statusMessage");
            // statusMessage.innerText = "Insufficient Funds.";
            // statusMessage.classList.remove("d-none");
            ShowStatusMessage("Insufficient Funds", "btn-danger");
        }

    })
    .catch((err) => console.error(err));
}

function UpdateQuantity(data) {
    console.log("Updating Inventory...");
    
    const key = data.inventory.id;
    const uri = "http://localhost:57005/api/Inventory/" + key;
    fetch(uri, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({
            Column: data.inventory.column,
            ProductId: data.product.id ,
            Qty: --data.inventory.qty,
            Row: data.inventory.row

        })
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
          inventory = [];
        createVendingPage();
      })
      .catch((err) => console.error(err));

}

function CalculateChange(bal) {
    let change = {};
    let balance = bal * 100;
    change.quarters = Math.floor(balance / 25);
    balance -= change.quarters * 25;
    change.dimes = Math.floor(balance / 10);
    balance -= change.dimes * 10;
    change.nickles = Math.floor(balance / 5);
    balance -= change.nickles * 5;
    
    return change;
}

function ShowStatusMessage(msg, status) {
    let statusMessage = document.getElementById("statusMessage");
    statusMessage.innerText = msg;
    statusMessage.classList.remove("d-none");
    // statusMessage.classList.add("label");
    statusMessage.classList.add(status);
}

function HideStatusMessage() {
    let statusMessage = document.getElementById("statusMessage");
    statusMessage.classList.add("d-none");
    statusMessage.classList.remove("btn-success");
    statusMessage.classList.remove("btn-danger");
    statusMessage.classList.remove("btn-warning");

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
    // alert("You tried to buy this item.");
    GetVendingItem(key);
}

function AddOne() {
    Window.Balance += 1;
    UpdateBalance();
}

function AddFive() {
    Window.Balance += 5;
    UpdateBalance();
}

function AddTen() {
    Window.Balance += 10;
    UpdateBalance();
}

function UpdateBalance() {
    let vendingBalance = document.getElementById("balance");
    vendingBalance.innerText = `$ ${CurrencyFormatted(Window.Balance)} `;
    HideStatusMessage();

}

function CashOut() {
    if (Window.Balance == 0)
    {
        ShowStatusMessage("There is no balance in the machine.", "btn-warning")
    }
    else
    {
        let holdBalance = Window.Balance;   //We need to store this for our message as we're about to wipe it.
        Window.Balance = 0;
        UpdateBalance();
        change = CalculateChange(holdBalance);
        let msg = `Take your change ($ ${CurrencyFormatted(holdBalance)} ).\nquarters: ${change.quarters}\ndimes: ${change.dimes}\nnickles: ${change.nickles}`;
        ShowStatusMessage(msg, "btn-success");
    }
}

function SoldOut() {
    ShowStatusMessage("This item is sold out.  Please pick another item.", "btn-danger");
        
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

    //Build the Aside.
    const aside  = document.createElement('aside');
    aside.classList.add('asideContainer');
    main.insertAdjacentElement("beforeend", aside);

    //Build the Aside pieces.
    const asideMainDiv  = document.createElement('div');
    asideMainDiv.classList.add('asideMainDiv');
    aside.insertAdjacentElement("beforeend", asideMainDiv);

        let statusMessage  = document.createElement('div');
        statusMessage.classList.add('d-none');
        statusMessage.id = "statusMessage";
        asideMainDiv.insertAdjacentElement("beforeend", statusMessage);

        let asideSubDiv1  = document.createElement('div');
        asideSubDiv1.classList.add('asideSubDivMoney');
        asideSubDiv1.innerText = `$ ${CurrencyFormatted(Window.Balance)} `;
        asideSubDiv1.id = "balance";
        asideMainDiv.insertAdjacentElement("beforeend", asideSubDiv1);

        let asideSubDiv2  = document.createElement('div');
        asideSubDiv2.classList.add('asideSubDivButtons');
        asideMainDiv.insertAdjacentElement("beforeend", asideSubDiv2);
            
            let moneyButton1  = document.createElement('button');
            moneyButton1.classList.add('btn');
            moneyButton1.classList.add('btn-success');
            moneyButton1.innerText = "$1";
            moneyButton1.addEventListener("click", AddOne);
            asideSubDiv2.insertAdjacentElement("beforeend", moneyButton1);

            let moneyButton2  = document.createElement('button');
            moneyButton2.classList.add('btn');
            moneyButton2.classList.add('btn-success');
            moneyButton2.innerText = "$5";
            moneyButton2.addEventListener("click", AddFive);
            asideSubDiv2.insertAdjacentElement("beforeend", moneyButton2);

            let moneyButton3  = document.createElement('button');
            moneyButton3.classList.add('btn');
            moneyButton3.classList.add('btn-success');
            moneyButton3.innerText = "$10";
            moneyButton3.addEventListener("click", AddTen);
            asideSubDiv2.insertAdjacentElement("beforeend", moneyButton3);

        let asideSubDiv3  = document.createElement('div');
        asideSubDiv3.classList.add('asideSubDivChange');
        asideMainDiv.insertAdjacentElement("beforeend", asideSubDiv3);

        let changeButton  = document.createElement('button');
        changeButton.classList.add('btn');
        changeButton.classList.add('btn-info');
        changeButton.classList.add('btn-lg');
        changeButton.classList.add('btn-block');
        changeButton.innerText = "Get Change";
        changeButton.addEventListener("click", CashOut);
        asideSubDiv3.insertAdjacentElement("beforeend", changeButton);

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
        if(listItem.Quantity > 0) {
            vendItemContainer.addEventListener("click", BuyThis);
            vendItemContainer.setAttribute("data", listItem.Key);
            vendItemContainer.classList.add('btn-primary');
        }    
        else
        {
            //Don't add normal click event.
            vendItemContainer.classList.add('btn-danger');
            vendItemContainer.addEventListener("click", SoldOut);
        }
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
        if(listItem.Quantity > 0) {
            priceDiv.innerText = `$ ${CurrencyFormatted(listItem.Price)} `;
        }
        else{
            priceDiv.innerText = "SOLD OUT";
        }
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

function setupVendingPage() {
    if (Window.Balance == null)
        {
            Window.Balance = 0;
        }
    loadInventory();
 
}

