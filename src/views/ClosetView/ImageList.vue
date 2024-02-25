<script setup lang="ts">
import { useImageStore } from '@/stores/imageStore';
import { onMounted } from 'vue';

const store = useImageStore();

const props = defineProps({
  showDelete: {
    type: Boolean,
    default: true
  }
});

onMounted(store.fetchImages);

</script>

<template>
  <div>
    <h2 class="py-4">Uploaded images:</h2>
    <div v-if="store.isLoading" class="flex justify-center items-center">
      <svg class="animate-spin -ml-1 mr-3 h-10 w-10 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>Loading...</span>
    </div>
    <div v-else-if="store.hasImages" class="image-grid flex flex-wrap justify-center gap-4">
      <div class="group p-4 bg-white border border-gray-200 shadow-md rounded-md" v-for="(image, index) in store.images" :key="index">
        <img :src="image.url" :alt="image.name" class="uploaded-image w-32 h-32 object-cover sm:w-96 sm:h-96 bottom-0 left-0 right-0 p-5 px-4 duration-500 bg-opacity-40 transform hover:scale-105 hover:rounded-xl duration-200" />
        <button type="button" class="my-2 bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-400 rounded shadow" v-if="props.showDelete" @click="store.deleteImage(image.name)">
          Delete
        </button>
      </div>
    </div>
    <div v-if="store.errorMessage">{{ store.errorMessage }}</div>
    <button type="button" v-if="store.canFetchMore" @click="store.fetchImages" class="mx-2 my-2 bg-black hover:bg-zinc-400 text-white py-2 px-4 my-4 border border-gray-400 rounded shadow w-36">
      Load more
    </button>
    <div v-if="!store.hasImages && !store.isLoading" class="text-center text-red-500">No images have been added yet.</div>
  </div>
</template>

<style scoped>
.image-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

</style>
