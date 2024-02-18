<script setup lang="ts">
import useFileSelect from './useFileUpload';

const { handleFileSelect, state, uploadImage } = useFileSelect();
</script>

<template>
  <div>
    <label for="fileInput">Upload Image</label>
    <input
      type="file"
      accept=".jpg,.jpeg,.png"
      id="fileInput"
      :key="state.inputKey"
      @change="handleFileSelect"
    />
    <button type="button" @click="uploadImage">Upload Image</button>
    <div v-if="state.successMessage">{{ state.successMessage }}</div>
    <div v-if="state.errorMessage">{{ state.errorMessage }}</div>
  </div>
</template>

<style scoped>
/* styles */
</style>
