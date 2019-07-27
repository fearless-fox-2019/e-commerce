<template>
  <v-app id="inspire" dark>
    <navbar />
    <v-content grey>
      <router-view />
    </v-content>
    <v-footer>
      <span>&copy; Infinity Game</span>
    </v-footer>
  </v-app>
</template>

<script>
import home from './views/Home'
import navbar from './components/navbar'
export default {
  name: 'App',
  components: {
    home,
    navbar
  },
  data () {
    return {
      //
    }
  }
}
</script>
