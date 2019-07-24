<template>
    <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn flat dark v-on="on">Login</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Login</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password" type="password" required></v-text-field>
              </v-flex>                          
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat dark @click="dialog = false">Close</v-btn>
          <v-btn flat dark @click="dialog = false">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
    
</template>
<script>
import ax from '../api/api'
export default {
  name : "login",
  data() {
    return{
      dialog: false,
      user : {
        email : '',
        password : ''
      }
    }
  },
  methods : {
    login(){
      if(!this.user.email || !this.user.password){
        Swal.fire({
          type: 'error',
          title: 'email / password can\'t be blank',
        })
      }
      else {
        ax({
          method : `post`,
          url : `users/login`,
          data : this.user
        })
        .then(({data}) => {
          console.log('berhasil login euuy')
          this.user.email = ''
          this.user.password = ''
          localStorage.setItem('name', data.name)
          localStorage.setItem('token', data.token)
          this.toHome()
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });
          Toast.fire({
            type: 'success',
            title: 'Signed in successfully'
          })
          
        })
        .catch(err => {
          console.log('kena error login')
          console.log(err, 'error login')          
        })
      }
    }
  }
}
</script>

<style>

</style>
