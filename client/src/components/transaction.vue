<template>
  <div class="transaction">
    <!-- ini transaction // ini pake tabel juga buat nampilin transaksi yang pernah dilakukan
    {{this.$store.state.myTransaction}} -->
    <el-table :data="this.$store.state.myTransaction" style="width: 100%">
      <el-table-column label="No." width="50px">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Item" width="70px" type="expand">
        <template slot-scope="props">
          <el-table :data="props.row.item" border style="width: 100%">
            <el-table-column prop="No." label="No." width="50">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="it.image" label="Image" width="120">
              <template slot-scope="scope">
                <img class="rowImage" :src="scope.row.image" alt />
              </template>
            </el-table-column>
            <el-table-column prop="Item Name" label="Item Name" width="150">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.itemname }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="Price" label="Price" width="100">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.price }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="Ammount" label="Ammount" width="100">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.ammount }}</span>
              </template>
            </el-table-column>
          </el-table>
          <!-- <div class="itemlist" style="margin-left: 10px" v-for="(it,i) in props.row.item" :key="i">
            <div class="item">
              <img :src="it.image" class="rowImage" />
              <p>{{it.itemname}}</p>
              <p>{{it.price}}</p>
            </div>
          </div>-->
        </template>
      </el-table-column>
      <el-table-column label="Address" width="120px">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Date" width="180px">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.createdAt | moment("dddd, MMMM Do YYYY") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Last Update" width="180px">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.updatedAt | moment("dddd, MMMM Do YYYY") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Total Price" width="130px">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.totalPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Category" width="160px">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === 'sent' " @click="confirmOrder(scope.row._id)">Confirm</el-button>
          <span style="margin-left: 10px" v-else>{{ scope.row.status}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
    //   myTransaction: this.$store.state.myTransaction
    };
  },
  methods: {
    confirmOrder(transactionId){
      console.log('barang sudah diterima',transactionId)
      this.$store.dispatch('confirmOrder',transactionId)

    }
  },
  created() {
    this.$store.dispatch("myTransaction");
  }
};
</script>

<style>
</style>
