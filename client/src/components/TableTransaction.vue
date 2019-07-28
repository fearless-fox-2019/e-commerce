<template>
  <div>
    <b-table
      :data="myTransaction"
      :columns="columns"
      :opened-detailed="defaultOpenedDetails"
      detailed
      detail-key="_id"
      show-detail-icon
    ></b-table>
    <template slot="detail" slot-scope="props">
      <article class="media" v-for="product in props.row.products" :key="product._id">
        <figure class="media-left">
          <p class="image is-64x64">
            <img :src="product.img" />
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <div style="float:right;">
              amount :
              <br />
              <b-input
                class="is-small"
                type="number"
                v-model="amount"
                min="1"
                :max="product.stock"
                style="max-width:20%"
                required
              ></b-input>
              <button class="button is-small is-danger" style="float:right; margin:5px">delete</button>
              <br />
            </div>
            <p>
              <strong>{{ product.itemName }}</strong>
              (
              <small>Rp. {{ product.price }}</small>)
              <br />
              "{{product.description}}"
            </p>
          </div>
        </div>
      </article>
    </template>
    <hr />
  </div>
</template>


<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["myTransaction"])
  },
  data() {
    return {
      defaultOpenedDetails: [],
      total: 0,
      columns: [
        {
          field: "_id",
          label: "Transaction ID",
          centered: true
        },
        {
          field: "totalPrice",
          label: "Total Payment",
          centered: true
        },
        {
          field: "paymentDate",
          label: "Payment Date",
          centered: true
        }
      ]
    };
  },
  watch: {
    // trans(value){
    //     this.total = 0
    //     value.forEach(el => {
    //         el.subTotal = el.amount*el.productId.price
    //         this.total += el.subTotal
    //     })
    // }
  }
};
</script>

<style>
#navigation {
  display: flex;
  justify-content: end;
}
</style>
