<template>
  <div class="detail-item" style="margin-top: 30px; margin-right:30px;">
    <b-container>
      <b-row>
        <b-col cols="6" class="image-detail">
          <img :src="prod.image" alt="productimage" width="250px" />
          <h4>{{prod.productname}}</h4>
        </b-col>
        <b-col cols="6" class="detail-products">
          <h2>{{prod.productname}}</h2>
          <h4>{{price}}</h4>
          <span>Available : {{prod.qty}}</span>
          <br />
          <label for>Description :</label>
          <br />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum soluta harum natus quasi recusandae exercitationem. Rem illo ab nam porro nobis dicta optio, sequi veritatis fuga expedita molestiae hic qui.</p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "../config/axios.js";
import { convertIdr } from "../helpers/convertIdr.js";

export default {
  data() {
    return {
      prod: {},
      price: ""
    };
  },
  created() {
    console.log(this.$route.params.id, "ini params<<<<<");
    let id = this.$route.params.id;
    // console.log(, "test");

    axios({
      method: `GET`,
      url: `/products/${id}`
    })
      .then(({ data }) => {
        console.log(data);
        this.price = convertIdr(data.price);
        this.prod = data;
      })
      .catch(err => {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: "Something went wrong!" + JSON.stringify(err.message)
        });
      });
  }
};
</script>

<style scoped>
.image-detail {
  /* border : 1px solid black */
}
.detail-products {
  border: 1px solid black;
}
</style>
