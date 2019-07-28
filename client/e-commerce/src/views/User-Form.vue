<template>
  <div class="column is-half is-offset-one-quarter">
    <!-- Tabs -->
    <div class="box">
      <b-tabs position="is-centered" class="block head-form">
        <b-tab-item label="Sign In">
          <!-- Sign In -->
          <b-field label="E-Mail" style="margin-top : 2.5vh">
            <b-input type="email" placeholder="Enter E-Mail" v-model="form.email"></b-input>
          </b-field>
          <b-field label="Password">
            <b-input password-reveal placeholder="Enter Password" v-model="form.password" type="password"></b-input>
          </b-field>
          <b-button @click.prevent="signIn" type="is-primary" rounded>Sign In</b-button>
        </b-tab-item>
        <!-- Sign Up -->
        <b-tab-item label="Sign Up">
          <b-field label="Fullname" style="margin-top : 2.5vh">
            <b-input type="text" required placeholder="Enter Name" v-model="form.fullname"></b-input>
          </b-field>
          <b-field label="E-Mail">
            <b-input required type="email" placeholder="Enter E-Mail" v-model="form.email"></b-input>
          </b-field>
          <b-field label="Password">
            <b-input password-reveal required validation-message="Password Can Only Contain Alpha-Numeric and Minimum 8 Character" pattern="^[a-zA-Z ]{8}$" placeholder="Enter Password" v-model="form.password" type="password"></b-input>
          </b-field>
          <b-button @click.prevent="signUp" type="is-primary" rounded>Sign Up</b-button>
        </b-tab-item>
      </b-tabs>
    </div>

  </div>
</template>

<script>
import { NotificationProgrammatic as Notification } from 'buefy/dist/components/notification';
import axios from '../config/axios';

export default {
  data() {
    return {
      form: {
        fullname: null,
        email: null,
        password: null,
      },
    };
  },
  methods: {
    signUp() {
      axios.post('/users/signup', this.form)
        .then(({ data }) => {
          Notification.open({
            duration: 3000,
            message: 'Account Created ! Please Login to Proceed',
            position: 'is-top-right',
            type: 'is-success',
            hasIcon: true,
            closable: false,
          });
          // this.$router.push('/user-form');
        })
        .catch((err) => {
          Notification.open({
            duration: 3000,
            message: err.response.data.message.split(':')[2].trim(),
            position: 'is-top-right',
            type: 'is-danger',
            hasIcon: true,
          });
          console.log(err);
        });
    },
    signIn() {
      console.log('signin Trigger');
      axios.post('/users/signin', this.form)
        .then(({ data }) => {
          console.log(data, '<<<<');
          Notification.open({
            duration: 3000,
            message: 'You have Signed In',
            position: 'is-top-right',
            type: 'is-info',
            hasIcon: true,
            closable: false,
          });
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', data.fullname);
          localStorage.setItem('user-mail', data.email);
          this.$store.commit('loggingIn');
          this.$router.push('/');
        })
        .catch((err) => {
          Notification.open({
            duration: 5000,
            message: err.response.data.message,
            position: 'is-top-right',
            type: 'is-danger',
            hasIcon: true,
          });
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>

.head-form {
  padding : 0 10vw;
}

.box {
  width : 50vw;
  min-height : 50vh;
  margin-top : 15vh
}

.button {
  margin-top: 2.5vh;
  font-weight: 600
}

</style>
