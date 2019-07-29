<template>
  <div class="editItem">
    {{noData}}
    <div class="nodata" v-show="noData">
      chose item
      <el-select v-model="selectplaceholder" clearable placeholder="Choose item ">
        <el-option
          v-for="(item,i) in $store.state.allItem"
          :key="i"
          :label="item.itemname"
          :value="item"
        ></el-option>
      </el-select>
    </div>
    <div class="withdatadata" v-show="!noData">
        hehehe
      <el-form>
        <form @submit.prevent="updateItem">
          <el-form-item label="Item Name" :label-position="'top'">
            <el-input autofocus="true" placeholder="Item name" v-model="selectplaceholder.itemname"></el-input>
          </el-form-item>
          <el-form-item label="Item Category" :label-position="'top'">
            <el-input placeholder="Item Category" v-model="selectplaceholder.category"></el-input>
            <span class="sepan">separate tag by coma (',')</span>
          </el-form-item>
          <el-form-item label="Item Tag" :label-position="'top'">
            <el-input placeholder="Item Tag" v-model="selectplaceholder.tags"></el-input>
            <span class="sepan">separate tag by coma (',')</span>
          </el-form-item>
          <el-form-item label="Description Item" :label-position="'top'">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8}"
              placeholder="Description here"
              v-model="selectplaceholder.description"
            ></el-input>
          </el-form-item>
          <el-form-item label="Price" :label-position="'top'">
            <div>
              <el-input placeholder="Please input" v-model="selectplaceholder.price">
                <template slot="prepend">Rp.</template>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item class="diff" label="Item Stock" :label-position="'top'">
            <el-input-number size="mini" v-model="selectplaceholder.stock"></el-input-number>
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
          <el-button type="primary" @click="updateItem" class="button">Submit</el-button>
          <input type="submit" class="hidden-button" />
        </form>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: ["editData"],
  data() {
    return {
      noData: true,
      selectplaceholder: ""
    };
  },
  methods: {
    handlePictureCardPreview(response, file, fileList) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove(response, file, fileList) {},
    handleSuccess(response, file, fileList) {
      console.log(file.raw, "ini file hasil dari upload");
      this.selectplaceholder.image = file.raw;
    },
    updateItem() {
      this.selectplaceholder.price = Number(this.selectplaceholder.price);
      this.selectplaceholder.stock = Number(this.selectplaceholder.stock);

      let formData = new FormData();
      formData.append("itemname", this.selectplaceholder.itemname);
      formData.append("description", this.selectplaceholder.description);
      formData.append("price", this.selectplaceholder.price);
      formData.append("stock", this.selectplaceholder.stock);
      formData.append("image", this.selectplaceholder.image);
      formData.append("tags", this.selectplaceholder.tags);
      formData.append("category", this.selectplaceholder.category);

    //   const loading = this.$loading({
    //     lock: true,
    //     text: "Your article is being processed...",
    //     spinner: "el-icon-loading",
    //     background: "rgba(0, 0, 0, 0.7)"
    //   });
      console.log(this.selectplaceholder.image, "inoi add foprm");
      console.log(formData, "ini form data");
      this.$store.dispatch("updateItem", {formData, id: this.selectplaceholder._id})
        .then(()=> {
            console.log('hmmmmm')
            // this.$notify({
            //     title: "Update notification",
            //     message: `Item is successfully Updated`,
            //     type: "success"
            // });
        
            // this.selectplaceholder.itemname = "";
            // this.selectplaceholder.description = "";
            // this.selectplaceholder.price = "";
            // this.selectplaceholder.stock = "";
            // this.selectplaceholder.image = "";
            // this.selectplaceholder.tags = "";
            // this.selectplaceholder.category = "";
            loading.close()
        }).catch(err=> console.log(err,'ehlah disiniii'))
    }
  },
  computed: {
    //   category(){
    //       return this.selectplaceholder.category
        // console.log(this.selectplaceholder.category)
    //   }
  },
  watch: {
    // editData: function(val) {
    //   console.log(val, "ini edit data dari watched");
    // },
    selectplaceholder: function(val) {
      console.log(this.selectplaceholder, "ini valuenya");
      if (
        this.selectplaceholder !== "" ||
        this.selectplaceholder !== undefined
      ) {
        this.noData = false;
      }
      console.log(this.noData);
    }
  },
  mounted() {
    if (this.editData == undefined) {
      this.$store.dispatch("fetchItem");
      console.log(this.editData, "ini undefined");
    } else {
      console.log(this.editData, "ini tidak undefine");
      this.selectplaceholder = this.editData;
      console.log(this.selectplaceholder, "ini yang baru");
      this.noData = false;
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
</style>
