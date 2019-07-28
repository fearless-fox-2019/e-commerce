<template>
  <div>
      <navbarAdmin ></navbarAdmin>

      <button id="btn-add" type="button" class="btn btn-warning btn-sm">
        <router-link to="/item/add">
          <i class="fas fa-plus"></i> New item
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
    margin-bottom: 20px;

    
  }
</style>

