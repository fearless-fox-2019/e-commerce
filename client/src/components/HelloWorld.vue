<template>
  <div class="hello">
   <header>
    <!-- free shipping -->
    <div class="promotions text-center py-2 mb-5 text-white">
        <span>
            <span class="text-uppercase font-weight-bold">Free Shipping</span> on orders of $100 or more
        </span>
    </div>
    <!-- end promo -->

    <!-- start image carousel -->
    <div class="container">
        <div class="carousel slide" id="carousel-indicators" data-ride="carousel">
            <ol class="carousel-indicators">
                <li class="active" data-target="#carousel-indicators" data-slide-to="0"></li>
                <li  data-target="#carousel-indicators" data-slide-to="1"></li>
                <li  data-target="#carousel-indicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <a>
                        <img class="img-fluid d-md-none" src="../../public/images/carousel/carousel-img-1-mobile.jpeg">
                        <img class="img-fluid d-none d-md-block" src="../../public/images/carousel/carousel-img-1.jpeg">
                    </a>
                </div>

                <div class="carousel-item">
                    <a >
                        <img class="img-fluid d-md-none" src="../../public/images/carousel/carousel-img-2-mobile.jpg">
                        <img class="img-fluid d-none d-md-block" src="../../public/images/carousel/carousel-img-2.jpg">
                    </a>
                </div>

                    <div class="carousel-item">
                        <a >
                            <img class="img-fluid d-md-none" src="images/carousel/carousel-img-3-mobile.jpeg">
                            <img class="img-fluid d-none d-md-block" src="images/carousel/carousel-img-3.jpeg">
                        </a>
                    </div>
            </div>
            <a class="carousel-control-prev" href="#carousel-indicators" role="button" data-slide="prev">
            <i class="fal fa-chevron-left text-clipped"></i>
        </a>
        <a class="carousel-control-next" href="#carousel-indicators" role="button" data-slide="next">
                <i class="fal fa-chevron-right text-clipped"></i>
        </a>
        </div>
    </div>
    <!-- end image carousel -->

</header>
<!-- end header -->

<!-- brands -->
<section class="featured-brands">
    <div class="container">
        <div class="row align-items-center text-center">
            <div class="col-12 col-sm-6 col-md-2 mb-5">
                <a href="/shoes/nike">
                    <img src="images/brands/nike.svg" alt="">
                </a>
            </div>
            <div class="col-12 col-sm-6 col-md-2 mb-5">
                <a href="/shoes/Air Jordan">
                    <img src="images/brands/jordan.svg" alt="">
                </a>
            </div>
            <div class="col-12 col-sm-6 col-md-2 mb-5">
                <a href="#">
                    <img src="images/brands/puma.svg" alt="">
                </a>
            </div>
            <div class="col-12 col-sm-6 col-md-2 mb-5">
                <a href="#">
                    <img src="images/brands/under-armour.svg" alt="">
                </a>
            </div>
            <div class="col-12 col-sm-6 col-md-2 mb-5">
                <a href="#">
                    <img src="images/brands/vans.svg" alt="">
                </a>
            </div>
            <div class="col-12 col-sm-6 col-md-2 mb-5">
                <a href="/shoes/adidas">
                    <img src="images/brands/adidas.svg" alt="">
                </a>
            </div>
        </div>
    </div>
</section>
<!-- end brands -->

<!-- collections-->

<section class="arrivals">
    <div class="container">
        <div class="section-heading text-center mb-5">
            <h1 class="text-clipped text-uppercase">
                Our new Collections
            </h1>
            <p class="text-secondary">Shop our new collections!</p>
        </div>

            <div class="row text-center">
                    <div class="col-12 col-sm-6 col-md-3">
                        <div class="new-arrival-img mb-3">
                            <img src="images/shoes/shoe2.jpg" alt="">
                        </div>
                        <a href="#">
                            <span class="text-uppercase font-weight-bold">Nike Air Max</span>
                            <br>
                            <span>Shop Now</span>
                        </a>
                    </div>
                        <div class="col-12 col-sm-6 col-md-3">
                            <div class="new-arrival-img mb-3">
                                <img src="images/shoes/shoe3.jpg" alt="">
                            </div>
                            <a href="#">
                                <span class="text-uppercase font-weight-bold">Nike Air Max</span>
                                <br>
                                <span>Shop Now</span>
                            </a>
                        </div>
                            <div class="col-12 col-sm-6 col-md-3">
                                <div class="new-arrival-img mb-3">
                                    <img src="images/shoes/shoe4.jpg" alt="">
                                </div>
                                <a href="#">
                                    <span class="text-uppercase font-weight-bold">Nike Air Max</span>
                                    <br>
                                    <span>Shop Now</span>
                                </a>
                            </div>
                                <div class="col-12 col-sm-6 col-md-3">
                                    <div class="new-arrival-img mb-3">
                                        <img src="images/shoes/shoe5.jpg" alt="">
                                    </div>
                                    <a href="#">
                                        <span class="text-uppercase font-weight-bold">Nike Air Max</span>
                                        <br>
                                        <span>Shop Now</span>
                                    </a>
                                </div>
              </div>
    </div>
</section>

<!-- end collections-->

<!-- services -->

<section class="our-services">
    <div class="container">
        <div class="row text-center">
            <div class="col-12 col-sm-6 col-md-3 mb-5">
                <div class="our-services-icon d-flex mb-3 mx-auto">
                    <i class="fal fa-shipping-fast text-clipped m-auto">
                    </i>
                </div>
                <div class="our-services-description">
                   <h5 class="text-uppercase font-weight-bold">Free worldwide Shipping!</h5>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-3 mb-5">
                    <div class="our-services-icon d-flex mb-3 mx-auto">
                        <i class="fal fa-sync text-clipped m-auto">
                        </i>
                    </div>
                    <div class="our-services-description font-weight-bold">
                       <h5 class="text-uppercase font-weight-bold">Money back guarantee!</h5>
                       <p>We return money within 30 days!</p>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-md-3 mb-5">
                        <div class="our-services-icon d-flex mb-3 mx-auto">
                            <i class="fal fa-headset text-clipped m-auto">
                            </i>
                        </div>
                        <div class="our-services-description font-weight-bold">
                           <h5 class="text-uppercase font-weight-bold">Customer service</h5>
                           <p>24/7 customer support bro</p>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6 col-md-3 mb-5">
                            <div class="our-services-icon d-flex mb-3 mx-auto">
                                <i class="fal fa-credit-card text-clipped m-auto">
                                </i>
                            </div>
                            <div class="our-services-description font-weight-bold">
                               <h5 class="text-uppercase font-weight-bold">Secure online payments</h5>
                               <p>easy and secure online payments</p>
                            </div>
                        </div>
        </div>
    </div>
</section>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
