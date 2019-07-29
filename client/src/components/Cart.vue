<template>
    <div class="card text-white" style="width: 100%; background-color: white; border: solid 1px #2c3e50; margin-bottom:1%;">
        <div class="card-body row text-center" style="width: 100%;">
            <div class="col-6 row">
                <div class="col-1"></div>
                <img :src="data.img" alt="Product image" style="max-width:80px; max-height: 80px; object-fit: cover; margin-left: 1%;">
                <h3 class="col-8" style="float: right; margin-top: 3%; color: #2c3e50;"> {{data.productName}} </h3>
            </div>
            <div class="col-2" style="color: #2c3e50;">
                <h3> Quantity </h3>
                <div class="row">
                    <a class="col-4 pointer" style="margin-top: 4%;" @click="minAmount(index)"><i class="fas fa-minus fa-1x"/></a>
                    <h4 style="display: inline-block; border: solid 1px #2c3e50; padding: 5px; padding-left: 15px; padding-right: 15px;"> {{data.amount}} </h4>
                    <a class="col-4 pointer" style="margin-top: 4%;" @click="addAmount(index)"><i class="fas fa-plus fa-1x"/></a>
                </div>
            </div>
            <div class="col-3" style="color: #2c3e50;">
                <h3 style="margin-top: 2%;"> Total Price </h3>
                <h4>{{data.totalPrice}}</h4>
            </div>
            <h3 class="col-1 pointer" style="margin-top: 2.5%; color: #2c3e50;" @click="remove(index)"> <i class="fas fa-trash fa-1x"/> </h3>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Cart',
    props: {
        data: Object,
        index: Number,
        addAmount: Function,
        minAmount: Function,
        remove: Function
    }
}
</script>

<style>
    .pointer {cursor: pointer;}
</style>
