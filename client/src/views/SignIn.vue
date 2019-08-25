<template>
  <div class="signup">
    <div class="columns is-centered">
      <div class="column is-two-fifths box">
        <section>
          <form @submit.prevent="signin">
            <p style="font-size:30px">
              <strong>SIGN IN!</strong>
            </p>

            <b-field label="Username">
              <b-input placeholder="Username" maxlength="30" v-model="username"></b-input>
            </b-field>

            <b-field label="Password">
              <b-input type="password" placeholder="Password" password-reveal v-model="password"></b-input>
            </b-field>
            <input type="submit" v-show="false" />
            <b-button @click="signin" rounded type="is-dark">SIGN IN</b-button>
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
  name: 'signin',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    signin: function () {
      this.axios({
        method: 'post',
        url: baseUrl + '/users/signin',
        data: {
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
    }
  }
}
</script>

<style scoped>
.signup {
  background-color: grey;
  background-image: url("../assets/maxresdefault.jpg");
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
