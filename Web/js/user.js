const g_main = document.querySelector('main');


function displayUsers(){
    const displayButton = document.createElement('button'); 
    displayButton.innerText = "Display Users";
    displayButton.setAttribute('id','display-btn');
    g_main.insertAdjacentElement('beforeend',displayButton);
}

function addUser(){
    const addButton = document.createElement('button'); 
    addButton.innerText = "Add User";
    addButton.setAttribute('id','add-btn');
    g_main.insertAdjacentElement('beforeend',addButton);
}

function updateUser(){
    const updateButton = document.createElement('button'); 
    updateButton.innerText = "Update User";
    updateButton.setAttribute('id','update-btn');
    g_main.insertAdjacentElement('beforeend',updateButton);
}

function deleteUser(){
    const deleteButton = document.createElement('button'); 
    deleteButton.innerText = "Delete User";
    deleteButton.setAttribute('id','delete-btn');
    g_main.insertAdjacentElement('beforeend',deleteButton);
}



document.addEventListener('DOMContentLoaded', () => {
    displayUsers();
    addUser();
    updateUser();
    deleteUser();
   
    let displayNode = document.getElementById('display-btn');
    displayNode.addEventListener('click', () => {
      fetch('http://localhost:57005/api/user')
    //   , { 
    //   mode: 'cors',
    //   headers:{
    //     'Access-Control-Allow-Origin':'*'
    //     },
    //    }) 
       .then((response) => {
          return response.json();
      })
      .then((data) => {

        console.log(data);
        //   let output = '<div></div>';
        //   data.forEach(element => {
        //       output +=`
        //       <h1>test</h1>
        //       <p>${element.firstname}</p>
        //       `;
        //   });
        //   g_main.insertAdjacentElement('afterend',output);
      })
    })

  });


