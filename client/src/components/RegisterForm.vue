<template>
  <b-modal id="registerForm" title="Register Form" ref="this-modal">
    <b-form @submit="registerUser">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          type="email"
          v-model="register.email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Username:"
        label-for="input-1"
      >
        <b-form-input
          id="input-3"
          type="text"
          v-model="register.username"
          required
          placeholder="Enter username"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="register.password"
          required
          type="password"
          placeholder="Enter Password"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" class="right" variant="primary">Submit</b-button>
    </b-form>
  </b-modal>

</template>

<script>
import axios from 'axios'
const baseUrl = `http://localhost:3000/api/users`
export default {
  data () {
    return {
      register: {
        email: '',
        username: '',
        password: ''
      }
    }
  },
  methods: {
    registerUser () {
      axios.post(`${baseUrl}/register`, {
        email: this.register.email,
        username: this.register.username,
        password: this.register.password
      }
      )
        .then((dataCreated) => {
          this.hideModal()
          this.$swal({
            type: 'success',
            text: 'successfully created an account'
          })
          // console.log('terbikin')
        })
        .catch((error) => {
          // console.log(error)
          if (error) {
            this.$swal({
              type: 'error',
              text: `${error.response.data.message}`
            })
          }
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
