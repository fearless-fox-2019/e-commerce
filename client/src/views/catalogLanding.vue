<template>
    <div>
        <navbarLanding></navbarLanding>
        <div class="row">
            <div class="col-sm-12">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import navbarLanding from '@/components/navbarLanding.vue'

export default {
    name: 'catalog',
    components:{
        navbarLanding,
    },
    
}
</script>

<style>

</style>
