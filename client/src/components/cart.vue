<template>
  <div class="cart">
    <!-- ini cart // ini pake table buat nampililn daftar belanjaan yang ada di cart
    {{this.$store.state.logedUser.cart}}-->
    <div class="top">
      <h1>My Cart</h1>
<<<<<<< HEAD
      <el-button type="primary" @click="dialogFormVisible = true" v-if="myCart.length !== 0">Checkout</el-button>
=======
      <el-button type="primary" @click="dialogFormVisible = true">Checkout</el-button>
>>>>>>> 2498bc3e744f742d28bb009f300e873a16168112
      <el-dialog title="Shipping address" :visible.sync="dialogFormVisible">
        <el-form :model="form" @submit.prevent.native="checkoutCart">
          <el-form-item label="Address" label-width="120px" autofocus="true"> 
            <el-input v-model="form.address" autocomplete="off" ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
<<<<<<< HEAD
          <el-button type="primary" @click="checkoutCart">Confirm</el-button>
=======
          <el-button type="primary" @click="checkoutCart" >Confirm</el-button>
>>>>>>> 2498bc3e744f742d28bb009f300e873a16168112
        </span>
      </el-dialog>
    </div>
    <el-table :data="myCart" style="width: 100%">
      <el-table-column label="No." width="50px">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Image" width="80px">
        <template slot-scope="scope">
          <img class="rowImage" :src="scope.row.image" alt />
        </template>
      </el-table-column>
      <el-table-column label="Item Name" width="150px">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.itemname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Description" width="300px">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Price" width="150px">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Action" width="200px">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="removefromcart(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myCart: this.$store.state.logedUser.cart,
      dialogFormVisible: false,
      form: {
        address: ""
      }
    };
  },
  methods: {
    removefromcart(item) {
      console.log(item, "akan diremove from cart");
      this.$store.dispatch("removefromcart", item._id);
    },
    opendialog() {
      this.dialogFormVisible = true;
    },
    checkoutCart() {
      let cart = this.$store.state.logedUser.cart;
      let itemId = [];
      cart.forEach(element => {
        itemId.push(element._id);
      });
      let checkoutItem = {
        userId: this.$store.state.logedUser._id,
        status: "ordered",
        address: this.form.address,
        item: itemId
      };
      this.$store.dispatch('checkoutItem',checkoutItem)
      this.dialogFormVisible = false
      console.log(checkoutItem, "ini yang akan di checkout");
    }
  }
};
</script>

<style scoped>
.rowImage {
  max-width: 20px;
  height: auto;
}
.top {
  display: flex;
  justify-content: space-between;
  padding: 5px 30px;
}
</style>
