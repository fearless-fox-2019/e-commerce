<template>
  <b-row class="allProductsRow">
    <b-col cols="4" class="productsCard">
        <b-card
          title="Card Title"
          img-src="../../public/images/shoes/Adidas Ultraboost.jpg"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2"
        >
          <b-card-text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </b-card-text>

          <b-button href="#" variant="primary">Go somewhere</b-button>
        </b-card>
      </b-col>
      <b-col cols="4">
            <b-card
          title="Card Title"
          img-src="../../public/images/shoes/Converse Classic.jpg"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2"
        >
          <b-card-text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </b-card-text>

          <b-button href="#" variant="primary">Go somewhere</b-button>
        </b-card>
      </b-col>
        <b-col cols="4">
            <b-card
            title="Card Title"
            img-src="../../public/images/shoes/NMD R1.jpg"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <b-card-text>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </b-card-text>

            <b-button href="#" variant="primary">Go somewhere</b-button>
          </b-card>
        </b-col>
        <b-col cols="4">
            <b-card
          title="Card Title"
          img-src="../../public/images/shoes/Yeezy.jpg"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2"
        >
          <b-card-text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </b-card-text>

          <b-button href="#" variant="primary">Go somewhere</b-button>
        </b-card>
      </b-col>
  </b-row>
</template>

<script>
export default {

}
</script>

<style scoped>
.allProductsRow {
  margin-top: 20px;
}

.card-body {
  background-color: #e0e0e0;
}

.card:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}



</style>
