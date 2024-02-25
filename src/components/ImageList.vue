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
// watchEffect(() => {
//   store.fetchImages();
// });
</script>

<template>
  <div>
    <h2 class="py-4">Uploaded images:</h2>
    <div v-if="store.hasImages" class="image-grid flex flex-wrap justify-center gap-4">
      <div
        class="group p-4 bg-white border border-gray-200 shadow-md rounded-md"
        v-for="(image, index) in store.images"
        :key="index"
      >
        <img
          :src="image.url"
          :alt="image.name"
          class="uploaded-image w-96 h-96 object-cover bottom-0 left-0 right-0 p-5 px-4 duration-500 bg-opacity-40 transform hover:scale-105 hover:rounded-xl duration-200"
        />
        <button
          type="button"
          class="my-2 bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-400 rounded shadow"
          v-if="props.showDelete"
          @click="store.deleteImage(image.name)"
        >
          Delete
        </button>
      </div>
    </div>
    <div v-if="store.errorMessage">{{ store.errorMessage }}</div>
    <button
      type="button"
      v-if="store.canFetchMore"
      @click="store.fetchImages"
      class="mx-2 bg-black hover:bg-zinc-400 text-white py-2 px-4 my-4 border border-gray-400 rounded shadow w-36"
    >
      Load more
    </button>
    <div v-if="!store.hasImages" class=" text-center text-red-500">No images have been added yet.</div>
  </div>
</template>

<style scoped>
.image-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

/* .uploaded-image {
  max-width: 500px;
  height: auto;
} */

.load-more-button {
  margin-top: 20px;
}
</style>
