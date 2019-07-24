<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn flat dark v-on="on">Register</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Register</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Name" required></v-text-field>
              </v-flex>
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
export default {
   data() {
    return{
      dialog: false
    }
  },
  methods : {
    register() {
      if(!this.newUser.name || !this.newUser.email || !this.newUser.password){
        Swal.fire({
          type: 'error',
          title: 'input field can\'t be blank!'
        })
      }
      else {
        ax({
          method: "post",
          url : `/users/register`,
          data : this.newUser
        })
        .then(({data}) => {
          console.log(data, `Sucesssssss`)
          this.user.email = data.email,
          this.user.password = this.newUser.password
          this.newUser.name = ''
          this.newUser.email = ''
          this.newUser.password = ''
          this.login()
        })
        .catch(err => {
          console.log(err.message)
          if(err.message.includes('blank')){
            Swal.fire({
            type: 'error',
            title: 'email / password can\'t be blank'
            })
          }
          else if(err.message.includes('registered')) {
            Swal.fire({
            type: 'error',
            title: 'email has been registered!'
            })
          }
          console.log('kena error register')
          console.log(err, 'error register')
        })
      }
    }
  }
};
</script>

<style>
</style>
