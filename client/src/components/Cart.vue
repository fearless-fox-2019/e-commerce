<template>
  <b-container fluid>
    <!-- User Interface controls -->

    <!-- Main table element -->
    <b-table
      show-empty
      stacked="md"
      :items="items"
      :fields="fields"
      :current-pprice="currentPprice"
      :per-pprice="perPprice"
      :filter="filter"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      @filtered="onFiltered"
    >
      <template slot="name" slot-scope="row">
        <b-card-group no-body class="text-center" deck style="width: 200px">
          <b-card slot="image" :img-src="row.value.image" img-alt="Card image" img-top fluid>
            <b-card-text>{{ row.value.name }}</b-card-text>
          </b-card>
        </b-card-group>
        <!-- <b-img src="" style="width: 80px; height: 80px" fluid alt="Responsive image"></b-img> -->
      </template>

      <template slot="size" slot-scope="row">{{ row.value }}</template>
      <template slot="quantity" slot-scope="row">
        <b-col class="pr-0 custom-control-inline">
          <input type="number" min="1" :max="row.value.stock" v-model="row.value.quantity" />
        </b-col>
      </template>

      <template slot="actions" slot-scope="row">
        <b-button
          size="sm"
          @click="info(row.item, row.index, $event.target)"
          class="mr-1"
        >Info modal</b-button>
        <b-button
          size="sm"
          @click="row.toggleDetails"
        >{{ row.detailsShowing ? 'Hide' : 'Show' }} Details</b-button>
      </template>

      <template slot="row-details" slot-scope="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
          </ul>
        </b-card>
      </template>
    </b-table>

    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination
          v-model="currentPprice"
          :total-rows="totalRows"
          :per-pprice="perPprice"
          class="my-0"
        ></b-pagination>
      </b-col>
      <b-col md="6" class="my-1">
        <b-button size="sm" @click.prevent="checkout" class="mr-1">Checkout</b-button>
      </b-col>
    </b-row>

    <!-- Info modal -->
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
  </b-container>
</template>

<script>
import instance from "../myconfig";
export default {
  created() {
    instance
      .get(`/carts`, {})
      .then(({ data }) => {
        data.forEach(element => {
          console.log(element, "ini dr element");
          console.log(data, "full");
          console.log(element.selectedSize, "saya diselect");
          this.items.push({
            name: {
              name: element.productCart.name,
              image: element.productCart.image
            },
            quantity: {
              quantity: 1,
              stock: element.productCart.stock,
              id: element.productCart._id
            },
            price: element.productCart.price,
            size: element.selectedSize
          });
        });
        console.log(this.items);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  data() {
    return {
      dataCart: [],
      items: [],
      fields: [
        {
          key: "name",
          label: "Shopping Carts",
          sortable: true,
          sortDirection: "desc"
        },
        { key: "price", label: "price", sortable: true, class: "text-center" },
        { key: "size", label: "size" },
        { key: "quantity", label: "quantity" },
        { key: "actions", label: "Actions" }
      ],
      totalRows: 1,
      currentPprice: 1,
      perPprice: 5,
      ppriceOptions: [5, 10, 15],
      sortBy: null,
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      infoModal: {
        id: "info-modal",
        title: "",
        content: ""
      }
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key };
        });
    }
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  methods: {
    checkout() {
      console.log("checkout");
      let total = 0;
      console.log(this.items);
      let obj = {};
      this.items.forEach(element => {
        console.log(element.quantity.id, "id");
        console.log(obj[element.quantity]);
        if (!obj[element.quantity.id]) {
          obj[element.quantity.id] = 0;
        }
        if (element.quantity.id) {
          obj[element.quantity.id] += Number(element.quantity.quantity);
        }
        console.log(Object.keys(obj), "tester");
       
        // console.log(obj)
        total += Number(element.price) * element.quantity.quantity;
      });
       Object.keys(obj).forEach(key => {
          console.log(key, obj[key]);
          instance
            .put(`/products/stock/${key}`, {
              stock: obj[key]
            })
            .then(({ data }) => {
              console.log(data);
            })
            .catch(function(error) {
              Swal.fire({
                type: "error",
                text: "out of stock"
              });
            });
        });
      Swal.fire({
        type: "success",
        text: `success buying with total ${total}`
      });
    },
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pprices due to filtering
      this.totalRows = filteredItems.length;
      this.currentPprice = 1;
    }
  }
};
</script>