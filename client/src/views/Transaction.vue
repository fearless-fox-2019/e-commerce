<template>
  <div class="columns" style="padding:15px">
    <div class="column">
      <table class="table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Items</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in transactions" :key="i">
            <td>{{ i + 1}}</td>
            <td>
              <li v-for="(detail,i) in item.items" :key="i">
                <strong>{{ detail.name }}</strong>
              </li>
            </td>
            <td>
              <money-format :value="item.totalPrice" :subunit-value="true" :hide-subunits="true"></money-format>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MoneyFormat from 'vue-money-format'
export default {
  components: {
    'money-format': MoneyFormat
  },
  computed: {
    ...mapState(['transactions'])
  },
  created () {
    this.$store.dispatch('getTransaction')
  }
}
</script>

<style>
</style>
