<template>
  <div>
    <b-form>
      <b-form-group label="Name:">
        <b-form-input
          v-model="form.name"
          type="text"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

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
          name: '',
          email: '',
          password: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit clicked terus ini this.form', this.form)
        axios ({
          url: `${baseUrl}/api/users/register`,
          method: "post",
          dataType: "json",
          data: this.form
        })
        .then(({data})=>{
          console.log('ini berhasil')
          swal.fire('Registered Succesfully, Please Login')
        })
        .catch((err)=>{
          swal.fire(err.response.data.message)
          console.log('ini masuk error')
          console.log(err)
        })
      },
      onReset(evt) {
        evt.preventDefault()
        this.form.name = ''
        this.form.email = ''
        this.form.PASSWORD = ''
      }
    }
  }
</script>

<style>

</style>
