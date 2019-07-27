<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-alert
        :value="alert"
        type="error"
        color="red darken-3"
        transition="scale-transition"
        class="font-weight-bold title"
      >{{ errorMessage }}</v-alert>
      <template v-slot:activator="{ on }">
        <v-btn flat dark v-on="on" id="but">Register</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Register</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Name" prepend-icon="person" v-model="newUser.name" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email" prepend-icon="email" v-model="newUser.email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  label="Password"
                  prepend-icon="vpn_key"
                  type="password"
                  v-model="newUser.password"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat dark @click="dialog = false">Close</v-btn>
          <v-btn flat dark @click="register">Submit</v-btn>
        </v-card-actions>

        <v-layout justify-center>
          <v-dialog v-model="conrirmDialog" persistent max-width="320">          
            <v-card>
              <v-card-title class="headline">Successfully Registered, Proceed to Login?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="dialog = false">Disagree</v-btn>
                <v-btn color="green darken-1" text @click="toSignin">Agree</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import ax from "../api/api";
export default {
  data() {
    return {
      dialog: false,
      conrirmDialog : false,
      props : ['login'],
      newUser: {
        name: "",
        email: "",
        password: ""
      },
      alert: false,
      errorMessage: ""
    };
  },
  methods: {
    register() {
      if (!this.newUser.name || !this.newUser.email || !this.newUser.password) {
        this.errorMessage = "Input field can't be blank!";
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        }, 2500);
      } else {
        ax({
          method: "post",
          url: `/users/register`,
          data: this.newUser
        })
          .then(({ data }) => {
            console.log(data, `Sucesssssss`);
            this.newUser.name = "";
            this.newUser.email = "";
            this.newUser.password = "";
            this.conrirmDialog = true
          })
          .catch(err => {
            console.log(err.response.data.message);
            // console.log(err);
            if (err.response.data.message.includes("email has already taken by another user!")) {
              this.errorMessage = "email has already taken by another user!";
              this.alert = true;
              setTimeout(() => {
                this.alert = false;
              }, 2500);
            } else if (
              err.response.data.message.includes("email format wrong")
            ) {
              console.log("masuk error email format");
              this.errorMessage = "Email format wrong!";
              this.alert = true;
              setTimeout(() => {
                this.alert = false;
              }, 2500);
            } else if (
              err.response.data.message.includes(
                "password length must be more than 6 characters!"
              )
            ) {
              this.errorMessage =
                "Password length must be more than 6 characters!";
              this.alert = true;
              setTimeout(() => {
                this.alert = false;
              }, 2500);
            }
          });
      }
    },
    toSignin(){
      this.dialog = false
      this.$store.commit('SET_MODAL_LOGIN', true)
    }
  }
};
</script>

<style>
</style>
