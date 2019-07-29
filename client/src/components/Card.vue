<template>
    <div class="card" style="width:300px">
        <img :src=data.img alt="Product image" style="width:250px; height: 250px; object-fit: contain; margin: 7.5%; border: solid 1px #2c3e50;">
        <hr style="background-color: white">
        <div class="card-body" style="margin-top: -5%">
        <h4 class="card-title">{{data.name}}</h4>
        <p class="card-text text-truncate">{{data.description}}</p>
        <a href="/" class="btn btn-dark" style="width:100%" @click="addCart(data)" v-if="!$store.state.isAdmin">Add to Cart</a>
        </div>
    </div>
</template>

<script>
export default {
  name: 'card',
  props: {
    addCart: Function,
    data: Object
  }
}
</script>

<style>
</style>
