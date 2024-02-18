<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { getStorage, ref as firebaseRef, list, getDownloadURL } from 'firebase/storage';

const imagesListRef = firebaseRef(getStorage(), 'images');
const imageUrls = ref([]);
const pageToken = ref(null);

const fetchImages = async () => {
  try {
    const result = await list(imagesListRef, { maxResults: 10, pageToken: pageToken.value });
    const urlPromises = result.items.map((itemRef) => getDownloadURL(itemRef));

    const urls = await Promise.all(urlPromises);
    imageUrls.value.push(...urls);

    pageToken.value = result.nextPageToken;
  } catch (error) {
    console.error('Error fetching images:', error);
  }
};

const canFetchMore = computed(() => !!pageToken.value);

onMounted(fetchImages);
</script>

<template>
  <div>
    <h3>Uploaded images:</h3>
    <div class="image-grid">
      <div v-for="(url, index) in imageUrls" :key="index">
        <img :src="url" :alt="`Uploaded image ${index}`" class="uploaded-image" />
      </div>
    </div>
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
