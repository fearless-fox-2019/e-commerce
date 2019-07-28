<template>
  <div id="nav">
      <div class="custom-nav-container d-flex align-items-center  justify-content-between px-2  py-3 shadow-sm">
      <a class="text-clipped navbar-brand" href="/">
        <img src="../../public/images/instrom.png" alt="logo" style="width: 100px; height: 100px;">
          <!-- <i class="fas fa-shoe-prints d-flex">
              <span class="m-auto">Hacktiv8</span>
          </i> -->
      </a>
      <div class="main-nav-outer d-flex">
         <i class="fal fa-times text-clipped menu-close-icon d-lg-none"></i>
         <nav class="main-nav navbar navbar-light navbar-expand-lg text-center m-auto">
             <ul class="navbar-nav d-flex">
                <li class="nav-item">
                    <router-link to="/" class="nav-link">Home</router-link>
                </li>
                <li class="nav-item">
                  <!-- <div class="dropdown">
                    <a data-toggle ="dropdown" href="#" class="nav-link dropdown-toggle">Brand</a>
                    <div class="dropdown-menu text-clipped">
                        <a href="/shoes/Nike" class="dropdown-item">Nike</a>
                        <a href="/shoes/Adidas" class="dropdown-item">Adidas</a>
                        <a href="/shoes/Air Jordan" class="dropdown-item">Air Jordan</a>
                        <a href="/shoes/Converse" class="dropdown-item">Converse</a>
                    </div>
                  </div> -->
                  </li>
                  <li class="nav-item">
                      <router-link to="/shoes" class="nav-link">Shoes</router-link>
                  </li>
                  <li class="nav-item">
                      <a href="#" class="nav-link" v-if="!$store.state.isLogin" v-b-modal.loginForm>Login</a>
                      </li>
                  <li class="nav-item">
                      <a href="#" class="nav-link" v-if="!$store.state.isLogin" v-b-modal.registerForm>Register</a>
                  </li>
                  <li class="nav-item">
                      <a href="#" class="nav-link" v-if="$store.state.isLogin">
                          <router-link to="/transactions">
                            Transactions
                          </router-link>
                          </a>
                  </li>
                  <li class="nav-item">
                      <a href="#" class="nav-link" v-if="$store.state.isLogin" @click.prevent="onSignOut" > Sign Out</a>
                  </li>
             </ul>
         </nav>
      </div>
      <div class="nav-icons-container d-flex justify-content-between">
          <div class="nav-icons">
              <a class="">
                  <router-link to="/shoes">

                  <i class="fal fa-search text-clipped">
                  </i>
                  </router-link>
              </a>
          </div>
          <div class="nav-icons ">
            <a class="text-clipped" @click="toCart">
                <i class="fal fa-shopping-bag  bag-item-count text-clipped" ></i>
            </a>
          </div>
          <div class="nav-icons">
              <a class="text-clipped">
                  <i class="fal fa-bars open-menu-icon text-clipped">
                  </i>
              </a>
          </div>
      </div>
     </div>
    </div>
</template>

<script>
export default {
  methods: {
    onSignOut () {
      localStorage.clear()
      this.$swal({
        type: 'success',
        text: 'successfully logged out'
      })
      this.$store.commit('SET_LOGIN', false)
      this.$store.commit('SET_ROLE', null)
      this.$store.commit('ADD_TO_CART',null)
      this.$router.push('/')
    },
    toCart() {
        if(this.$store.state.isLogin) {
            this.$router.push('/cart')
        } else {
            this.$swal({
                type: 'error',
                text: 'you must login first to view cart',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style>

</style>
