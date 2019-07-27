<template>
  <div class="home">
    <b-tabs type="is-boxed">
      <b-tab-item @click="console.log('trigger')" label="All Products">
        
      </b-tab-item>
      <b-tab-item @click="changeTab('invitationCard')" label="Invitation Card"></b-tab-item>
      <b-tab-item @click="changeTab('souvenir')" label="Souvenir"></b-tab-item>
      <b-tab-item @click="changeTab('hampers')" label="Hampers"></b-tab-item>
      <b-tab-item @click="changeTab('bridesmaid')" label="Bridesmaid">a</b-tab-item>
      <b-tab-item @click="changeTab('groomsman')" label="Groomsman"></b-tab-item>
      <b-tab-item @click="changeTab('partyPlanner')" label="Party Planner"></b-tab-item>
      <div>
        <div v-if="isLoading" class="lds-facebook"><div></div><div></div><div></div></div>
      </div>
    </b-tabs>
  </div>
</template>

<script>
// @ is an alias to /src
import {mapState} from 'vuex'
export default {
  name: 'home',
  data(){
    return {
      activeTab : '',
      isLoading : true
    }
  },
  components: {

  },
  methods : {
    changeTab(tabName){
      this.isLoading = true
      this.activeTab = tabName
      console.log('trigger tab ', tabName);
      this.$store.dispatch('getProducts', tabName)
      .then(() => {
        this.isLoading = false
        console.log('get data of ', tabName);
      })
      .catch(err => console.log(err))
    },
  },
  computed : {
    ...mapState(['allProducts'])
  },
  created(){
    this.isLoading = true
    this.$store.dispatch('getProducts', '')
    .then(() => {
        this.isLoading = false
        console.log('get data of allProducts');
      })
    .catch(err => console.log(err))
  }
}
</script>

<style>
.lds-facebook {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 6px;
  width: 13px;
  background: #FF2B56;
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  left: 6px;
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
  left: 26px;
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
  left: 45px;
  animation-delay: 0;
}
@keyframes lds-facebook {
  0% {
    top: 6px;
    height: 51px;
  }
  50%, 100% {
    top: 19px;
    height: 26px;
  }
}

</style>
