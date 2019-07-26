<template>
    <div>
        <navbarCust></navbarCust>
        <div class="row">
            <router-view></router-view>
        </div>
        <footerPage></footerPage>
    </div>
</template>

<script>
import navbarCust from '@/components/navbarCust.vue'
import footerPage from '@/components/footer.vue'

export default {
    name: 'catalog',
    components:{
        navbarCust,
        footerPage
    }
}
</script>

<style>

</style>
