<template>
  <div class="columns" style="display:flex ;flex-direction:column; margin-top:100px ; padding : 100px ">
    <div class="column">
      <h1 style="font-size:30px"><strong> LIST ALL TRANSACTION </strong></h1>
    </div>
    <div class="column" style="display:flex;justify-content:center">
      <table class="table">
        <thead>
          <tr>
            <th>No.</th>
            <th>User</th>
            <th>Items</th>
            <th>Total Price</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in transactions" :key="i">
            <td>{{ i + 1}}</td>
            <td>{{ item.userId.username }}</td>
            <td>
              <li v-for="(detail,i) in item.items" :key="i">
                <strong>{{ detail.name }}</strong>
              </li>
            </td>
            <td>
              <money-format :value="item.totalPrice" :subunit-value="true" :hide-subunits="true"></money-format>
            </td>
            <td>
              {{ item.createdAt | moment("dddd, MMMM Do YYYY") }}
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
    this.$store.dispatch('getAllTransaction')
  }
}
</script>

<style>
</style>
