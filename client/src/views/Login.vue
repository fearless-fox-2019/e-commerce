<template>
    <div>
    <section style="padding-top: 200px">
      <form class="form-signin" @submit.prevent="submitLogin">
        <h1 class="h5 mb-3 font-weight-normal">Please sign in</h1>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input
          type="email"
          id="inputEmail"
          class="form-control"
          placeholder="Email address"
          required
          autofocus
          v-model="loginForm.email"
        />
        <label for="inputPassword" class="sr-only">Password</label>
        <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="Password"
          required
          style="margin-bottom: 0px"
          v-model="loginForm.password"
        />
        <div style="margin-bottom: 20px">
          <a href="#"
            @click.prevent="goToRegister"
          >
            <small>Don't have account?</small>
          </a>
        </div>
        <button
          class="btn btn-lg btn-block"
          type="submit"
          style="background-color: #1C1C1C; color: #fff"
        >
          <p
            class="d-flex justify-content-center align-self-center"
            style="margin: 0px; padding-bottom: 3px"
          >Sign in</p>
        </button>

       <div class="d-flex justify-content-center" style="padding-top: 20px">
       </div>

      </form>
    </section>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'login',
  computed: {
    ...mapState(['user']),
  },
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    submitLogin() {
      this.$store.dispatch('login', this.loginForm);
      this.loginForm = {};
    },

    goToRegister() {
      this.$router.push('/register');
    },
  },
  // mounted() {
  //   this.loginForm = {
  //     email: '',
  //     password: '',
  //   };
  // },
};
</script>

<style scoped>
  body {
  -ms-flex-align: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  align-items: center;
  justify-content: center;
  background-color: #E5E6E7;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}

.form-signin .form-control:focus {
  z-index: 2;
}

.form-signin input[type="name"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="email-register"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
