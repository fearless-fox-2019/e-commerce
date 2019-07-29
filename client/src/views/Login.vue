<template>
    <b-row class="justify-content-center mt-4">
      <b-card bg-variant="light" style="max-width: 800px;">
        <b-card-title>
          Login
        </b-card-title>
        <b-form @submit.prevent="onSubmit">
        <b-form-input class="my-3" v-model="email" type="email" placeholder="Email"></b-form-input>
        <b-form-input class="my-3" v-model="password" type="password" placeholder="Password"></b-form-input>
        <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
      </b-card>
    </b-row>
</template>

<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    onSubmit () {
      console.log('Login')
      axios({
        method: 'post',
        url: 'http://localhost:3000/api/users/signin',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          console.log(data)
          localStorage.setItem('token', data.access_token)
          localStorage.setItem('name', data.name)
          this.resetValue()
          console.log('Logged In')
        })
        .catch(err => {
          console.log(err)
          this.errorMessage = err
        })
    },
    resetValue () {
      console.log('Reset')
      this.email = ''
      this.password = ''
    }
  }
}
</script>

<style>

</style>
