<template>
  <nav class="navbar navbar-expand-lg d-flex fixed-top">
    <div class="brander col-3 d-flex align-items-center justify-content-start">
      <img src="../assets/mobos-logo.svg" alt />
      <a class="navbar-brand" href>Mobos</a>
    </div>

    <div class="col-9 collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" v-if="loginExist">
          <router-link to="/products">
            <a class="nav-link" href>Home</a>
          </router-link>
        </li>
        <!-- <li class="nav-item">
          <a class="nav-link" href="#">
            <router-link to="/about">About</router-link>
          </a>
        </li>-->
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  props: ["loginExist"]
};
</script>

<style scoped>
a.nav-link {
  font-family: "Oswald";
  margin: 0 20px;
  color: azure;
}

a.navbar-brand {
  font-family: "Lobster";
  color: azure;
  font-size: 35px;
}

nav {
  background-color: rgb(44, 44, 44);
  box-shadow: 0 5px 7px rgba(0, 0, 0, 0.589);
  padding: 0;
}

.brander img {
  width: 50px;
}
</style>
