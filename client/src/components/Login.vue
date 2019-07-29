<template>
    <div>
        <b-modal
            id="modal-login"
            ref="modal"
            title="Login"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
        >
        <form ref="form" @submit.stop.prevent="handleSubmit">

            <b-form-group :state="emailState"
                label="Email"
                label-for="email-input"
                invalid-feedback="Invalid email"
                >

                <b-form-input
                    id="email-input"
                    ref="emailInput"
                    v-model="email"
                    type="email"
                    :state="emailState"
                    required
                ></b-form-input>

            </b-form-group>

            <b-form-group :state="passwordState"
                label="Password"
                label-for="password-input"
                invalid-feedback="Invalid password">

                <b-form-input
                    id="password-input"
                    ref="passwordInput"
                    type="password"
                    minlength=3
                    v-model="password"
                    :state="passwordState"
                    required></b-form-input>
            </b-form-group>

        </form>

        <div slot="modal-footer" slot-scope="{ ok }" class="w-100">
            <b-button
                variant="primary"
                size="sm"
                class="float-right"
                @click="ok()"
            >
                Login
            </b-button>
        </div>

        </b-modal>
  </div>
</template>

<script>

import axios from "axios";

export default {
  data() {
    return {
      email: '',
      emailState: null,
      password: '',
      passwordState: null,
    };
  },
  methods: {
    checkFormValidity() {
      const emailValid = this.$refs.emailInput.checkValidity();
      const passwordValid = this.$refs.passwordInput.checkValidity();
      const valid = this.$refs.form.checkValidity();

      this.emailState = emailValid ? 'valid' : 'invalid';
      this.passwordState = passwordValid ? 'valid' : 'invalid';
      return valid;
    },
    resetModal() {
      this.email = '';
      this.emailState = null;
      this.password = '';
      this.passwordState = null;
    },
    handleOk(loginModal) {
      loginModal.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      this.login();
    },
    login() {
      console.log(this.email);
      console.log(this.password);

			axios({
				method: "POST",
				url: `${process.env.VUE_APP_SERVER_URL}/auth/login`,
				data: {
					email: this.email,
					password: this.password
				}
			})
				.then((response) => {
					this.$store.commit("updateToken", response.data.token);
				})
				.catch((err) => {
					console.log(err);
				});

      this.$nextTick(() => {
        this.$refs.modal.hide();
      });
    },
  },
};
</script>

<style>

</style>
