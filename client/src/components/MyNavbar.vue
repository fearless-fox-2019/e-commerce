<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <strong>
        <div class="navbar-item">
          <router-link to="/">
            <div class="columns" style="padding-top:5px">
              <div class="column">
                <img src="@/assets/Tivan_Logo4.png" />
              </div>
              <div class="column is-three-quarters has-text-white">
                <p>The Collector</p>
              </div>
            </div>
          </router-link>
        </div>
      </strong>
    </div>

    <div id="nav" class="navbar-menu">
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons" v-if="!$store.state.isLogin">
            <a class="button is-dark">
              <router-link to="/signup">
                <strong>Sign Up</strong>
              </router-link>
            </a>
            <a class="button is-dark">
              <router-link to="/signin">
                <strong>Sign In</strong>
              </router-link>
            </a>
          </div>
          <div class="buttons" v-if="$store.state.isLogin">
            <a class="button is-dark" @click.prevent="profile">
              <strong> My Profile</strong>
            </a>
            <a class="button is-danger"  @click.prevent="logout">
              <strong>Sign Out</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    logout () {
      this.$swal({
        title: 'You want to go?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then(result => {
        if (result.value) {
          this.$swal({
            type: 'success',
            title: `goodbye Hero`,
            showConfirmButton: false,
            timer: 1500
          })
          localStorage.clear()
          this.$store.commit('setLogin', false)
          this.$router.push('/SignIn')
        }
      })
    },
    profile () {
      this.$router.push('/myProfile')
    }
  },
  created () {
    localStorage.getItem('token')
      ? this.$store.commit('setLogin', true)
      : this.$store.commit('setLogin', false)

    this.$store.dispatch('getProducts')
  }
}
</script>

<style>
nav {
  width: 100%;
}

#nav a {
  font-weight: bold;
  color: #e2e5e7;
}

#nav a.router-link-exact-active {
  color: #880707;
}
</style>
