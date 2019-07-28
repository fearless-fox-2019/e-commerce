<template>
  <div class="loginpage">
    <form id="form-login" @submit.prevent="login()">
      <h4>Login your Account</h4>
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="user.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="password" label="Password:" label-for="password">
        <b-form-input
          id="input-2"
          v-model="user.password"
          type="password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>
      <router-link to="/register">Don't have an account?</router-link>
      <button type="submit" class="button-ecom">Login</button>
    </form>
  </div>
</template>

<script>
import axios from "../config/axios.js";

export default {
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      axios({
        method: `POST`,
        url: `/users/login`,
        data: {
          email: this.user.email,
          password: this.user.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("UserId", data.data._id);
          this.$emit("isLogin", true);
          this.$router.push("/products");
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: "Something went wrong!" + JSON.stringify(err)
          });
        });
    }
  }
};
</script>

<style scoped>
#form-login {
  background-color: white;
  padding-top: 40px;
  margin-left: auto;
  margin-right: auto;
  padding: 5%;
  border: 0.5px solid #fe7f2d;
  border-radius: 2%;
  box-shadow: 0px 10px 30px #fcca46;
  transition: all 0.3s ease 0s;
  width: 30%;
  height: 430px;
  padding: 2%;
}

.button-ecom {
  margin-top: 7%;
  border: none;
  height: 40px;
  width: 200px;
  border-radius: 3%;
  background-color: #fcca46;
}
</style>
