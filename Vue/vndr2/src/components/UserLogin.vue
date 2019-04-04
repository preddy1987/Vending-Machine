<template>
<div id="user-login">
    <form class="user-form">
        <div class="field">
        <label for="username">Username:</label>
        <input type="text" id="username" class="form-control" v-model.lazy="$v.formResponses.username.$model" >
        <p class="error" v-if="!$v.formResponses.username.required">this field is required</p>
        <p class="error" v-if="!$v.formResponses.username.minLength">Field must have at least 
           {{ $v.formResponses.username.$params.minLength.min }} characters.</p>
        </div>
        <div class="field">
            <label for="password">Password:</label>
        <input type="password" id="password" class="form-control" v-model.lazy="$v.formResponses.password.$model" >
        <p class="error" v-if="!$v.formResponses.password.required">this field is required</p>
        <p class="error" v-if="!$v.formResponses.password.minLength">Field must have at least 
           {{ $v.formResponses.password.$params.minLength.min }} characters.</p>
        </div>
       <button @click.prevent="loginUser" id="login-user" class="btn btn-primarybtn btn-lg btn-primary btn-block" type="submit">Login</button>
    </form>
</div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators"; 

export default {
 name: "user",
  data() {
   return {
     formResponses: {
       username: '',
       password: ''
     }
   }
 },
 validations: {
   formResponses: {
     username: {
       required,
        minLength: minLength(2)
     },
      password: {
       required,
        minLength: minLength(3)
     }
   }
 },
    methods: {
    loginUser() {
         const username = document.getElementById('username').value;
         const password = document.getElementById('password').value;
        fetch('http://localhost:57005/api/user/login', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
        },
        body: JSON.stringify({username:username, password: password,})
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
.error {
  color: red;
}
</style>