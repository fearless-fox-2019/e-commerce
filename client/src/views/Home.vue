<template>
  <div class="home" v-if="true">
    <div class="row banner">
      <div class="logo-jumbo col-7">
        <div class="layer d-flex flex-column">
          <img src="../assets/mobos-logo.svg" alt class="brand-logo" />
          <h4>Evolve Your Gaming Station</h4>
        </div>
      </div>
      <div class="user-gate col-5 d-flex flex-column">
        <h1>SIGN IN</h1>
        <form class="d-flex flex-column align-items-center" @submit.prevent="login">
          <input type="text" placeholder="Enter your Email" v-model="formLogin.email" />
          <input type="password" placeholder="Enter your Password" v-model="formLogin.password" />
          <button type="submit" class="btn btn-primary" @click.prevent="login">SIGN IN</button>
        </form>
        <a href data-toggle="modal" data-target="#exampleModalCenter">Didn't have an account?</a>
        <a href class="google-signin">
          <h5>SignIn with Google Account</h5>
        </a>
        <Register></Register>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Register from "@/components/RegisterModal.vue";
import axios from "axios";
import Swal from "sweetalert2"

export default {
  name: "home",
  components: {
    Register
  },
  data() {
    return {
      formLogin: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      axios({
        method: "post",
        url: "http://localhost:3000/users/signin",
        data: {
          email: this.formLogin.email,
          password: this.formLogin.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem("token", data[0]);
          localStorage.setItem("username", data[1]);
          this.$router.push("/products");
        })
        .catch(err => {
          console.log(err);
          Swal.fire({
            type: "error",
            title: "Whoopsy!",
            text: "Invalid email / password!",
            animation: false,
            customClass: {
              popup: 'animated tada'
            }
          });
        });
    }
  }
};
</script>

<style scoped>
div.banner {
  box-shadow: 0 0 10px 8px rgba(0, 0, 0, 0.746);
}

h4 {
  font-family: "Oswald";
  color: rgb(255, 255, 255);
  font-size: 30px;
}

.home {
  width: 100%;
  height: 700px;
  padding: 40px 70px;
  background-image: url("../assets/curls.png");
  margin-top: 60px;
}

.logo-jumbo {
  background-image: url("../assets/pcrgb.jpg");
  background-size: cover;
  height: 500px;
  padding: 0;
}

div.layer {
  height: 100%;
  background-color: rgba(0, 0, 0, 0.658);
  padding: 50px;
}

div.brand-logo {
  height: 100%;
}

.user-gate {
  background-image: url("../assets/cubes.png");
  padding: 30px;
}

/* USER GATE */

.user-gate h1 {
  font-family: "Oswald";
}

input {
  background-color: transparent;
  border: none;
  outline: none;
  border-bottom: 1px solid rgb(129, 129, 129);
  font-family: "Oswald";
  margin-bottom: 30px;
  width: 80%;
}

a.google-signin {
  font-family: "Oswald";
  margin-top: 50px;
}

button {
  margin-bottom: 10px;
}
</style>

