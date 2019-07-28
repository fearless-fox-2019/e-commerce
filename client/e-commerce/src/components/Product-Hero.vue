<template>
  <div class="hero">
    <div class="hero-text">
      <h1>Simpel nan Trendy</h1>
      <h3>Furniture Menarik Dengan Harga Terjangkau</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hero',
};
</script>

<style>

.hero {
  width: 100vw;
  height: 60vh;
  background:
    linear-gradient(
    rgba(121, 87, 213,0.15)
    rgba(121, 87, 213, 0.4)
    ),
    url("../assets/images/hero3.jpg");
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat
}

.hero h1 {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-weight: 600;
  font-size: 48px;
  line-height: 48px;
  color: #fff;
  text-align: end;
}

.hero h3 {
  margin-top: 5%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-weight: 600;
  font-size: 26;
  line-height: 28px;
  color: #fff;
  text-align: end;
}

.hero-text {
  padding: 2.5%;
  width : 35vw;
  background-color: #7957d5;
  margin-top: 15%;
  margin-left : 5%;
}

</style>
