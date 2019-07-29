<template>
    <div class="card text-white" style="width: 100%; background-color: white; border: solid 1px #2c3e50; margin-bottom:1%;">
        <div class="card-body row text-center" style="width: 100%;">
            <div class="col-4">
              <h5 style="float: right; margin-top: 3%; color: #2c3e50;"> Transaction ID: {{data._id}} </h5>
            </div>
            <div class="col-4" style="color: #2c3e50;">
              <h4> Product :  </h4>
              <h6 v-for="product in data.arrProduct" :key="product._id"> {{product.productName}}, Quantity : {{product.amount}} </h6>
            </div>
            <div class="col-2" style="color: #2c3e50;">
              <h4> Total Price : </h4>
              <h5 style="margin-top: 2%;">{{data.totalPayment}} </h5>
            </div>
            <h5 class="col-2 pointer" style="margin-top: 2.5%; color: #5A9CD9; margin-top: 1.5%;" v-if="data.status == 'Paid' && !$store.state.isAdmin" @click="receive(data._id)"> Confirmation Receive </h5>
            <h5 class="col-2 pointer" style="margin-top: 2.5%; color: #5A9CD9; margin-top: 1.5%;" v-if="data.status == 'Paid' && $store.state.isAdmin"> Paid </h5>
            <h5 class="col-2 pointer" style="margin-top: 2.5%; color: #5A9CD9; margin-top: 1.5%;" v-if="data.status == 'Received' && $store.state.isAdmin"> Received </h5>
        </div>
    </div>
</template>

<script>
export default {
    name: 'trxCart',
    props: {
      data: Object,
      receive: Function
    }
}
</script>

<style>
    .pointer {cursor: pointer;}
</style>
