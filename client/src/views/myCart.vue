<template>
    <div>
        <navbarCust></navbarCust>
        <div class="row">
            <div class="col-sm-8 offset-sm-2">
                <cardCart v-for="data in myCart" :key="data._id" :cart="data"></cardCart>
            </div>
        </div>

        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#checkout">
            Checkout
        </button>

        <!-- Modal -->
        <div class="modal fade" id="checkout" tabindex="-1" role="dialog" aria-labelledby="checkout" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-body">
                <h5>Please Fill Form to Checkout</h5><br>
                <form>
                    <div class="form-group row">
                        <label for="address" class="col-sm-2 col-form-label">Address</label>
                        <div class="col-sm-10">
                        <textarea class="form-control" id="address" rows="3"></textarea>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="" class="col-sm-2 col-form-label">Shipping</label>
                        <div class="col-sm-10">
                            <select class="form-control" id="shipping">
                                <option value="Go-Send">Go-Send</option>
                                <option value="Grab-Send">Grab-Send</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Submit</button>
            </div>
            </div>
        </div>
        </div>
    </div>

</template>

<script>
import navbarCust from '@/components/navbarCust.vue'
import cardCart from '@/components/cardCart.vue'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'myCart',
    components:{
        navbarCust,
        cardCart
    },
    methods:{
        ...mapActions(['getMyCart'])
    },
    computed:{
        ...mapState(['myCart'])
    },
    mounted(){
        this.getMyCart()
    }
}
</script>

<style>

</style>
