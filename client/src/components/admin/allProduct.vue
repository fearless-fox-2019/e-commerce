<template>
  <el-table :data="$store.state.allItem" style="width: 100%">
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
    <el-table-column label="Stock" width="100px">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.stock }}</span>
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
    <el-table-column label="Category" width="160px">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.category.join(',') }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Rate" width="100px">
      <template slot-scope="scope">
        <span
          style="margin-left: 10px"
        >{{ (scope.row.rate.point / scope.row.rate.count).toFixed(2) }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Action" width="200px">
      <template slot-scope="scope">
        <el-button size="mini" @click="editItem(scope.row)">Edit</el-button>
        <el-button size="mini" type="danger" @click="deleteItem(scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      // visible: true,
      dialogVisible: false
    };
  },
  methods: {
    editItem(item) {
      console.log(item, "alkan diedit");
      this.$emit("changetab", { pageDir: "edit Item", data: item });
    },
    deleteItem(item) {
      this.dialogVisible = true
      this.$confirm(`Are you sure want to delete this item ? 
      left to cancel, right to confirm`)
          .then(_ => {
            this.$store.dispatch('deleteItem',item)
          })
          .catch(_ => {});
      // console.log(item, "akan dihapus");
    }
  },
  created() {
    this.$store.dispatch("fetchItem");
  }
};
</script>

<style scoped>
.rowImage {
  max-width: 20px;
  height: auto;
}
</style>
