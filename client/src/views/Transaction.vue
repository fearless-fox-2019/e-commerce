<template>
    <div>
        <navbarAdmin></navbarAdmin>
        <div class="row">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import navbarAdmin from '@/components/navbarAdmin.vue'


export default {
    name:'transaction',
    components:{
        navbarAdmin,
        
    }
}
</script>

<style>

</style>
