<template>
<b-container class="mt-4">
<b-row>
    <b-col cols="8">
        <b-list-group>
            <b-list-group-item v-for="i in [1,2,3,4,5]" :key="i">
            <b-img img-left src="https://placekitten.com/g/300/300" alt="product" width="100px" height="100px" thumbnail></b-img>
            <h5 class="mx-2" style="display: inline;"><b>Item Name</b></h5>
            <b-form-input type="number" class="ml-4 mt-4 float-right" style="width: 100px; display: inline;" min="1" placeholder="1"></b-form-input>
            <i class="material-icons float-right mt-4" style="font-size: 32px;">delete</i>
            </b-list-group-item>
        </b-list-group>
    </b-col>
    <b-col cols="4">
        <b-card header="Shopping Cart">
            <b-card-text>
                Total Price
            </b-card-text>
            <b-btn block>
                Checkout
            </b-btn>
        </b-card>
    </b-col>
</b-row>
</b-container>

</template>

<script>
export default {

}
</script>

<style>

</style>
