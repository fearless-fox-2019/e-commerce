<template>
 <b-modal id="loginForm" title="Login" ref="this-modal">
    <b-form @submit.prevent="loginUser">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          type="email"
          v-model="login.email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          required
          type="password"
          v-model="login.password"
          placeholder="Enter Password"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" class="right" variant="primary">Submit</b-button>
    </b-form>
  </b-modal>
</template>

<script>
import axios from 'axios'
const baseUrl = 'http://localhost:3000/api/users'
export default {
  data () {
    return {
      login: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    loginUser () {
      axios.post(`${baseUrl}/login`, {
        email: this.login.email,
        password: this.login.password
      })
        .then(({ data }) => {
          console.log(data)
          this.$swal({
            type: 'success',
            text: 'Successfully logged in'
          })
          localStorage.setItem('token', data.token)
          localStorage.setItem('username', data.username)
          localStorage.setItem('email', data.email)
          localStorage.setItem('id',data.id)
          console.log(data)
          this.hideModal()
          this.$store.commit('SET_LOGIN', true)
          this.$store.commit('SET_ROLE', data.role)
        })
        .catch((error) => {
          this.$swal({
            type: 'error',
            text: `${error.response.data.message}`
          })
        })
    },
    hideModal () {
      this.$refs['this-modal'].hide()
    }
  }
}
</script>

<style>

</style>
