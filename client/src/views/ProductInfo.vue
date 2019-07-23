<template>

  <b-container>
    <b-card img-src="../../public/images/shoes/Air Jordan 1.jpg" img-alt="Card image" img-left class="mb-3" >
      <b-card-text>
      Air Jordan is a brand of basketball shoes, athletic, casual, and style clothing produced by Nike. It was created for former NBA player and 5 time NBA MVP Michael Jordan. The original Air Jordan sneakers were produced exclusively for Michael Jordan in early 1984, and released to the public in late 1984.
      </b-card-text>
      <b-card-footer>
        <b-button variant="primary">
          <i class="fas fa-shopping-cart">Add To Cart</i>
        </b-button>
      </b-card-footer>
    </b-card>
  </b-container>
</template>

<script>
export default {

}
</script>

<style scoped>
img {
  width: 300px;
  height: 300px;
}

i {
  color: white;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-footer {
  padding-top: 10px;
}


</style>
