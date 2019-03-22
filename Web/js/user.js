function setupLoginPage() {
    const mainNode = document.querySelector('main');
    const childNode = document.createElement('h1');
    childNode.innerText = 'Login';
    mainNode.insertAdjacentElement('afterbegin', childNode);

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
              <input id="login-user" class="btn btn-lg btn-primary btn-block" type="submit" value="Login">
              </div>
              </div>
      `;
    
      
      mainNode.innerHTML = output;
          // document.getElementById('login-user').addEventListener('click', /*redirect user*/);
    }
    displayLoginUser();
}


function setupRegistrationPage() {
    const mainNode = document.querySelector('main');
    const childNode = document.createElement('h1');
    childNode.innerText = 'Registration';
    mainNode.insertAdjacentElement('afterbegin', childNode);

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
           mainNode.innerHTML = test;
           document.getElementById('add-user').addEventListener('click', registerUser);
   }
   displayAddUser();
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
          if(response != null){
            return response.json();
          }
          else{

          }
        })
        .then((data) => {
          console.log(data);
      })

    }
}




   


    
    


