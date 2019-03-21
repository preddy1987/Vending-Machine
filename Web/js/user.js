const g_main = document.querySelector('main');
const g_header = document.querySelector('header');


function displayUsers(){
    const displayButton = document.createElement('button'); 
    displayButton.innerText = "Display Users";
    const g_divContainer = document.createElement('div');
    g_divContainer.setAttribute('id','display-btn');
    g_header.insertAdjacentElement('beforeend', g_divContainer);
    const buttonDiv = document.querySelector('header>div');
    buttonDiv.insertAdjacentElement('beforeend',displayButton);
}

function addUser(){
    const addButton = document.createElement('button'); 
    addButton.innerText = "Add User";
    const g_divContainer = document.createElement('div');
    g_divContainer.setAttribute('id','add-btn');
    g_header.insertAdjacentElement('beforeend', g_divContainer);
    const buttonDiv = document.querySelector('header :nth-child(2)');
    buttonDiv.insertAdjacentElement('beforeend',addButton);
}

function updateUser(){
    const updateButton = document.createElement('button'); 
    updateButton.innerText = "Update User";
    const g_divContainer = document.createElement('div');
    g_divContainer.setAttribute('id','update-btn');
    g_header.insertAdjacentElement('beforeend', g_divContainer);
    const buttonDiv = document.querySelector('header :nth-child(3)');
    buttonDiv.insertAdjacentElement('beforeend',updateButton);
}

function deleteUser(){
    const deleteButton = document.createElement('button'); 
    deleteButton.innerText = "Delete User";
    const g_divContainer = document.createElement('div');
    g_divContainer.setAttribute('id','delete-btn');
    g_header.insertAdjacentElement('beforeend', g_divContainer);
    const buttonDiv = document.querySelector('header :nth-child(4)');
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
          g_main.innerHTML = output;
      })
    })

    let addDisplayNode = document.getElementById('add-btn');
      addDisplayNode.addEventListener('click', displayAddUser)
    
function displayAddUser(){
           test = `
           <form id="add-post"
           <div>
           <input type="text" id="firstName" placeholder="First name">
           <input type="text" id="lastName" placeholder="Last name">
           <input type="text" id="username" placeholder="Username">
           <input type="text" id="email" placeholder="Email">
           <input type="Password" id="password" placeholder="Password">
           <input type="text" id="roleId" placeholder="Role ID">
           </div>
           <div>
           <input type="submit" value="Submit">
           </div>
           </form>
           `,
           g_main.innerHTML = test;

    //     fetch('http://localhost:57005/api/user', {
    //       method: 'Post'
    //     }).then((response) => {
    //         return response.json();
    //     })
    //     .then((data) => {
  
    //       console.log(data);
    //         let output = '';
    //         data.forEach(element => {
    //             output +=`
    //             <div>
    //             <p>${element.firstName}</p>
    //             <p>${element.lastName}</p>
    //             <p>${element.username}</p>
    //             <p>${element.email}</p>
    //             <p>${element.roleId}</p>
    //             </div>
    //             `;
    //         });
    //         g_main.insertAdjacentHTML('beforeend',output);
    //     })
    //   })
    }


  });


