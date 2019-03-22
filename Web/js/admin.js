
function setupAdminPage(){

    function getUsers(){
        return fetch(`http://localhost:57005/api/user/`)
        .then((response) => response.json())
    };

    function getRoles(){
        return fetch(`http://localhost:57005/api/role/`)
        .then((response) => response.json())
    };
        
    let usersDisplay = [];

    function getUsersAndRoles(){
        return Promise.all([getUsers(), getRoles()])
    }


    getUsersAndRoles()
    .then(([users, roles]) => {
        // both have loaded!
        users.forEach((user) => {
            let userDisplay = {};
            
            let userRoleId = user.roleId;

            userDisplay.fullname = `${user.firstName} ${user.lastName}`;

            userDisplay.username = user.username;

            roles.forEach((role) => {
                if(userRoleId == role.id){
                    userDisplay.roleTitle = role.name;
                }
            });

            usersDisplay.push(userDisplay);
        });

        createUsersTable();
    })



    function createUsersTable(){

        let tableNode = document.createElement('table');
        tableNode.classList.add(`table`);
        tableNode.classList.add('table-dark');

        //create thead tag

        const tableHeadNode = document.createElement('thead');
        
        // create tbody tag

        const tableBodyNode = document.createElement('tbody'); 
        tableBodyNode.classList.add('table-striped');

        tableNode.classList.add('table-striped');

        let tableRowNode = document.createElement('tr');
        

        let nameHeaderDataNode = document.createElement('th');
        nameHeaderDataNode.innerText = "Name";
        tableRowNode.insertAdjacentElement('beforeend', nameHeaderDataNode);


        let usernameHeaderDataNode = document.createElement('th');
        usernameHeaderDataNode.innerText = "Username";
        tableRowNode.insertAdjacentElement('beforeend', usernameHeaderDataNode);


        let titleHeaderDataNode = document.createElement('th');
        titleHeaderDataNode.innerText = "Role Title";
        tableRowNode.insertAdjacentElement('beforeend', titleHeaderDataNode);


        tableHeadNode.insertAdjacentElement('beforeend', tableRowNode);
        tableNode.insertAdjacentElement('beforeend', tableHeadNode);


        usersDisplay.forEach((user) => {
            let tableRowNode = document.createElement('tr');    
            tableNode.insertAdjacentElement('beforeend', tableRowNode);
        
            let nameRowDataNode = document.createElement('td');    
            nameRowDataNode.innerText = user.fullname;
            tableRowNode.insertAdjacentElement('beforeend', nameRowDataNode);   
            
            
            let usernameRowDataNode = document.createElement('td');    
            usernameRowDataNode.innerText = user.username;
            tableRowNode.insertAdjacentElement('beforeend', usernameRowDataNode);  

            
            let roleRowDataNode = document.createElement('td');
            roleRowDataNode.innerText = user.roleTitle;
            tableRowNode.insertAdjacentElement('beforeend', roleRowDataNode);  
            
            tableBodyNode.insertAdjacentElement('beforeend', tableRowNode);
        });
        
        tableNode.insertAdjacentElement('beforeend', tableBodyNode);

        let mainNode = document.querySelector('main');
        
        mainNode.insertAdjacentElement('beforeend', tableNode);
    }
