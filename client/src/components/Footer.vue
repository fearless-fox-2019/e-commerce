<template>
  <div>
    <footer id="footer" class="footer align-items-center justify-content-between">
      <div class="footer__content">Muhtarom Kholis Abdullah</div>
      <div class="footer__content">&copy; 2019</div>
      <div class="footer__content">
        <span>mhtrmkholis@gmail.com</span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>
.footer {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  left: 0;
  bottom: 0;
  background-color: #fff;
  margin-top: 5em;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 0.7em 13.5em;
  font-size: 12px;
}
.footer__content {
  text-align: center;
  padding: 8px 0px;
}
#footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2.5rem;            /* Footer height */
}
</style>
