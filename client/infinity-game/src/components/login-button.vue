<template>
  <v-layout row justify-center>
    <v-snackbar class="mt-1" v-model="snackbar" top :color="status">{{snackbarMessage}}</v-snackbar>
    <v-dialog v-model="$store.state.modalLogin" persistent max-width="600px">
      <v-alert
        :value="alert"
        type="error"
        color="red darken-3"
        transition="scale-transition"
        class="font-weight-bold title"
      >{{ alertMessage }}</v-alert>
      <template v-slot:activator="{ on }">
        <v-btn flat dark v-on="on">Login</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Login</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Email" prepend-icon="email" v-model="inputEmail" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="Password"
                  prepend-icon="vpn_key"
                  type="password"
                  v-model="inputPassword"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat dark @click="$store.commit('SET_MODAL_LOGIN', false)">Close</v-btn>
          <v-btn flat dark @click="login">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import ax from "../api/api";
export default {
  name: "login",
  data() {
    return {
      dialog: false,
      snackbar: false,
      status: "",
      snackbarMessage: "",
      inputEmail: "",
      inputPassword: "",
      alert: false,
      alertMessage: ""
    };
  },
  methods: {
    login() {
      if (!this.inputEmail || !this.inputPassword) {
        this.alertMessage = "Email/Password can't be blank!";
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        }, 2500);
      } else {
        let user = {
          email: this.inputEmail,
          password: this.inputPassword
        };
        ax({
          method: `post`,
          url: `users/login`,
          data: user
        })
          .then(({ data }) => {
            console.log(data);
            console.log("berhasil login euuy");
            localStorage.setItem("token", data.token);
            localStorage.setItem("name", data.data.name);
            this.dialog = false;
            this.inputEmail = "";
            this.inputPassword = "";
            this.$store.commit("SET_LOGIN");
            this.$store.commit("SET_TOKEN", data.token);
            this.$store.commit("SET_MODAL_LOGIN", false);
            // this.snackbar = true;
            // this.status = "warning";
            // this.alertMessage = "Successfully Logout..";
            // setTimeout(() => {
            //   this.snackbar = false;
            // }, 2000);
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 2000
            });
            Toast.fire({
              type: "success",
              title: "Signed in successfully"
            });
          })
          .catch(err => {
            // console.log(err.response.data.message);
            if (err.response.data.message === "email/password invalid") {
              this.alertMessage = "email/password Invalid!";
              this.alert = true;
              setTimeout(() => {
                this.alert = false;
              }, 2500);
            }
            console.log("kena error login");
            console.log(err, "error login");
          });
      }
    }
  }
};
</script>

<style>
</style>
