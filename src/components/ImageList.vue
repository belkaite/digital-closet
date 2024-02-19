<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { getStorage, ref as firebaseRef, list, getDownloadURL } from 'firebase/storage';

const imagesListRef = firebaseRef(getStorage(), 'images');
type ImageInfo = {
  url: string;
  name: string;
};

const images = ref<ImageInfo[]>([]);
const pageToken = ref<string | undefined>();
const errorMessage = ref('');

const fetchImages = async () => {
  try {
    const result = await list(imagesListRef, { maxResults: 10, pageToken: pageToken.value });
    const imagePromises = result.items.map(async (itemRef) => ({
      url: await getDownloadURL(itemRef),
      name: itemRef.name
    }));
    const fetchedImages = await Promise.all(imagePromises);
    images.value.push(...fetchedImages);
    pageToken.value = result.nextPageToken;
  } catch (error) {
    errorMessage.value = `Error fetching images: ${error}`;
  }
};

const canFetchMore = computed(() => Boolean(pageToken.value));

onMounted(fetchImages);
</script>

<template>
  <div>
    <h3>Uploaded images:</h3>
    <div class="image-grid">
      <div v-for="(image, index) in images" :key="index">
        <img :src="image.url" :alt="image.name" class="uploaded-image" />
      </div>
    </div>
    <div v-if="errorMessage"> {{ errorMessage }}</div>
    <button type="button" v-if="canFetchMore" @click="fetchImages" class="load-more-button">
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
