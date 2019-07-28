<template>
<div class="beforeLogin">

  <div class="row justify-content-center align-items-center" style="height:100%; width: 100%">
        <p style="font-family: 'Fascinate', cursive; color:white; font-size: 50px;">The best place for cat lovers!</p>
  </div>
</div>

</template>

<script>
import FormLogin from '../components/FormLogin'
import FormRegister from '../components/FormRegister'

export default {
  components: {
    FormLogin,FormRegister
  }
}
</script>

<style scoped>
  .beforeLogin {
    background: 
      linear-gradient(
      rgba(0,0,0,0.5), 
      rgba(0,0,0,0.5)
      ),
      url('../assets/beforeLogin.jpg');
    background-size: contain;
    height: 100%;
    width: 100%;
  };

</style>
