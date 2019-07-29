<template>
    <div class="my-card my-card--black mt-2 d-flex justify-content-center flex-column align-items-center" style="padding: 10px;">
        <div>
        <p>Email: {{user.email}}</p>
        <p>Address: {{user.address}}</p>
        <p>Phone: {{user.phone}}</p>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    computed: {
        ...mapState(['user'])
    },
}
</script>

<style>

</style>
