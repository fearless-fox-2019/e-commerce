<template>
  <nav id="homebar" class="navbar is-transparent">
  <div class="navbar-brand" style="padding: 10px">
      <img src="../assets/Thor-Mjolnir-Hammer-897-Decal-Sticker-510x510.jpg" alt="We've Got What You Want!" width="80" height="80">
  </div>

  <div id="navbarExampleTransparentExample" class="navbar-menu">
    <div class="navbar-start">
      <a @click.prevent="showProducts" class="navbar-item" href="https://bulma.io/">
        OUR PRODUCTS
      </a>

      <a @click.prevent="showTransaction" v-if="$store.state.isAdmin" class="navbar-item" href="https://bulma.io/">
        LIST ALL TRANSACTION
      </a>

    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="field is-grouped">
          <p class="control">
            <a class="bd-tw-button button" @click.prevent="showCart" v-if="!$store.state.isAdmin">
              <i class="fas fa-shopping-cart"></i> My Cart
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  methods: {
    showCart () {
      this.$router.push('/myCart')
    },
    showProducts () {
      this.$router.push('/')
    },
    showTransaction () {
      this.$router.push('/allTransaction')
    }
  }
}
</script>

<style>
#homebar {
  z-index: 1;
}
</style>
