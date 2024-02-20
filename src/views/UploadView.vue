<script setup lang="ts">
import UploadImage from '../components/UploadImage.vue';
import ImageList from '../components/ImageList.vue'
</script>

<template>
  <main>
    <h1>Upload</h1>
    <UploadImage />
    <br>
    <ImageList :showDelete="true" />
  </main>
</template>

<style>
h1 {
  color: black;
}
</style>
