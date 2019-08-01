<template>
    <div>
        <div class="d-flex justify-content-center" style="padding-top: 20px"><h3>Your Order List</h3></div>
        <div class="d-flex justify-content-center" style="margin: 0">
            <div class="">
                <table class="table table-borderless" style="background-color: #fff">
                    <tr>
                        <th><p>Address</p></th>
                        <th><p>Total</p></th>
                        <th><p>Status</p></th>
                        <th><p>Action</p></th>
                    </tr>
                    <tr v-for="(tran, index) in transaction" :key="index">
                        <td><p>{{user.address}}</p></td>
                        <td><p>{{converter(tran.totalPayment)}}</p></td>
                        <td><p>{{tran.status}}</p></td>
                        <td v-if="tran.status === 'paid'">
                            <button class="btn btn-danger" @click.prevent="delivered(tran._id)">Delivered</button>
                        </td>
                        <td v-else>
                            <div>Complete</div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import api from '../apis/localhost'
import converter from '../helpers/converter'
import { mapState } from 'vuex';

export default {
  data() {
      return {
          transaction: []
      }
  },
  mounted() {
      this.fetchTransaction()
  },
  computed: {
      ...mapState(['user'])
  },
  methods: {
    converter,
    fetchTransaction() {
      api.defaults.headers.common.token = localStorage.token 

      api
      .get(`/transactions/user-transaction`)
      .then(({ data }) => {
          this.transaction = data
          console.log(data);
      })
      .catch(err => console.log('errrr', err))
    },
    delivered(id) {
      api.defaults.headers.common.token = localStorage.token

      api.patch(`/transactions/change/${id}/delivered`)
      .then(trans => {
        this.fetchTransaction()
        Swal.fire(
          'Thank you!',
          'success'
        )
      })
      .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>
  p {
    margin: 0px
  }
</style>