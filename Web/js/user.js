const g_main = document.querySelector('main');
const g_header = document.querySelector('header');


function loginUsers(){
    const loginButton = document.createElement('button'); 
    loginButton.innerText = "Login";
    loginButton.className = 'btn btn-outline-primary';
    const g_divContainer = document.createElement('div');
    g_divContainer.setAttribute('id','login-btn');
    g_header.insertAdjacentElement('beforeend', g_divContainer);
    const buttonDiv = document.querySelector('header>div');
    buttonDiv.insertAdjacentElement('beforeend',loginButton);
}

function addUserBtn(){
    const addButton = document.createElement('button'); 
    addButton.innerText = "Add User";
    addButton.className = 'btn btn-outline-primary';
    const g_divContainer = document.createElement('div');
    g_divContainer.setAttribute('id','add-btn');
    g_header.insertAdjacentElement('beforeend', g_divContainer);
    const buttonDiv = document.querySelector('header :nth-child(2)');
    buttonDiv.insertAdjacentElement('beforeend',addButton);
}

document.addEventListener('DOMContentLoaded', () => {
    loginUsers();
    addUserBtn();

    let loginNode = document.getElementById('login-btn');
    loginNode.addEventListener('click', displayLoginUser);
    function displayLoginUser(){
      let output = `
              <div>
              <div>
              <br />
              <label for="username">Username</label>
              <input class="form-control" type="text" id="username" placeholder="Username">
              <br />
              <label for="password">Password</label>
              <input class="form-control" type="Password" id="password" placeholder="Password">
              <br />
              </div>
              <div>
              <input id="login-user" class="btn btn-primary" type="submit" value="Login">
              </div>
              </div>
      `;
    
      
          g_main.innerHTML = output;
          // document.getElementById('login-user').addEventListener('click', /*redirect user*/);
    }


    let addDisplayNode = document.getElementById('add-btn');
    addDisplayNode.addEventListener('click', displayAddUser)
   function displayAddUser(){
           test = `
           <div>
           <div>
           <br />
           <label for="firstName">First Name</label>
           <input class="form-control" type="text" id="firstName" placeholder="First name">
           <br />
           <label for="lastName">Last Name</label>
           <input class="form-control" type="text" id="lastName" placeholder="Last name">
           <br />
           <label for="username">Username</label>
           <input class="form-control" type="text" id="username" placeholder="Username">
           <br />
           <label for="email">Email</label>
           <input class="form-control" type="text" id="email" placeholder="Email">
           <br />
           <label for="password">Password</label>
           <input class="form-control" type="Password" id="password" placeholder="Password">
           <br />
           </div>
           <div>
           <input id="add-user" class="btn btn-primary" type="submit" value="Submit">
           </div>
           </div>
           `;
           g_main.innerHTML = test;
           document.getElementById('add-user').addEventListener('click', registerUser);
   }
 
    function registerUser(e){
        e.preventDefault();
        const customerRole = 2;
        
        let firstName = document.getElementById('firstName').value;
        let lastName = document.getElementById('lastName').value;
        let username = document.getElementById('username').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let roleId = customerRole;
    

        fetch('http://localhost:57005/api/user', {
          method: 'POST',
          headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-type': 'application/json'
          },

          body: JSON.stringify({firstName:firstName, lastName:lastName, username:username, 
                                email:email, password:password, roleId:roleId})
        }).then((response) => {
            return response.json();
        })
        .then((data) => {
          console.log(data);
      })

    }
    


  });


