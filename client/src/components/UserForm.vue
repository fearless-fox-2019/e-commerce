<template>
  <v-flex id="isi" xs6>
    <p id="title" v-if="type == 'register'">Sign-Up</p>
    <p id="title" v-if="type == 'login'">Sign-In</p>
    <v-form id="form" ref="form" @submit.prevent="registerLogin">
      <v-text-field
        v-model="userInput.email"
        :rules="[rules.required, rules.email]"
        label="Email"
        solo
        rounded
        required
      ></v-text-field>
      <v-text-field
        v-model="userInput.username"
        label="Username"
        :rules="[rules.required, rules.username]"
        hint="Max 15 characters"
        counter
        solo
        rounded
        required
        v-if="type == 'register'"
      ></v-text-field>
      <v-text-field
        :append-icon="show1 ? 'mdi-visibility' : 'mdi-visibility_off'"
        v-model="userInput.password"
        :type="show1 ? 'text' : 'password'"
        :rules="[rules.required, rules.min]"
        label="Password"
        @click:append="show1 = !show1"
        hint="At least 8 characters"
        counter
        solo
        rounded
        required
      ></v-text-field>
      <div id="option">
        <v-btn color="blue white--text" type="submit" v-if="type == 'register'">Sign Up</v-btn>
        <v-btn color="blue white--text" type="submit" v-else>Sign In</v-btn>
        <v-btn color="red white--text" @click="reset">Clear</v-btn>
      </div>
    </v-form>
  </v-flex>
  
</template>

<script>
export default {
  props: ['type'],
  data() {
    return {
      show1: false,
      userInput: {
        email: "",
        username: "",
        password: ""
      },
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        username: v => v.length <= 15 || "Max 15 characters",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      }
    };
  },
  methods : {
    reset () {
      this.$refs.form.reset()
    },
    registerLogin () {
      let payload = {
        type: this.type,
        data: this.userInput
      } 
      this.$store.dispatch('registerLogin', payload)
      .then(({data}) => {
        this.$store.state.isLoading = false
        if(this.type == 'register') {
          this.$toast.open({ message: 'Account created !', type: 'is-success'})
          this.$router.push('/login')
        } else {
          localStorage.setItem('token', data.token)
          this.$toast.open({ message: 'You Logged In !', type: 'is-success'})
          this.$store.commit('LOGIN', data)
          this.$store.dispatch('fetchCart', data.token)
          this.$router.push('/')
        }
        this.$refs.form.reset()
      })
      .catch(err => {
        this.$store.state.isLoading = false
        this.$refs.form.reset()
        console.log(err.response)
        this.$toast.open({ message: err.response.data.errors[0], type: 'is-danger'})
      })
    }
  }
};
</script>

<style scoped>

#isi {
  /* border: 2px solid black; */
  height: 65%;
  margin: auto 0;
  padding: 20px;
  border-left: 3px solid #e53835c5;
}

#title {
  font-size: 40px;
  font-weight: bold;
  color: #e53935;
}
#option {
    margin-top: 30px;
    /* text-align: center; */
    width: 250px;
    display: flex;
    justify-content: space-evenly;
  }
</style>
