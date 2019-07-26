<template>
  <div>
      <navbarAdmin ></navbarAdmin>

      <button>
        <router-link to="/item/add">Add new Item </router-link>
      </button>

      <tableAllItem></tableAllItem>
      <footerPage></footerPage>
  </div>
</template>

<script>
// @ is an alias to /src
import navbarAdmin from '@/components/navbarAdmin.vue'
import tableAllItem from '@/components/tableAllItem.vue'
import footerPage from '@/components/footer.vue'

export default {
  name: 'home',
  components: {
    navbarAdmin,
    tableAllItem,
    footerPage
  }
}
</script>
