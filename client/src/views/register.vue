<template>
  <div id="register-form">
    <form id="form-register" @submit.prevent="register()">
      <h4>Sign Up</h4>
      <b-form-group id="input-group-3" label="First name :" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="user.firstname"
          type="text"
          required
          placeholder="Firstname"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Last name:" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="user.lastname"
          type="text"
          required
          placeholder="Lastname"
        ></b-form-input>
      </b-form-group>

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
        <button type="submit" class="button-ecom">Register</button>
      </b-form-group>
    </form>
  </div>
</template>

<script>
import axios from "../config/axios.js";

export default {
  data() {
    return {
      user: {
        firstname: "",
        lastname: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    register() {
      axios({
        method: `POST`,
        url: `/users/register`,
        data: this.user
      })
        .then(({ data }) => {
          console.log(data);
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
          console.log(err);
          
        });
    }
  }
};
</script>

<style scoped>
#form-register {
  background-color: white;
  padding-top: 40px;
  margin-left: auto;
  margin-right: auto;
  padding: 5%;
  border: 0.5px solid #fe7f2d;
  border-radius: 2%;
  box-shadow: 0px 10px 30px #fcca46;
  transition: all 0.3s ease 0s;
  width: 40%;
  height: 520px;
  padding: 2%;
}

.button-ecom {
  margin-top: 5%;
  border: none;
  height: 40px;
  width: 200px;
  border-radius: 3%;
  background-color: #fcca46;
}
</style>
