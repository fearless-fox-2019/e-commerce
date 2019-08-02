<template>
  <div id = "register">
  <div class="row">
    <div class="col-4 offset-4">
    <form @submit.prevent = "registerUser">
      <div class = "form-group">
        <label for = "registerName">Name : </label>
        <input v-model = "register.name"
          type = "text"
          class = "form-control"
          id = "registerName"
          placeholder = "Enter name"
          required
        />
      </div>
      <div class = "form-group">
        <label for = "registerEmail">Email : </label>
        <input v-model = "register.email"
          type = "email"
          class = "form-control"
          id = "registerEmail"
          placeholder = "Enter email"
          required
        />
      </div>
      <div class = "form-group">
        <label for = "registerPassword">Password : </label>
        <input v-model = "register.password"
          type = "password"
          class = "form-control"
          id = "registerPassword"
          placeholder = "Password"
          required
        />
      </div>
      <button style = "border-radius: 30px;width: 130px;text-align:center"
        type = "submit" class = "btn btn-primary">Register</button>
      <p v-if="error.length != 0" style="color:red">{{ error }}</p>
    </form>
    </div>
    </div>
  </div>
</template>
<script>
import axios from '../api/axios'

export default {
  name: "register",
  data() {
    return {
      register: {
        name: "",
        email: "",
        password: ""
      },
      error: ""
    };
  },
  components: {},
  computed: {
    url() {
      return this.$store.state.url;
    }
  },
  methods: {
    registerUser() {
      axios({
        method: "POST",
        url: `${this.url}/users/register`,
        data: {
          name: this.register.name,
          email: this.register.email,
          password: this.register.password
        }
      })
        .then(({ data }) => {
            console.log(data)
            this.clearAll();
        })
        .catch(error => {
          this.error = error.response.data.message;
          console.log(error);
        });
    },
    clearAll() {
      this.register.name = "";
      this.register.email = "";
      this.register.password = "";
      this.error = "";
    }
  }
};
</script>

<style>

</style>