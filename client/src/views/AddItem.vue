<template>
    <div>   
        <navbarAdmin></navbarAdmin>
        <div class="row">
            <router-view></router-view>
        </div>
        <footerPage></footerPage>
    </div>
</template>

<script>
import navbarAdmin from '@/components/navbarAdmin.vue'
import formAdd from '@/components/formAdd.vue'
import footerPage from '@/components/footer.vue'

export default {
    name: 'addItem-page',
    components:{
        navbarAdmin,
        formAdd,
        footerPage
    }
}
</script>

<style>

</style>
