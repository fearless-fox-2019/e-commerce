<template>
    <b-modal :id="'modal-'+modalData.id" :title="modalData.title" @ok="execute">
        <p class="my-4">{{ modalData.body }}</p>
    </b-modal>
</template>

<script>
export default {
    props: ["modalData"],
    methods: {
        execute(){
            this.$emit("execute");
        }
    }
}
</script>

<style>

</style>
