<template>
    <div>
        <b-modal
            :id="'modal-add-cart-'+item._id"
            ref="modal"
            title="Add to cart"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
        >
        <form ref="form" @submit.stop.prevent="handleSubmit">

            <b-form-group :state="nameState"
                label="Name"
                label-for="name-input"
                >

                <b-form-input
                    id="name-input"
                    ref="nameInput"
                    type="text"
                    :state="nameState"
                    :value="item.name"
                    disabled
                ></b-form-input>

            </b-form-group>

            <b-form-group :state="quantityState"
                label="Quantity"
                label-for="quantity-input"
                invalid-feedback="Invalid quantity">

                <b-form-input
                    id="quantity-input"
                    ref="quantityInput"
                    type="number"
                    min="1"
                    v-model="quantity"
                    :max="item.stock"
                    :state="quantityState"
                    required></b-form-input>
            </b-form-group>

            Total price: Rp {{ item.price*quantity }} ,-

        </form>

        <div slot="modal-footer" slot-scope="{ ok }" class="w-100">
            <b-button
                variant="primary"
                size="sm"
                class="float-right"
                type="submit"
                @click="ok()"
            >
                Add to cart
            </b-button>
        </div>

        </b-modal>
  </div>
</template>

<script>

import axios from "axios";

export default {
    props: ["item"],
    data() {
        return {
            name: '',
            nameState: null,
            quantity: '',
            quantityState: null,
        };
  },
  methods: {
    checkFormValidity() {
      const quantityValid = this.$refs.quantityInput.checkValidity();
      this.quantityState = quantityValid ? 'valid' : 'invalid';
      return quantityValid;
    },
    resetModal() {
      this.quantity = '';
      this.quantityState = null;
    },
    handleOk(addToCartModal) {
      addToCartModal.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      this.addToCart();
    },
    addToCart() {

			console.log(this.quantity);

				axios({
					method: "POST",
					url: `${process.env.VUE_APP_SERVER_URL}/carts`,
					headers: {
						token: this.$store.state.token
					},
					data: {
						itemId: this.item._id,
						quantity: this.quantity
					}
				})
					.then((response) => {
							this.$swal(
								'Item is successfully added to cart!',
								'',
								'success'
							);

							this.$emit("refetch")
					})
					.catch((err) => {
						console.log(err);
							this.$swal(
								'Error while adding item to cart!',
								'',
								'error'
							);
					});

        this.$nextTick(() => {
            this.$refs.modal.hide();
        });

    },
  }  
}
</script>

<style>

</style>
