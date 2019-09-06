<template>
  <div>
    <b-navbar variant="faded" type="light">
      <b-navbar-brand @click="toHome">
        <img src="../../public/img/Logo.png" class="d-inline-block align-top" alt="Logo" width="40px"/>
        Aei-Commerce
      </b-navbar-brand>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form @submit.prevent="searching()">
          <b-form-input size="sm" class="mr-sm-2" v-model="query" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>

        <b-nav-item @click="toLogin()" v-if="isLogin == false">Login</b-nav-item>
        <div>
          <b-nav-item @click="toCart()"><i class="fa fa-shopping-cart"></i></b-nav-item>
        </div>
        <b-nav-item-dropdown right v-if="isLogin">
          <!-- Using 'button-content' slot -->
          <template slot="button-content">
            <em>User</em>
          </template>
          <b-dropdown-item @click="goProfile()">Profile</b-dropdown-item>
          <b-dropdown-item @click="logout()">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
    <nav class="navbar-page">
      <router-link to="/" class="router">SALE</router-link>
      <router-link to="/" class="router">CUSTOMER CARE</router-link>
      <router-link to="/products" style="color: black;">SHOP</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['isLogin'],
  data () {
    return {
      user: '',
      query: '',
      total: 10
    }
  },
  methods: {
    toLogin () {
      this.$router.push('/login')
    },
    toProducts () {
      this.$router.push('/products')
    },
    toCart () {
      if (localStorage.getItem('token')) {
        this.$router.push('/carts')
      } else {
        this.$router.push('/login')
      }
    },
    toHome () {
      this.$router.push('/')
    },
    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('UserId')
      this.$emit('isLogin', false)
      this.$router.push('/')
    },
    searching () {
      this.$router.push({ path: 'products/search', query: { search: `${this.query}` } })
    },
    goProfile(){
      this.$router.push(`/profile/${localStorage.getItem('UserId')}`)
    }
  },
  created () {

  }
}
</script>

<style scoped>

.navbar{
  background-color : #D8572A;
  color: white;
}
.navbar-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  /* margin-left : 10px; */
}

.router{
  margin-right: 20px;
  color: black;
}
#ex4 .p1[data-count]:after{
  position:absolute;
  right:10%;
  top:8%;
  content: attr(data-count);
  font-size:40%;
  padding:.2em;
  border-radius:50%;
  line-height:1em;
  color: white;
  background:rgba(255,0,0,.85);
  text-align:center;
  min-width: 1em;
  /* font-weight:bold; */
}

#ex3 .fa-stack[data-count]:after{
  position:absolute;
  right:0%;
  top:1%;
  content: attr(data-count);
  font-size:30%;
  padding:.6em;
  border-radius:50%;
  line-height:.8em;
  color: white;
  background:rgba(255,0,0,.85);
  text-align:center;
  min-width: 1em;
  font-weight:bold;
}
</style>
