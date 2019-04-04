<template>
<div id="user-login">
    <form class="user-form">
        <div class="field">
        <label for="username">Username:</label>
        <input type="text" id="username" class="form-control" v-model.lazy="username" >
        </div>
        <div class="field">
        <label for="password">Password:</label>
        <input type="password" id="password" class="form-control" v-model.lazy="password" >
        </div>
       <button @click.prevent="loginUser" id="login-user" class="btn btn-primarybtn btn-lg btn-primary btn-block" type="submit">Login</button>
    </form>
</div>
</template>

<script>
export default {
 name: "user",
  data() {
   return {
       username: '',
       password: ''
   }
 },
    methods: {
    loginUser() {
        //  const username = document.getElementById('username').value;
        //  const password = document.getElementById('password').value;
        fetch('http://localhost:57005/api/user/login', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
        },
        body: JSON.stringify({username:this.username, password:this.password,})
        }).then((response) => {
        if(response.status == 404){
            sessionStorage.removeItem('key')
            alert('Not Valid');
        }
        else{
             sessionStorage.removeItem('key')
            return response.json();
        }
        })
        .then((data) => {
            if(data){
            sessionStorage.setItem('key',  JSON.stringify([
                { firstName: data.firstName },
                { lastName: data.lastName},
                { roleID: data.roleId},
                { userId:data.id}
           ]));
          window.currentUser = JSON.parse(sessionStorage.getItem('key'));
        }
        })
    },
  }
}
</script>

<style scoped>
.user-form{
    width: 35%;
    margin:auto;
}
.form-control{
    margin: 20px, 0px, 20px, 0px,
}
#login-user{
    margin-top: 10px;
}
#add-user{
    margin-top: 10px;
}
#user-login{
    background: linear-gradient(white,#60b0f4);
    width: 100vmax;
    height: 100vh;
    background-repeat: no-repeat;
}
</style>