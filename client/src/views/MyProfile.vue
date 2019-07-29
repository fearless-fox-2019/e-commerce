<template>
  <div class="columns">
    <div class="column" id="homebar" v-if="$store.state.isLogin">
      <homenavbar></homenavbar>
    </div>
    <div style="margin-top:160px" class="columns">
        <div class="column is-3" style="display:flex; padding:20px ;">
          <img
          src="https://bulma.io/images/placeholders/256x256.png"
          alt="Placeholder image"
        />
        </div>
        <div class="column" style="display:flex; padding:20px; flex-direction:column; text-align : left; font-size: 20px">
          <p>Name : {{ loggedUser.name }}</p>
          <p>Joined Date : {{ loggedUser.createdAt | moment("dddd, MMMM Do YYYY") }}</p>
          <a class="button is-dark" style="width:auto">
              <router-link to="/myProfile/transaction">
                <strong>Transaction Detail</strong>
              </router-link>
            </a>
        </div>
        <div class="column is-6">
            <router-view></router-view>
        </div>
    </div>
  </div>
</template>

<script>
import homenavbar from '../components/HomeBar.vue'
import { mapState } from 'vuex'
export default {
  name: 'MyProfile',
  components: {
    homenavbar
  },
  computed: {
    ...mapState(['loggedUser'])
  },
  created () {
    this.$store.dispatch('getLoggedUser')
  }
}
</script>

<style>
#homebar {
  height: 100px;
  display: flex;
  align-items: flex-end;
  margin-top: 30px;
  position: fixed;
}
</style>
