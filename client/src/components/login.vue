<template>
  <div id = "login">
    <div class="row">
      <div class="col-4 offset-4">
      <form @submit.prevent = "loginUser">
        <div class = "form-group">
          <label for = "emailLogin">Email : </label>
          <input v-model = "login.email"
            type = "email"
            class = "form-control"
            id = "emailLogin"
            placeholder = "Enter email"
            required
          />
        </div>
        <div class = "form-group">
          <label for = "passwordLogin">Password : </label>
          <input v-model = "login.password"
            type = "password"
            class = "form-control"
            id = "passwordLogin"
            placeholder = "Password"
            required
          />
        </div>
        <button style = "border-radius: 30px;width: 130px;text-align:center"
          type = "submit"
          class = "btn btn-primary"
        >Login</button>
        <p v-if = "error.length != 0" style="color:red">{{ error }}</p>
      </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from '../api/axios'
export default {
  name: "login",
  data() {
    return {
      login: {
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
    loginUser() {
      axios({
        method: "POST",
        url: `${this.url}/login`,
        data: {
          email: this.login.email,
          password: this.login.password
        }
      })
        .then(({ data }) => {
          this.clearAll();
          console.log(data);
          localStorage.setItem("token", data.token);
          localStorage.setItem("id", data.id);
          this.$store.commit("userLoggedIn", data);
          // this.$router.push("/questions");
        })
        .catch(error => {
          this.error = error.response.data.message;
          console.log(error);
        });
    },
    clearAll() {
      this.login.name = "";
      this.login.email = "";
      this.login.password = "";
      this.error = "";
    }
  }
};
</script>