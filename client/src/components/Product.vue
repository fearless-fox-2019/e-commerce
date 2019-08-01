<template>
  <div>
    <div class="my-card cursor-pointer" style="width: 19rem">
      <div>
        <img
        src="http://viacph.dk/wp-content/uploads/2017/06/Sk%C3%A6rmbillede-2017-07-14-kl.-23.57.24.png"
        class="card-img-top"
        alt="img-product"
        style="width: 300px; height: 300px; max-width: 300px; max-height: 300px"
      />
      </div>
      <div class="card-body">
        <p
          class="card-text"
        >Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      </div>
    </div>

    <!-- Dummies -->
     <div class="my-card cursor-pointer" style="width: 19rem">
      <img
        src="http://viacph.dk/wp-content/uploads/2017/06/Sk%C3%A6rmbillede-2017-07-14-kl.-19.46.27.png"
        class="card-img-top"
        alt="img-product"
        style="width: 300px; height: 300px; max-width: 300px; max-height: 300px"
      />
      <div class="card-body">
        <p
          class="card-text"
        >Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      </div>
    </div>
     <div class="my-card cursor-pointer" style="width: 19rem">
      <img
        src="http://viacph.dk/wp-content/uploads/2017/07/EAT-115-1024x999.jpg"
        class="card-img-top"
        alt="img-product"
        style="width: 300px; height: 300px; max-width: 300px; max-height: 300px"
      />
      <div class="card-body">
        <p
          class="card-text"
        >Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.my-card {
  position: relative;
  display: inline-block;
  width: 100%;
  height: auto;
  margin-right: 1.2%;
  background: #fff;
  border-radius: 0px;
  /* margin: 2em auto 0em; */
  z-index: 0;
  /* padding: 13px 23px; */
  margin-left: 35px;
  margin-right: 35px;
  margin-bottom: 50px
}

.my-card:hover {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
}

</style>
