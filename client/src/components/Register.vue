<template>
    <div>
        <b-modal
            id="modal-register"
            ref="modal"
            title="Register"
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

            <b-form-group :state="usernameState"
                label="Username"
                label-for="username-input"
                invalid-feedback="Invalid username">

                <b-form-input
                    id="username-input"
                    ref="usernameInput"
                    v-model="username"
                    :state="usernameState"
                    required></b-form-input>
            </b-form-group>

            <b-form-group :state="passwordState"
                label="Password"
                label-for="password-input"
                invalid-feedback="Invalid password">

                <b-form-input
                    id="password-input"
                    ref="passwordInput"
                    type="password"
                    minlength=6
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
                type="submit"
                @click="ok()"
            >
                Register
            </b-button>
        </div>

        </b-modal>
  </div>
</template>

<script>

import axios from "axios"

export default {
  data() {
    return {
      email: '',
      emailState: null,
      username: '',
      usernameState: null,
      password: '',
      passwordState: null,
    };
  },
  methods: {
    checkFormValidity() {
      const emailValid = this.$refs.emailInput.checkValidity();
      const usernameValid = this.$refs.usernameInput.checkValidity();
      const passwordValid = this.$refs.passwordInput.checkValidity();
      const valid = this.$refs.form.checkValidity();

      this.emailState = emailValid ? 'valid' : 'invalid';
      this.usernameState = usernameValid ? 'valid' : 'invalid';
      this.passwordState = passwordValid ? 'valid' : 'invalid';
      return valid;
    },
    resetModal() {
      this.email = '';
      this.emailState = null;
      this.username = '';
      this.usernameState = null;
      this.password = '';
      this.passwordState = null;
    },
    handleOk(registerModal) {
      registerModal.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      this.register();
    },
    register() {

        axios({
            method: "POST",
            url: `${process.env.VUE_APP_SERVER_URL}/auth/register`,
            data: {
                email: this.email,
                username: this.username,
                password: this.password
            }
        })
            .then((response) => {
                this.$swal(
                    'Register Succeed!',
                    'Please login to continue . . .',
                    'success'
                );
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
