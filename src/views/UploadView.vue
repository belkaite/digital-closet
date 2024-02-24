<script setup lang="ts">
import UploadImage from '../components/UploadImage.vue';
import ImageList from '../components/ImageList.vue'
</script>

<template>
  <main>
    <h1 class="dark:bg-darkBlue dark:text-white">Upload</h1>
    <UploadImage />
    <br>
    <ImageList :showDelete="true" />
  </main>
</template>

<style>
/* This is a single-line comment */
</style>
