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
      <!-- <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin> -->
    </form>
  </div>
</template>

<script>
import axios from "../config/axios.js";
import GoogleLogin from 'vue-google-login'

export default {
  components : {
    GoogleLogin
  },
  data() {
    return {
      params: {
          client_id:"152518803210-lqhg8i99tc2rr50ggrmvru8dusilpn5t.apps.googleusercontent.com"
        },
      // only needed if you want to render the button with the google ui
      renderParams: {
          width: 250,
          height: 50,
          longtitle: true
      },
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
    },
    onSuccess(googleUser) {
        console.log(googleUser);
        const id_token = googleUser.getAuthResponse().id_token;
        console.log(id_token);
        
        // This only gets the user information: id, name, imageUrl and email
        console.log(googleUser.getBasicProfile());
        // this.$emit("loginPage", {
        //   type : "Google",
        //   id_token
        // }) // change with axios
    },
    onFailure(error) {
      console.log(error)
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
