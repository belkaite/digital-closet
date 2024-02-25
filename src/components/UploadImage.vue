<script setup lang="ts">
import { useImageStore } from '@/stores/imageStore';

const store = useImageStore();
</script>

<template>
  <div>
    <label class="block mb-2 text-gray-500" for="default_size">Upload Image</label>
    <input
      type="file"
      class="block w-full mb-5 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none file:bg-black file:hover:bg-zinc-400 file:text-white file:py-2 file:px-4 file:border file:border-gray-400 file:rounded file:shadow"
      id="default_size"
      accept=".jpg,.jpeg,.png"
      @change="store.handleFileSelect"
    />
    <button
      class="mx-2 bg-red-800 hover:bg-red-500 text-white py-2 px-4 my-4 border border-gray-400 rounded shadow w-36"
      type="button"
      @click="store.uploadImage"
    >
      Upload Image
    </button>
    <div v-if="store.successMessage" class="text-red-500">{{ store.successMessage }}</div>
    <div v-if="store.errorMessage" class="text-red-500">{{ store.errorMessage }}</div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: bold;
  font-size: 25px;
}
</style>
