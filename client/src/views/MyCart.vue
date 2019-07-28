<template>
  <div>
    <section>
      <b-tabs type="is-boxed">
        <b-tab-item label="My Cart">
          <b-table
            :data="myCart"
            :columns="columns"
            :checked-rows.sync="checkedRows"
            checkable
            :opened-detailed="defaultOpenedDetails"
            detailed
            detail-key="_id"
            show-detail-icon
          >
            <template slot="detail" slot-scope="props">
              <article class="media">
                <figure class="media-left">
                  <p class="image is-64x64">
                    <img :src="props.row.productId.img" />
                  </p>
                </figure>
                <div class="media-content">
                  <div class="content">
                    <div style="float:right;">
                      amount :
                      <br>
                      <b-input
                        class="is-small"
                        type="number"
                        v-model="props.row.amount"
                        min="1"
                        :max="props.row.productId.stock"
                        style="max-width:20%"
                        required
                      ></b-input>
                      <button @click="deleteCart(props.row._id)" class="button is-small is-danger" style="float:right; margin:5px">delete</button>
                      <br />
                    </div>
                    <p>
                      <strong>{{ props.row.productId.itemName }}</strong>
                      (
                      <small>Rp. {{ props.row.productId.price }}</small>)
                      <br />
                      "{{props.row.productId.description}}"
                    </p>stock: {{props.row.productId.stock}}
                  </div>
                </div>
              </article>
            </template>
            <template slot="bottom-left">
              <b>Total selected</b>
              : {{ checkedRows.length }}
            </template>
          </b-table>
          <div id="navigation">
          <p>
            <b>Total : Rp.</b>
            {{total}}
            <br />
            <br />
            <button @click="createTrans" class="button is-success">PAY NOW</button>
            <input type="text" v-model="form.emailTo" placeholder="email">
            <input type="text" v-model="form.phoneTo" placeholder="phone">
            <input type="text" v-model="form.deliveryTo" placeholder="delivery">
          </p>
        </div>
        </b-tab-item>
        <b-tab-item label="My Transaction">
          <transaction></transaction>
        </b-tab-item>
      </b-tabs>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Transaction from "../components/TableTransaction.vue";

export default {
  components: {
    Transaction
  },
  computed: {
    ...mapState(["myCart"])
  },
  created() {
    this.$store.dispatch("getMyCart", localStorage.getItem("userId"));
    this.$store.dispatch("getMyTransaction")
  },
  data() {
    return {
      form : {
        deliveryTo: '',
        phoneTo: '',
        emailTo: ''
      },
      total: 0,
      defaultOpenedDetails: [],
      showDetailIcon: true,
      checkboxPosition: "left",
      checkedRows: [],
      columns: [
        {
          field: "productId._id",
          label: "Product ID",
          centered: true
        },
        {
          field: "productId.itemName",
          label: "Item Name"
        },
        {
          field: "amount",
          label: "Amount",
          centered: true
        },
        {
          field: "productId.price",
          label: "@Price",
          centered: true,
          numeric: true
        }
      ]
    };
  },
  methods: {
    createTrans(){
      console.log(this.checkedRows.length);
      if(this.checkedRows.length !== 0){
        this.$store.dispatch('createTransaction', [this.checkedRows, this.form])
          .then(() => {

          })
          .catch(err => {

          })
      } else {
        this.$toast.open('please "select" minimum 1 item')
      }
    },
    deleteCart(id){
      this.$store.dispatch('deleteCart', id)
        .then(() => {
          this.$toast.open('cart deleted')
        })
        .catch(err => {
          this.$toast.open(err)
        })
    }
  },
  watch: {
    checkedRows(value){
      console.log('value: ', value);
      this.total = 0
      value.forEach(el => {
          el.subTotal = el.amount*el.productId.price
          this.total += el.subTotal
      })
    },    
  }
};
</script>

<style>
</style>
