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
    <h3>Uploaded images:</h3>
    <div class="image-grid">
      <div class="group p-4 border border-gray-200 rounded-md" v-for="(image, index) in store.images" :key="index">
        <img :src="image.url" :alt="image.name" class="uploaded-image bottom-0 left-0 right-0 p-2 px-4 duration-500 bg-black bg-opacity-40" />
        <button type="button" v-if="props.showDelete" @click="store.deleteImage(image.name)">Delete</button>
      </div>
    </div>
    <div v-if="store.errorMessage">{{ store.errorMessage }}</div>
    <button
      type="button"
      v-if="store.canFetchMore"
      @click="store.fetchImages"
      class="load-more-button"
    >
      Load more
    </button>
  </div>
</template>

<style scoped>
.image-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.uploaded-image {
  max-width: 500px;
  height: auto;
}

.load-more-button {
  margin-top: 20px;
}
</style>
