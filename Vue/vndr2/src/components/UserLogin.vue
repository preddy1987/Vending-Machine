<template>
<div id="user-login">
    <form>
        <div>
        <label for="username">Username:</label>
        <input type="text" class="form-control" name="username" id="username" >
        </div>
        <div>
        <label for="password">Password:</label>
        <input type="text" class="form-control" name="password" id="password">
        </div>
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
.form-control{
    max-width: 40%;
    margin: 20px, 0px, 20px, 0px,
}

#user-login form{
    text-align: center;
}
#login-user{
    max-width: 40%;
    margin-top: 10px;
}
#add-user{
    margin-top: 10px;
}
</style>
