<template>
    <b-row class="justify-content-center mt-4">
      <b-card bg-variant="light" style="max-width: 600px;">
        <b-card-title>
        Register
        </b-card-title>
        <b-form @submit.prevent="onSubmit">
        <b-row>
          <b-col><b-input v-model="first_name" placeholder="First Name"></b-input></b-col>
          <b-col><b-input v-model="last_name" placeholder="Last Name"></b-input></b-col>
        </b-row>
        <b-form-input class="my-3" v-model="email" type="email" placeholder="Email"></b-form-input>
        <b-form-input class="my-3" v-model="password" type="password" placeholder="Password"></b-form-input>
        <b-button type="submit" variant="primary">Register</b-button>
        </b-form>
      </b-card>
    </b-row>
</template>

<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    onSubmit () {
      console.log('Register')
      axios({
          method: 'post',
          url: 'http://localhost:3000/api/users/signup',
          data: {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            password: this.password
          }
      })
      .then(({ data }) => {
          this.resetValue()
          console.log('Registered')
      })
      .catch( err => {
          this.errorMessage = err
      })
    },
    resetValue () {
      console.log('Reset')
      this.first_name = '',
      this.last_name = '',
      this.email = '',
      this.password = ''
    }
  }
}
</script>

<style>

</style>
