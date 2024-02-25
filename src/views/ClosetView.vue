<script setup lang="ts">
import UploadImage from '../components/UploadImage.vue';
import ImageList from '../components/ImageList.vue'
</script>

<template>
  <main>
    <h1>Closet / Your digital storage of clothes </h1>
    <UploadImage />
    <br>
    <ImageList :showDelete="true" />
  </main>
</template>

<style scoped>
h1 {
  font-weight: bold;
  font-size: 25px;
}
</style>
