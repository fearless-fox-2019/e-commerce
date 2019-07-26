<template>
  <div>
    <navbarLanding></navbarLanding>
    <div class="row">
      <div class="col-sm-6">
          <div id="demo" class="carousel slide" data-ride="carousel" style="margin-top: 4%">

            <!-- Indicators -->
            <ul class="carousel-indicators">
              <li data-target="#demo" data-slide-to="0" class="active"></li>
              <li data-target="#demo" data-slide-to="1"></li>
              <li data-target="#demo" data-slide-to="2"></li>
              <li data-target="#demo" data-slide-to="3"></li>
            </ul>
            
            <!-- The slideshow -->
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="@/assets/chcoco1.png" alt="Choco" width="500" height="500">
              </div>
              <div class="carousel-item">
                <img src="@/assets/StrawMFSquare.png" alt="Stwaberry Cake" width="500" height="500">
              </div>
              <div class="carousel-item">
                <img src="@/assets/ValerieChocMousse.png" alt="Oreo Ice Creame Cake" width="500" height="500">
              </div>
              <div class="carousel-item">
                <img src="@/assets/Obsession.png" alt="White Choco" width="500" height="500">
              </div>
            </div>
            
            <!-- Left and right controls -->
            <a class="carousel-control-prev" href="#demo" data-slide="prev">
              <span class="carousel-control-prev-icon"></span>
            </a>
            <a class="carousel-control-next" href="#demo" data-slide="next">
              <span class="carousel-control-next-icon"></span>
            </a>
          </div>
        </div>
        <div class="col-sm-5 text-center" style="margin-left:5%">
            <br /><h3 class="text-success">Clave Pattiserie</h3><hr>
            <h5 style="color: darkgreen">Special and Premium Cakes</h5><br />
            <div class="card" style="border: transparent">
                <div class="card-body">
                    <p class="card-text" style="text-align: left">
                       Clave Pattiserie is a delightful cakes.
                       Taste, quality, and sincerity are the primary focus of every creation.
                    </p>
                    <p class="card-text" style="text-align: left">
                        Carefully selected ingredients, balanced texture,
                        flavor and presentation goes into baking every single delicious cake.
                    </p>
                    <p class="card-text" style="text-align: left">
                        The finest ingredients in combination with perfected techniques give birth to
                        products with lifelong popularity that are loved by many.
                    </p>
                </div>
              </div>
        </div>
        
    </div>

    
  </div>
  
</template>

<script>
import navbarLanding from '@/components/navbarLanding.vue'

export default {
  name: 'landing',
  components:{
    navbarLanding
  },
  created(){
    if(localStorage.token){
      if(localStorage.role === 'admin'){
        this.$router.push('/home')
      }
      else if(localStorage.role === 'customer'){
        this.$router.push('/catalog/chocolate-cake')
      }
    }
  }
}
</script>

<style scoped>

</style>
