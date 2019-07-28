<template>
  <div id="app">
      <NavBar></NavBar>
      <LoginForm ></LoginForm>
      <RegisterForm></RegisterForm>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
import NavBar from './components/NavBar'
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'
const baseUrl = `http://localhost:3000/api/users`
export default {
  components: {
    NavBar,
    LoginForm,
    RegisterForm
  },
  created () {
    this.getUser()
    if (localStorage.getItem('token')) {
      this.$store.commit('SET_LOGIN', true)
      // this.$store.commit('')
    } else {
      this.$store.commit('SET_LOGIN', false)
    }
  },
  data () {
    return {
      isLogin: false
    }
  },
  methods: {
    getUser () {
      let userId = localStorage.getItem('id')
      axios.get(`${baseUrl}/${userId}`)
        .then(({ data }) => {
          // console.log(dataFound)
          this.$store.commit('SET_ROLE', data.role)
          // console.log(this.$store.state)
        })
        .catch(error => {
          console.log(error)
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
  color: #42b983;
}
</style>
