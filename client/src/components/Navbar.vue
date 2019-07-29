<template>
    <div>
    <nav class="text-right yello" style="font-size: 12px; padding: 2px 6px;">
        <div v-if="!isLogin">
            <router-link to="/login" class="yello">Login</router-link> |
            <router-link to="/register" class="yello">Register</router-link>
        </div>
        <a v-if="isLogin" href="#" class="yello">Logout</a>
    </nav>
    <b-navbar toggleable="md" class="yello with-shadow">
        <router-link to="/">
        <b-navbar-brand><img src="https://storage.googleapis.com/adityabpradana-hacktiv8/Logo-Sleepless-Dark.png" height="48px" alt="Sleepless"></b-navbar-brand>
        </router-link>
        <b-navbar-nav class="ml-auto">
            <b-nav-form>
                <b-form-input size="sm" class="mr-sm-2" placeholder="Search Products..." style="border: 0;"></b-form-input>
                <b-button size="sm" class="my-sm-0" type="submit" style="background-color: #46344e; border: 0;">Search</b-button>
            </b-nav-form>
             <i class="material-icons mt-1 mx-3">shopping_cart</i>
        </b-navbar-nav>
    </b-navbar>
    </div>
</template>

<script>
export default {
  data () {
    return {
      isLogin: false
    }
  }
}
</script>

<style>
    .yello {
        background-color: #faed26;
        color: #46344e;
    }

    .with-shadow {
        -webkit-box-shadow: 0px 3px 2px 0px rgba(0,0,0,0.2);
        -moz-box-shadow: 0px 3px 2px 0px rgba(0,0,0,0.2);
        box-shadow: 0px 3px 2px 0px rgba(0,0,0,0.2);
        z-index: 10;
    }
</style>
