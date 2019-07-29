<template>
  <el-carousel indicator-position="outside" height="450px">
    <el-carousel-item v-for="(image,i) in images" :key="i">
      <img :src="image" :alt="i">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
    data(){
        return {
            images: [
                'https://gamershideout.com.my/wp-content/uploads/2019/04/PS4-GUNDAM-BREAKER-3-BREAK-EDITION3.jpg',
                'https://a1.cdn.japantravel.com/photo/41317-179698/1440x960!/tokyo-unicorn-gundam-statue-in-odaiba-179698.jpg',
                "https://i.ytimg.com/vi/jG0B1Q7fnkU/maxresdefault.jpg",
                "https://www.tamashiinations.com/gundam_universe/images/mv_01.jpg",
                "https://www.ungeek.ph/wp-content/uploads/2019/01/mobile_suit_gundam_iron_blooded_orphans_spinoff.jpg"
            ]
        }
    }
};
</script>

<style scoped>
img{
    width: 100%;
}
</style>
