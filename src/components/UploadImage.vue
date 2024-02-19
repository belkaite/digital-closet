<script setup lang="ts">
import { useImageStore } from '@/stores/imageStore';

const store = useImageStore();

</script>

<template>
  <div>
    <label for="fileInput">Upload Image</label>
    <input
      type="file"
      accept=".jpg,.jpeg,.png"
      id="fileInput"
      @change="store.handleFileSelect"
    />
    <button type="button" @click="store.uploadImage">Upload Image</button>
    <div v-if="store.successMessage">{{ store.successMessage }}</div>
    <div v-if="store.errorMessage">{{ store.errorMessage }}</div>
  </div>
</template>

<style scoped>
/* styles */
</style>
