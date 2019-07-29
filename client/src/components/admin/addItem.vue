<template>
  <div class="addItem">
    <el-form>
      <form @submit.prevent="addNewItem">
        <el-form-item label="Item Name" :label-position="'top'">
          <el-input autofocus="true" placeholder="Item name" v-model="addForm.itemname"></el-input>
        </el-form-item>
        <el-form-item label="Item Category" :label-position="'top'">
          <el-input placeholder="Item Category" v-model="addForm.category"></el-input>
          <span class="sepan">separate tag by coma (',')</span>
        </el-form-item>
        <el-form-item label="Item Tag" :label-position="'top'">
          <el-input placeholder="Item Tag" v-model="addForm.tags"></el-input>
          <span class="sepan">separate tag by coma (',')</span>
        </el-form-item>
        <el-form-item label="Description Item" :label-position="'top'">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 8}"
            placeholder="Description here"
            v-model="addForm.description"
          ></el-input>
        </el-form-item>
        <el-form-item label="Price" :label-position="'top'">
          <div>
            <el-input placeholder="Please input" v-model="addForm.price">
              <template slot="prepend">Rp.</template>
            </el-input>
          </div>
        </el-form-item>
        <el-form-item class="diff" label="Item Stock" :label-position="'top'">
          <el-input-number size="mini" v-model="addForm.stock"></el-input-number>
        </el-form-item>
        <el-form-item class="diff" label="Item Image" :label-position="'top'">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-button type="primary" @click="addNewItem" class="button">Submit</el-button>
        <input type="submit" class="hidden-button" />
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </form>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addForm: {
        itemname: "",
        description: "",
        price: 0,
        stock: 0,
        image: "",
        tags: "",
        category: ""
      },
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    handlePictureCardPreview(response, file, fileList) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove(response, file, fileList) {},
    handleSuccess(response, file, fileList) {
      console.log(file, "ini file hasil dari upload");
      this.addForm.image = file.raw;
    },
    addNewItem() {
      this.addForm.price = Number(this.addForm.price);
      this.addForm.stock = Number(this.addForm.stock);

      let formData = new FormData();
      formData.append("itemname", this.addForm.itemname);
      formData.append("description", this.addForm.description);
      formData.append("price", this.addForm.price);
      formData.append("stock", this.addForm.stock);
      formData.append("image", this.addForm.image);
      formData.append("tags", this.addForm.tags);
      formData.append("category", this.addForm.category);

      // const loading = this.$loading({
      //   lock: true,
      //   text: "Your article is being processed...",
      //   spinner: "el-icon-loading",
      //   background: "rgba(0, 0, 0, 0.7)"
      // });
      console.log(this.addForm, "inoi add foprm");
      console.log(formData, "ini form data");
      this.$store.dispatch("addNewItem", formData);
      //   this.$message(`Item is successfully deleted`)
      // this.$notify({
      //   title: "Delete notification",
      //   message: `Item is successfully deleted`,
      //   type: "success"
      // });

      this.addForm.itemname = "";
      this.addForm.description = "";
      this.addForm.price = "";
      this.addForm.stock = "";
      this.addForm.image = "";
      this.addForm.tags = "";
      this.addForm.category = "";
      loading.close()
    }
  }
};
</script>

<style scoped>
.hidden-button {
  visibility: hidden;
  width: 0;
  height: 0;
  padding: 0;
  border: 0;
}
.el-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.el-form-item {
  width: 600px;
  margin: 9px 0px;
}
.el-form-item__label {
  font-size: 20px;
  font-weight: 500;
  float: center;
}
.diff {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.button {
  margin: 10px 0px;
}
.sepan {
  align-items: flex-start;
}
</style>
