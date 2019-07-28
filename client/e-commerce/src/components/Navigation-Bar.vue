<template>
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="#">
        <img src="../assets/logo.png" width="100">
      </a>

      <a role="button" class="navbar-burger burger"
        aria-label="menu" aria-expanded="false"
        data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item">
          <router-link to="/">
              <strong>All Products</strong>
          </router-link>
        </a>
        <a v-if="isLogin" class="navbar-item">
          <router-link to="/user">
              <strong>User</strong>
          </router-link>
        </a>
      </div>
      <div v-if="isLogin" class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link to="/admin/">
              <a v-if="loggedUser.email === 'admin@admin.com'  && loggedUser.username === 'admin'"
                class="button is-primary"
                style="margin-right : 7.5px;">
                <strong>Add Product</strong>
              </a>
            </router-link>
            <b-dropdown style="margin-right: 7.5px" aria-role="list" v-if="loggedUser.email !== 'admin@admin.com'  && loggedUser.username !== 'admin'">
              <button class="button is-primary" slot="trigger">
                <span style="font-weight: 600">Cart</span>
                <b-icon icon="menu-down"></b-icon>
              </button>
              <h2>Shopping Cart</h2>
              <div class="column box" v-for="(userCart, index) in userCarts" :key="index" style="margin: 10px;">
                <h1>{{userCart.productName}}</h1>
                <a @click.prevent="removeFromCart(index, userCart._id)">
                  <b-icon
                    pack="fas"
                    icon="times"
                    size="is-small">
                  </b-icon>
                </a>
              </div>
            </b-dropdown>
            <a @click.prevent="signOut" class="button is-primary">
            <router-link to="/admin/">
              <strong style="color: #fff">Sign Out</strong>
            </router-link>
            </a>
          </div>
        </div>
      </div>
      <div v-if="!isLogin" class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link to="/user-form">
              <a class="button is-primary"><strong>Sign In / Sign Up</strong></a>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { NotificationProgrammatic as Notification } from 'buefy/dist/components/notification';
import { mapState } from 'vuex';

export default {
  name: 'Navigation-Bar',
  data() {
    return {
      cart: false,
    };
  },
  methods: {
    signOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('user-mail');
      this.$store.commit('loggingOut');
      Notification.open({
        duration: 3000,
        message: 'You Have Signed Out',
        position: 'is-top-right',
        type: 'is-info',
        hasIcon: true,
        closable: false,
        queue: false,
      });
    },
    removeFromCart(index, id) {
      const payload = {
        index,
        id,
      };
      this.$store.dispatch('fireRemoveFromCart', payload);
    },
  },
  computed: mapState({
    isLogin: state => state.isLogin,
    loggedUser: state => state.loggedUser,
    userCarts: state => state.userCart,
  }),
};
</script>

<style scoped>
  .navbar {
    box-shadow: 0 2px 2px -2px rgba(0,0,0,.4);
  }

  .box {
    margin-top: 5em;
    padding: 5px;
  }

  .cart {
    z-index: 30;
    position: fixed;
  }

  .cart-box h2 {
   font-weight: 600;
   text-align: left;
   margin-left: 1em;
  }
</style>
