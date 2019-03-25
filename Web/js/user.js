window.myUser = JSON.parse(sessionStorage.getItem('key'));


function setupLoginPage() {
  const mainNode = document.querySelector('main');
  const divContainer = document.createElement('div');
  divContainer.id = 'loginContainer'; 
  mainNode.insertAdjacentElement("afterbegin",divContainer);
  

    function getUserNode(){
      const inputUserNode = document.createElement('input');
      inputUserNode.setAttribute('type','text')
      inputUserNode.setAttribute('id','username')
      inputUserNode.setAttribute('placeholder', 'Username');
      inputUserNode.className = "form-control";
      const labelNodeUser = document.createElement('label');
      labelNodeUser.setAttribute('for','username')
      labelNodeUser.innerText = 'Username';

      divContainer.insertAdjacentElement('beforeend',labelNodeUser );
      divContainer.insertAdjacentElement('beforeend',inputUserNode);
     }
    function getPasswordNode(){
      const passwordNode = document.createElement('input');
      passwordNode.setAttribute('type','password')
      passwordNode.setAttribute('id','password')
      passwordNode.setAttribute('placeholder', 'Password');
      passwordNode.className = "form-control";
      const pwLabelNode = document.createElement('label');
      pwLabelNode.setAttribute('for','password');
      pwLabelNode.innerText = 'Password';

      divContainer.insertAdjacentElement('beforeend',pwLabelNode );
      divContainer.insertAdjacentElement('beforeend',passwordNode);
     }
    function getSubmitNode(){
      const submitNode = document.createElement('input');
      submitNode.setAttribute('type','submit');
      submitNode.setAttribute('id','login-user');
      submitNode.setAttribute('value','login')
      submitNode.className = 'btn btn-lg btn-primary btn-block';

      divContainer.insertAdjacentElement('beforeend',submitNode);
    }
    function displayLoginUser(){
      getUserNode();
      getPasswordNode();
      getSubmitNode();
        document.getElementById('login-user').addEventListener('click', loginUser);
          
    }
    function loginUser(e){
      e.preventDefault();
      let username = document.getElementById('username').value;
      let password = document.getElementById('password').value;
       fetch('http://localhost:57005/api/user/login', {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
      },
      body: JSON.stringify({username:username, password:password,})
    }).then((response) => {
      if(response.status == 404){
        alert('Not Valid');
      }
      else{
        sessionStorage.clear();
        return response.json();
      }
    })
    .then((data) => {
      sessionStorage.setItem('key',  JSON.stringify([
        { firstName: data.firstName },
        { lastName: data.lastName},
        { userId:data.id}
      ]));
      myUser = JSON.parse(sessionStorage.getItem('key'));
      createVendingPage();
  })
    }
    displayLoginUser();
}


function setupRegistrationPage() {
    const mainNode = document.querySelector('main');
    const divContainer = document.createElement('div');
    divContainer.id = 'loginContainer'; 
    mainNode.insertAdjacentElement("afterbegin",divContainer);

   

    function getFirstNameNode(){
      const firstNameNode = document.createElement('input');
      firstNameNode.setAttribute('type','text')
      firstNameNode.setAttribute('id','firstName')
      firstNameNode.setAttribute('placeholder', 'First Name');
      firstNameNode.className = "form-control";
      const labelNode = document.createElement('label');
      labelNode.setAttribute('for','firstName')
      labelNode.innerText = 'First Name';

      divContainer.insertAdjacentElement('beforeend',labelNode );
      divContainer.insertAdjacentElement('beforeend',firstNameNode);
     }
     function getLastNameNode(){
      const lastNameNode = document.createElement('input');
      lastNameNode.setAttribute('type','text')
      lastNameNode.setAttribute('id','lastName')
      lastNameNode.setAttribute('placeholder', 'Last Name');
      lastNameNode.className = "form-control";
      const labelNode = document.createElement('label');
      labelNode.setAttribute('for','lastName')
      labelNode.innerText = 'Last Name';

      divContainer.insertAdjacentElement('beforeend',labelNode );
      divContainer.insertAdjacentElement('beforeend',lastNameNode);
     }
    function getUserNode(){
      const inputUserNode = document.createElement('input');
      inputUserNode.setAttribute('type','text')
      inputUserNode.setAttribute('id','username')
      inputUserNode.setAttribute('placeholder', 'Username');
      inputUserNode.className = "form-control";
      const labelNodeUser = document.createElement('label');
      labelNodeUser.setAttribute('for','username')
      labelNodeUser.innerText = 'Username';

      divContainer.insertAdjacentElement('beforeend',labelNodeUser );
      divContainer.insertAdjacentElement('beforeend',inputUserNode);
     }
     function getEmailNode(){
      const emailNode = document.createElement('input');
      emailNode.setAttribute('type','text')
      emailNode.setAttribute('id','email')
      emailNode.setAttribute('placeholder', 'Email');
      emailNode.className = "form-control";
      const labelNode = document.createElement('label');
      labelNode.setAttribute('for','email')
      labelNode.innerText = 'Email';

      divContainer.insertAdjacentElement('beforeend',labelNode );
      divContainer.insertAdjacentElement('beforeend',emailNode);
     }
    function getPasswordNode(){
      const passwordNode = document.createElement('input');
      passwordNode.setAttribute('type','password')
      passwordNode.setAttribute('id','password')
      passwordNode.setAttribute('placeholder', 'Password');
      passwordNode.className = "form-control";
      const pwLabelNode = document.createElement('label');
      pwLabelNode.setAttribute('for','password');
      pwLabelNode.innerText = 'Password';

      divContainer.insertAdjacentElement('beforeend',pwLabelNode );
      divContainer.insertAdjacentElement('beforeend',passwordNode);
     }
    function getSubmitNode(){
      const submitNode = document.createElement('input');
      submitNode.setAttribute('type','submit');
      submitNode.setAttribute('id','add-user');
      submitNode.setAttribute('value','Register')
      submitNode.className = 'btn btn-primary';

      divContainer.insertAdjacentElement('beforeend',submitNode);
    }

   function displayAddUser(){
          //  test = `
          //  <div>
          //  <div>
          //  <br />
          //  <label for="firstName">First Name</label>
          //  <input class="form-control" type="text" id="firstName" placeholder="First name">
          //  <br />
          //  <label for="lastName">Last Name</label>
          //  <input class="form-control" type="text" id="lastName" placeholder="Last name">
          //  <br />
          //  <label for="username">Username</label>
          //  <input class="form-control" type="text" id="username" placeholder="Username">
          //  <br />
          //  <label for="email">Email</label>
          //  <input class="form-control" type="text" id="email" placeholder="Email">
          //  <br />
          //  <label for="password">Password</label>
          //  <input class="form-control" type="Password" id="password" placeholder="Password">
          //  <br />
          //  </div>
          //  <div>
          //  <input id="add-user" class="btn btn-primary" type="submit" value="Submit">
          //  </div>
          //  </div>
          //  `;
            //  mainNode.innerHTML = test;
            getFirstNameNode();
            getLastNameNode();
            getUserNode();
            getEmailNode();
            getPasswordNode();
            getSubmitNode();
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
    
      if(firstName != "" && lastName != "" && username != "" && password != "" ){
        fetch('http://localhost:57005/api/user', {
          method: 'POST',
          headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-type': 'application/json'
          },
          body: JSON.stringify({firstName:firstName, lastName:lastName, username:username, 
                                email:email, password:password, roleId:roleId})
        }).then((response) => {
          if(response.status == 404){
            alert('Not Valid');
          }
          else{
            sessionStorage.clear();
            return response.json();
          }
        })
        .then((data) => {
          if(data){
          sessionStorage.setItem('key',  JSON.stringify([
            { firstName: data.firstName },
            { lastName: data.lastName},
            { userId:data.id}
          ]));
          myUser = JSON.parse(sessionStorage.getItem('key'));
          createVendingPage();
        }
      })
      }
      else{
        alert('Not Valid');
      }
     

    }
}




   


    
    


