<template>
  <div class="allTransaction">
    <!-- {{transactions}} -->
    <el-table :data="this.$store.state.allTransaction" style="width: 100%">
      <el-table-column label="No." width="50px">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Username" width="110px">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.userId.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Email" width="150px">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.userId.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Item" width="170px" type="expand">
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
      <el-table-column label="Date" width="120px">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.createdAt | moment("dddd, MMMM Do YYYY") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Last Update" width="120px">
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
          <span style="margin-left: 10px">{{ scope.row.status}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transactions: this.$store.state.allTransaction || ""
    };
  },
  created() {
    this.$store.dispatch("fetchAllTransaction");
    this.transaction = this.$store.state.allTransaction;
  }
};
</script>

<style scoped>
.rowImage {
  max-width: 50px;
  height: auto;
  border-radius: 5px;
}
</style>
