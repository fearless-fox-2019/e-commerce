<template>
  <div class="signup">
    <div class="columns is-centered">
      <div class="column is-two-fifths box">
        <section>
          <form @submit.prevent="signup">
            <p style="font-size:30px">
              <strong>SIGN UP FORM</strong>
            </p>
            <b-field label="Name">
              <b-input placeholder="Name" v-model="name"></b-input>
            </b-field>

            <b-field label="Username">
              <b-input placeholder="Username" maxlength="30" v-model="username"></b-input>
            </b-field>

            <b-field label="Email">
              <b-input type="email" placeholder="Email" maxlength="30" v-model="email"></b-input>
            </b-field>

            <b-field label="Password">
              <b-input type="password" placeholder="Password" password-reveal v-model="password"></b-input>
            </b-field>

            <b-field>
              <b-input
                type="password"
                placeholder="Type the same password"
                v-model="passwordvalidation"
              ></b-input>
            </b-field>

            <input v-show="false" type="submit" />
            <b-button @click.prevent="signup" rounded type="is-dark">Submit</b-button>
          </form>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
const baseUrl = 'http://localhost:3000'
export default {
  name: 'signup',
  data () {
    return {
      name: '',
      email: '',
      username: '',
      password: '',
      passwordvalidation: ''
    }
  },
  methods: {
    signup: function () {
      if (this.password === this.passwordvalidation) {
        this.axios({
          method: 'post',
          url: baseUrl + '/users/signup',
          data: {
            name: this.name,
            email: this.email,
            username: this.username,
            password: this.password
          }
        })
          .then(({ data }) => {
            localStorage.setItem('token', data.token)
            localStorage.setItem('username', this.username)
            this.$swal({
              type: 'success',
              title: `welcome ${this.username}`,
              showConfirmButton: false,
              timer: 1500
            })
            this.$router.push('/')
            this.$store.commit('setLogin', true)
          })
          .catch(err => {
            this.$swal({
              type: 'error',
              title: 'Oops...',
              text: `${err.response.data.err}`
            })
          })
      } else {
        this.$swal({
          type: 'error',
          title: 'Oops...',
          text: 'Your password not mach'
        })
      }
    }
  }
}
</script>

<style scoped>
.signup {
  background-color: grey;
  background-image: url("../assets/marvel-wallpaper-and-background-image-1280x800-id322791.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
}

.column {
  background-color: white;
  margin: 40px;
}

.box {
  opacity: 0.95;
  margin-top: 8%;
}
</style>
