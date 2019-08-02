<template>
  <div id="app">
    <navBar :loggedIn="loggedIn"></navBar>
    <router-view style="margin:50px" :loggedIn="loggedIn" />
  </div>
</template>

<script>
import navBar from "@/components/navBar.vue";

export default {
  name: "app",
  data() {
    return {};
  },
  components: {
    navBar
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    }
  },
  watch: {
    loggedIn() {
      if (this.loggedIn == false) {
        this.$router.push("/");
      }else{
        this.$router.push("/allQuestion")
      }
    }
  },
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
  