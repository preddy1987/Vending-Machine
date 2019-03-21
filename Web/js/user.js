const g_main = document.querySelector('main');


function displayUsers(){
    const displayButton = document.createElement('button'); 
    displayButton.innerText = "Display Users";
    const g_divContainer = document.createElement('div');
    g_divContainer.setAttribute('id','display-btn');
    g_main.insertAdjacentElement('beforeend', g_divContainer);
    const buttonDiv = document.querySelector('main>div');
    buttonDiv.insertAdjacentElement('beforeend',displayButton);
}

function addUser(){
    const addButton = document.createElement('button'); 
    addButton.innerText = "Add User";
    
    const g_divContainer = document.createElement('div');
    g_divContainer.setAttribute('id','add-btn');
    g_main.insertAdjacentElement('beforeend', g_divContainer);
    const buttonDiv = document.querySelector('main :nth-child(2)');
    buttonDiv.insertAdjacentElement('beforeend',addButton);
}

function updateUser(){
    const updateButton = document.createElement('button'); 
    updateButton.innerText = "Update User";
    const g_divContainer = document.createElement('div');
    g_divContainer.setAttribute('id','update-btn');
    g_main.insertAdjacentElement('beforeend', g_divContainer);
    const buttonDiv = document.querySelector('main :nth-child(3)');
    buttonDiv.insertAdjacentElement('beforeend',updateButton);
}

function deleteUser(){
    const deleteButton = document.createElement('button'); 
    deleteButton.innerText = "Delete User";
    const g_divContainer = document.createElement('div');
    g_divContainer.setAttribute('id','delete-btn');
    g_main.insertAdjacentElement('beforeend', g_divContainer);
    const buttonDiv = document.querySelector('main :nth-child(4)');
    buttonDiv.insertAdjacentElement('beforeend',deleteButton);
}



document.addEventListener('DOMContentLoaded', () => {
    displayUsers();
    addUser();
    updateUser();
    deleteUser();
   
    let displayNode = document.getElementById('display-btn');
    displayNode.addEventListener('click', () => {
      fetch('http://localhost:57005/api/user')
       .then((response) => {
          return response.json();
      })
      .then((data) => {

        console.log(data);
          let output = '';
          data.forEach(element => {
              output +=`
              <div>
              <p>${element.firstName}</p>
              <p>${element.lastName}</p>
              <p>${element.username}</p>
              <p>${element.email}</p>
              <p>${element.roleId}</p>
              </div>
              `;
          });
          g_main.insertAdjacentHTML('beforeend',output);
      })
    })

    // let displayNode = document.getElementById('add-btn');
    // displayNode.addEventListener('click', () => {
    //   fetch('http://localhost:57005/api/user', {
    //     method: 'Post'
    //   }).then((response) => {
    //       return response.json();
    //   })
    //   .then((data) => {

    //     console.log(data);
    //       let output = '';
    //       data.forEach(element => {
    //           output +=`
    //           <div>
    //           <p>${element.firstName}</p>
    //           <p>${element.lastName}</p>
    //           <p>${element.username}</p>
    //           <p>${element.email}</p>
    //           <p>${element.roleId}</p>
    //           </div>
    //           `;
    //       });
    //       g_main.insertAdjacentHTML('beforeend',output);
    //   })
    // })



  });


