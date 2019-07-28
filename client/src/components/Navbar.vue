<template>
  <div>
    <b-navbar type="dark" style="border-style:groove" fixed="top" variant="dark">
      <b-navbar-nav>
        <b-navbar-brand to="/">
          <img src="https://storage.googleapis.com/photo-wp/1564044473684tukuae.png" alt="Kitten" />
        </b-navbar-brand>
        <b-nav-item to="/">Home</b-nav-item>
        <!-- <b-nav-item to="/detail">Detail Template</b-nav-item> -->

        <b-nav-item-dropdown text="Cart" right>
          <b-dropdown-item to="/cart">Cart</b-dropdown-item>
          <b-dropdown-item href="#">Checkout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
        </b-nav-form>
        <b-nav-item>
          <b-button
            @click.prevent="googleSignIn"
            v-if="$store.state.isLogin == false"
            size="sm"
            variant="success"
            class="my-2 my-sm-0"
          >
            <i class="fab fa-google"></i>
          </b-button>
          <b-button
            v-if="$store.state.isLogin == false"
            size="sm"
            variant="warning"
            class="my-2 my-sm-0"
            v-b-modal.modal-1
          >
            <i class="fas fa-sign-in-alt"></i>
          </b-button>
          <b-button
            v-if="$store.state.isLogin == true"
            size="sm"
            variant="danger"
            class="my-2 my-sm-0"
            @click.prevent="signOut"
          >
            <i class="fas fa-sign-out-alt"></i>
          </b-button>
          <b-button
            v-if="$store.state.isLogin == false"
            size="sm"
            variant="primary"
            class="my-2 my-sm-0"
            v-b-modal.modal-2
          >
            <i class="fas fa-user-plus"></i>
          </b-button>

          <!-- <button
            class="btn btn-outline-warning my-2 my-sm-0"
            type="button"
            v-on:click.prevent="googleSignIn()"
            v-if="!token"
          ></button>-->
        </b-nav-item>
      </b-navbar-nav>
      <b-modal ref="modal-2" id="modal-2" title="Register">
        <form method="post" v-on:submit.prevent="register">
          <div class="form-group">
            <label for="formGroupExampleInput">Username</label>
            <input
              type="text"
              v-model="username"
              class="form-control"
              aria-describedby="title"
              placeholder="Enter your username"
            />
            <small id="text-information" class="form-text text-muted">
              Make your username
              cool!.
            </small>
          </div>
          <div class="form-group">
            <label for="formGroupExampleInput">Email</label>
            <input
              type="email"
              v-model="email"
              class="form-control"
              aria-describedby="email"
              placeholder="Enter your email"
            />
            <small id="text-information" class="form-text text-muted">don't use same email!.</small>
          </div>
          <div class="form-group">
            <label for="formGroupExampleInput">Password</label>
            <input
              type="password"
              v-model="password"
              class="form-control"
              aria-describedby="password"
              placeholder="Enter your password"
            />
            <small id="text-information" class="form-text text-muted">I'll keep your secret!.</small>
          </div>
          <button type="submit" class="btn btn-primary">Register</button>
        </form>
      </b-modal>
      <b-modal ref="modal-1" id="modal-1" title="Sign In">
        <form method="post" v-on:submit.prevent="signIn">
          <div class="form-group">
            <label for="formGroupExampleInput">Username</label>
            <input
              type="text"
              v-model="username"
              class="form-control"
              aria-describedby="title"
              placeholder="Enter your username"
            />
          </div>
          <div class="form-group">
            <label for="formGroupExampleInput">Password</label>
            <input
              type="password"
              v-model="password"
              class="form-control"
              aria-describedby="password"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" class="btn btn-primary">Sign In</button>
        </form>
      </b-modal>
    </b-navbar>
  </div>
</template>

<script>
import instance from "../myconfig";
import GAuth from "vue-google-oauth2";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      email: "",
      username: "",
      password: ""
    };
  },
  methods: {
    signIn() {
      instance
        .post("/users/signin", {
          username: this.username,
          password: this.password
        })
        .then(({ data }) => {
          localStorage.setItem("token", data.access_token);
          // var decoded = jwt.decode(jwttoken)
          localStorage.setItem("username", data.username);
          // console.log(decoded)
          this.$store.commit("LOGIN");
          // myaxios.defaults.headers.common["token"] = data.token
          this.$refs["modal-1"].hide();
          Swal.fire({
            type: "success",
            text: "success login"
          });
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            text: "invalid password/username"
          });
          console.log(err);
        });
    },
    register() {
      instance
        .post("/users/signup", {
          email: this.email,
          username: this.username,
          password: this.password
        })
        .then(({ data }) => {
          localStorage.setItem("token", data.access_token);
          // var decoded = jwt.decode(jwttoken)
          localStorage.setItem("username", data.username);
          // console.log(decoded)
          this.$store.commit("LOGIN");

          this.$refs["modal-2"].hide();
          Swal.fire({
            type: "success",
            text: "success register"
          });
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            text: err.response.data
          });
        });
    },
    googleSignIn() {
      this.$gAuth
        .signIn()
        .then(signedIn => {
          // On success do something, refer to https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleusergetid
          let token = signedIn.getAuthResponse().id_token;
          console.log(token);
          instance
            .post("/users/signin/google", { token: token })
            .then(({ data }) => {
              console.log(data);

              this.$emit("get-token", data);
              Swal.fire({
                type: "success",
                text: "success login"
              });
            })
            .catch(function(error) {
              console.log(error);
              Swal.fire({
                type: "error",
                text: "invalid password/username"
              });
            });
        })
        .catch(error => {
          //on fail do something
        });
    },
    signOut() {
      this.$store.commit("LOGOUT");
      localStorage.removeItem("token");
      // var decoded = jwt.decode(jwttoken)
      localStorage.removeItem("username");
      Swal.fire({
        type: "success",
        text: "success sign-out"
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
