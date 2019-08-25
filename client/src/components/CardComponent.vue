<template>
  <div class="card" style="margin-right:5px; margin-left:5px; width:300px">
    <div class="card-image">
      <figure class="image">
        <img
          :src="(imageUrl) ? imageUrl : 'https://bulma.io/images/placeholders/256x256.png'"
          alt="Placeholder image"
        />
      </figure>
    </div>
    <div class="card-content">
      <div class="media-content">
        <p class="title">
          <strong>{{ name }}</strong>
        </p>
        <br />
        <p class="subtitle">
          Price : Berry
          <money-format
            :value="price"
            :subunit-value="true"
            :hide-subunits="true"
          ></money-format>
        </p>
      </div>
    </div>

    <div class="content">
      <time datetime="2016-1-1">Posted : {{ created | moment("dddd, MMMM Do YYYY") }}</time>
      <div class="column">
        <b-button
          style="width:200px"
          v-if="$store.state.isLogin"
          @click.prevent="detail(id)"
        >Product Detail</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import MoneyFormat from 'vue-money-format'
export default {
  name: 'CardComponent',
  components: {
    'money-format': MoneyFormat
  },
  props: ['imageUrl', 'name', 'price', 'created', 'id'],
  methods: {
    detail (id) {
      this.$router.push(`/Product/${id}`)
    }
  }
}
</script>

<style>
figure.image {
  width: 300px;
  height: 300px;
}

figure.image img {
  width: auto;
  height: 300px;
  object-fit: cover;
}
</style>
