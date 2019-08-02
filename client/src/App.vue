<template>
  <v-app>
    <v-app-bar app height="50px" dark color="red darken-1">
      <v-toolbar-title class="headline">
        <span id="title">B - Store</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div id="choice">
        <v-btn depressed to="/" text class="white--text" exact-active-class="link-active" exact>home</v-btn>
        <v-btn depressed to="/login" v-if="!isLogin" text class="white--text">Login</v-btn>
        <v-btn depressed to="/register" v-if="!isLogin" text class="white--text">Register</v-btn>
        <v-btn depressed text class="white--text" v-if="loggedUser.role == 'admin'" to="/admin/create">Admin</v-btn>
        <v-btn depressed text class="white--text" v-if="loggedUser.role == 'user'" to="/transaction/shipping" @click="fetchTransactions">Transaction</v-btn>
        <v-btn depressed text class="white--text" v-if="isLogin" @click="logout">Logout</v-btn>
        <v-btn icon to="/cart">
          <v-badge color="red">
            <template v-slot:badge>{{getCart}}</template>
            <v-icon color="white">mdi-cart</v-icon>
          </v-badge>
        </v-btn>
      </div>
    </v-app-bar>
    <v-content>
      <v-progress-linear background-color="white" indeterminate color="red" top :active="isLoading"></v-progress-linear>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',
  data () {
    return {}
  },
  computed: {
    ...mapState(['isLogin', 'loggedUser', 'isLoading', 'cart']),
    getCart () {
      if (this.cart.products !== undefined) {
        let result = 0
        this.cart.products.forEach(product => {
          result += product.total
        })
        return result
      } else {
        return 0
      }
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
    this.$store.dispatch('fetchCart')
    this.$store.commit('CREATED')
    this.$store.dispatch('fetchTransactions')
  },
  methods: {
    logout () {
      this.$store.commit('LOGOUT')
      this.$toast.open({ message: 'Logged Out !', type: 'is-success' })
    },
    fetchTransactions () {
      this.$store.dispatch('fetchTransactions')
      
    }
  }
}
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Lobster&display=swap");
@import url("https://fonts.googleapis.com/css?family=Cinzel&display=swap");
#title {
  /* font-family: 'Lobster', cursive; */
  font-family: "Cinzel", serif;
  font-size: 30px;
}
#choice {
  margin-right: 1em;
}
.link-active {
  color: black;
}

* {
  padding: 0;
  margin: 0;
}
</style>
