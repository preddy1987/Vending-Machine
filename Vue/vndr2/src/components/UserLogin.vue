<template>
<div id="user-login">
    <form class="user-form">
        <div class="field">
        <label for="username">Username:</label>
        <input type="text" class="form-control" name="username" id="username" >
        </div>
        <div class="field">
        <label for="password">Password:</label>
        <input type="password" class="form-control" name="password" id="password">
        </div>
       <button v-on:click.prevent="resetForm" id="login-user" class="btn btn-primarybtn btn-lg btn-primary btn-block" type="submit">Login</button>
    </form>
</div>
</template>

<script>
export default {
 name: "user",
    data() {
        return {
            // firstName: '',
            // lastName: '',
            // username: '',
            // email: '',
            // password: '',
            // roleId: 0,
            // userId: 0
            username: '',
            password: ''
        }
    }
}
</script>

<style>
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
body{
    background: linear-gradient(white,#60b0f4);
    width: 100vmax;
    height: 100vh;
    background-repeat: no-repeat;
}
</style>