<template>
  <div>
    <b-form>
      <b-form-group label="Email address:" description="We'll never share your email with anyone else.">
        <b-form-input
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>


      <b-form-group label="Password:">
        <b-form-input
          v-model="form.password"
          type="password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>

      <b-button @click="onSubmit" type="button" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
  const baseUrl = 'http://localhost:3000'

  export default {
    data() {
      return {
        form: {
          email: '',
          password: '',
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit clicked', this.form)
        axios({
          url: `${baseUrl}/api/users/login`,
          method: "post",
          dataType: "json",
          data: this.form,
        })
        .then(({data})=>{
          localStorage.setItem('token', data.token)
          localStorage.setItem('id', data.id)
          localStorage.setItem('name', data.name)
          localStorage.setItem('email', data.email)
          swal.fire('Login Succes')
          this.$emit('changeLogin', true)
          this.$emit('loginDefault', 'EveryoneArticle')
        })
        .catch((err)=>{
          swal.fire(err.response.data.message)
        })
      }
    }
  }
</script>

<style>

</style>
