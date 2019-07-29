<template>
  <div>
    <Header></Header>
    <Card></Card>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Card from '@/components/Pagination.vue'
export default {
  name: 'home',
  components: {
    Header,
    Card
  }
}
</script>
