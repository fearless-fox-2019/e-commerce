<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Products</router-link> |
      <router-link to="/cart" v-if="$store.state.isLogin && !$store.state.isAdmin"> Cart</router-link> <a v-if="$store.state.isLogin && !$store.state.isAdmin"> | </a> 
      <router-link to="/transaction" v-if="$store.state.isLogin && !$store.state.isAdmin"> Transaction</router-link> <a v-if="$store.state.isLogin && !$store.state.isAdmin"> | </a> 
      <a class="pointer" data-toggle="modal" data-target="#balanceModal" v-if="$store.state.isLogin && !$store.state.isAdmin"> Topup </a> <a v-if="$store.state.isLogin && !$store.state.isAdmin"> | </a> 
      <router-link to="/admin" v-if="$store.state.isAdmin"> Admin </router-link> <a v-if="$store.state.isAdmin"> | </a> 
      <a class="pointer" data-toggle="modal" data-target="#signinModal" v-if="!$store.state.isLogin"> Signin </a>
      <a class="pointer" @click="signout" v-else> Signout </a>
    </div>
    <router-view style="margin: 3%; margin-top: 0; text-align: left;" />

    <!-- SIGNIN MODALS -->
    <div class="modal fade" id="signinModal" style="text-align:left">
      <div class="modal-dialog modal-lg">
          <div class="modal-content">
              <!-- Modal Header -->
              <div class="modal-header">
                  <h4 class="modal-title" style="margin-left: 1%">SignIn</h4>
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
              </div>
              <!-- Modal body -->
              <div class="modal-body">
                  <form @submit.prevent="signin">
                      <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                          <label for="email">Email:</label>
                          <input type="email" class="form-control" v-model="user.email">
                      </div>
                      <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                          <label for="password">Password:</label>
                          <input type="password" class="form-control" v-model="user.password">
                          <button class="btn btn-dark" type="submit" style="margin-top: 3%; width: 100%; background-color: black;">SignIn</button>
                      </div>
                  </form>
                  <div>
                      <a data-toggle="modal" data-target="#signupModal" data-dismiss="modal" class="pointer" style="float: right; margin-right: 1%; color: blue">SignUp</a>
                      <a class="default" style="float: right; margin-right: 1%;">Don't have any account?</a>
                  </div>
              </div>
          </div>
      </div>
    </div>

    <!-- SIGNUP MODALS -->
    <div class="modal fade" id="signupModal" style="text-align:left">
      <div class="modal-dialog modal-lg">
          <div class="modal-content">
              <!-- Modal Header -->
              <div class="modal-header">
                  <h4 class="modal-title" style="margin-left: 1%">SignUp</h4>
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
              </div>
              <!-- Modal body -->
              <div class="modal-body">
                  <form @submit.prevent="signup">
                      <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                          <label for="name">Name:</label>
                          <input type="name" class="form-control" v-model="newUser.name">
                      </div>
                      <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                          <label for="email">Email:</label>
                          <input type="email" class="form-control" v-model="newUser.email">
                      </div>
                      <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                          <label for="password">Password:</label>
                          <input type="password" class="form-control" v-model="newUser.password">
                      </div>
                      <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                          <label for="address">Address:</label>
                          <input type="text" class="form-control" v-model="newUser.address">
                      </div>
                      <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                          <label for="balance">Balance:</label>
                          <input type="number" class="form-control" style="width: 100%" v-model="newUser.balance">
                          <button class="btn btn-dark" type="submit" style="margin-top: 3%; width: 100%; background-color: black;">SignUp</button>
                      </div>
                  </form>
                  <div>
                      <a data-toggle="modal" data-target="#signinModal" data-dismiss="modal" class="pointer" style="float: right; margin-right: 1%; color: blue">SignIn</a><a class="default" style="float: right; margin-right: 1%;">Have any account?</a>
                  </div>
              </div>
          </div>
      </div>
    </div>

    <!-- BALANCE MODALS -->
    <div class="modal fade" id="balanceModal" style="text-align:left">
      <div class="modal-dialog modal-lg">
          <div class="modal-content">
              <!-- Modal Header -->
              <div class="modal-header">
                  <h4 class="modal-title" style="margin-left: 1%">Topup</h4>
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
              </div>
              <!-- Modal body -->
              <div class="modal-body">
                  <form @submit.prevent="updateBalance">
                      <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                          <label for="balance">Balance:</label>
                          <input type="number" class="form-control" v-model="balance">
                          <button class="btn btn-dark" type="submit" style="margin-top: 3%; width: 100%; background-color: black;">Topup</button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      baseUrl: 'http://localhost:3000',
      balance: '',
      user: {
        email: '',
        password: ''
      },
      newUser: {
        name: '',
        email: '',
        password: '',
        address: '',
        balance: ''
      }
    }
  },
  created: function () {
    this.$store.commit('checkLogin')
  },
  methods: {
    signin () {
      let obj = {
        email: this.user.email,
        password: this.user.password
      }
      axios({
        method: 'POST',
        url: `${this.baseUrl}/users/signin`,
        data: obj
      })
        .then(({ data }) => {
          $('#signinModal').modal('hide'); $('.modal-backdrop').remove()
          if (obj.email === 'admin@mail.com') {
            localStorage.setItem('admin', true)
            this.$store.commit('checkLogin')
            this.$router.push('/admin')
          }
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('userId', data.id)
          this.$store.commit('checkLogin')
          this.user.email = ''
          this.user.password = ''
          Swal.fire({
            title: `Welcome back ${obj.email}!`,
            type: 'success'
          })
        })
        .catch(({ response }) => {
          $('#signinModal').modal('hide'); $('.modal-backdrop').remove()
          Swal.fire({
            title: 'Failed to signin!',
            text: `${response.data.message}`,
            type: 'error',
            confirmButtonText: 'Ok'
          })
        })
    },
    signup () {
      let obj = {
        name: this.newUser.name,
        email: this.newUser.email,
        password: this.newUser.password,
        address: this.newUser.address,
        balance: this.newUser.balance
      }
      axios({
        method: 'POST',
        url: `${this.baseUrl}/users/signup`,
        data: obj
      })
        .then(({ data }) => {
          $('#signupModal').modal('hide');
          $('#signinModal').modal('show');
          let objTrx = {
            userId: data._id,
            arrProduct: [],
            status: 'Cart'
          }
          return axios({
            method: 'POST',
            url: `${this.baseUrl}/transactions`,
            data: objTrx
          })
        })
        .then(() => {
          Swal.fire({
            title: `Success signup with email ${obj.email}!`,
            type: 'success'
          })
        })
        .catch(({ response }) => {
          $('#signupModal').modal('hide'); $('.modal-backdrop').remove()
          Swal.fire({
            title: 'Failed to signup!',
            text: `${response.data.message}`,
            type: 'error',
            confirmButtonText: 'Ok'
          })
        })
    },
    signout () {
      Swal.fire({
        title: 'Are you sure?',
        text: 'We will miss you!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#343A40',
        cancelButtonColor: '#C82333',
        confirmButtonText: 'Yes, signout!'
      })
        .then((result) => {
          if (result.value) {
            localStorage.clear()
            this.$store.commit('checkLogin')
            this.$router.push('/')
          }
        })
    },
    updateBalance () {
      axios({
        method: 'GET',
        url: `http://localhost:3000/users/user`,
        headers: {
          'access_token': localStorage.getItem('access_token')
        }
      })
      .then(user => {
        let obj = {
          balance: Number(this.balance) + user.data.balance,
        }
        axios({
          method: 'PATCH',
          url: `http://localhost:3000/users/updatebalance`,
          data: obj,
          headers: {
            'access_token': localStorage.getItem('access_token')
          }
        })
        .then(() => {
          this.balance = ''
          $('#balanceModal').modal('hide'); $('.modal-backdrop').remove()
          Swal.fire({
            title: `Top up success`,
            type: 'success'
          })
        })
        .catch(err => {
          console.log(err)
        })
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #5A9CD9;
}
.default {cursor: default;}
.pointer {cursor: pointer;}
</style>
