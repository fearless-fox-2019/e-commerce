<template>
  <section>
    <form @submit.prevent="submit">
      <div v-if="!isFormProducts" class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p v-if="isFormSignUp" class="modal-card-title">Sign Up</p>
          <p v-if="isFormSignIn" class="modal-card-title">Sign In</p>
        </header>
        <section class="modal-card-body">
          <b-field v-if="isFormSignUp" label="Username">
            <b-input type="username" v-model="form.username" placeholder="Your username" required></b-input>
          </b-field>

          <b-field label="Email">
            <b-input type="email" v-model="form.email" placeholder="Your email" required></b-input>
          </b-field>

          <b-field label="Password">
            <b-input
              type="password"
              v-model="form.password"
              placeholder="Your password"
              password-reveal
              required
            ></b-input>
          </b-field>
          <br />
          <slot></slot>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="$parent.close()">Close</button>
          <button class="button is-primary" type="submit">Submit</button>
        </footer>
      </div>
      <div v-if="isFormProducts" class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Add Products</p>
        </header>
        <section class="modal-card-body">
          <b-field label="Name">
            <b-input
              type="name"
              v-model="formProducts.itemName"
              placeholder="Products name"
              required
            ></b-input>
          </b-field>

          <b-field label="Stock">
            <b-input
              type="number"
              v-model="formProducts.stock"
              placeholder="Products stock"
              min="0"
              required
            ></b-input>
          </b-field>

          <b-field label="Price">
            <b-input
              type="number"
              v-model="formProducts.price"
              placeholder="Products price"
              min="0"
              required
            ></b-input>
          </b-field>

          <b-field label="Category">
            <b-input
              type="name"
              v-model="formProducts.category"
              placeholder="Products category"
              required
            ></b-input>
          </b-field>

          <b-field label="Description">
            <b-input
              type="name"
              v-model="formProducts.description"
              placeholder="Products description"
              required
            ></b-input>
          </b-field>
          
          <b-field label="Image">
            <b-input
              type="file"
              v-model="formProducts.img"
              placeholder="Products img"
              required
            ></b-input>
          </b-field>

          <br />
          <slot></slot>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="$parent.close()">Close</button>
          <button class="button is-primary" type="submit">Submit</button>
        </footer>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  props: ["isFormSignIn", "isFormSignUp", "isFormProducts"],
  components: {},
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: ""
      },
      formProducts: {
        itemName: "",
        stock: 0,
        price: 0,
        img: "",
        category: "",
        description: ""
      }
    };
  },
  methods: {
    submit() {
      if (this.isFormProducts) {

      } else if (this.isFormSignIn) {
        this.$store
          .dispatch("signIn", this.form)
          .then(data => {
            console.log("data: ", data);
            this.$emit("isLoggedIn", false);
          })
          .catch(err => {});
      } else if (this.isFormSignUp) {
        this.$store
          .dispatch("signUp", this.form)
          .then(data => {
            console.log("data: ", data);
            this.$emit("isLoggedIn", false);
          })
          .catch(err => {});
      }
    }
  }
};
</script>
