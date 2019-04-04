<template>
  <div id="app">
    <user-login></user-login>
  </div>
</template>

<script>
window.currentUser = JSON.parse(sessionStorage.getItem('key'));
import UserLogin from '@/components/UserLogin'
export default {
  name: 'app',
  components: {
    UserLogin
  }
}
</script>

<style>

</style>
