<script setup lang="ts">
import UploadImage from './UploadImage.vue';
import ImageList from './ImageList.vue';
</script>

<template>
  <main>
    <h1>Closet / Your digital storage of clothes</h1>
    <UploadImage />
    <br />
    <ImageList :showDelete="true" />
  </main>
</template>
