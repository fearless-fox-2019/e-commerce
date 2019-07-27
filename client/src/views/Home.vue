<template>
  <div>
      <navbarAdmin ></navbarAdmin>

      <button id="btn-add" class="btn btn-sm">
        <router-link to="/item/add">
          Add new item
        </router-link>
      </button>

      <tableAllItem></tableAllItem>

  </div>
</template>

<script>
// @ is an alias to /src
import navbarAdmin from '@/components/navbarAdmin.vue'
import tableAllItem from '@/components/tableAllItem.vue'


export default {
  name: 'home',
  components: {
    navbarAdmin,
    tableAllItem
  }
}
</script>

<style scoped>
  #btn-add{
    margin-bottom: 10px;
    background-color: goldenrod;
    color: black;
    text-decoration: none;
    
  }
</style>

