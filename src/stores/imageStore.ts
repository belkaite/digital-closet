import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { storage } from '@/firebaseConfig';
import type { StorageReference } from 'firebase/storage';
import {
  ref as storageRef,
  uploadBytes,
  list,
  getDownloadURL,
  getMetadata
} from 'firebase/storage';

export const useImageStore = defineStore('images', () => {
  const selectedFile = ref<File | null>(null);
  const images = ref<Array<{ url: string; name: string; uploadDate: number }>>([]);
  const pageToken = ref<string | null>(null);
  const errorMessage = ref<string | null>(null);
  const successMessage = ref<string | null>(null);

  const handleFileSelect = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const file = input.files[0];
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (validTypes.includes(file.type)) {
        selectedFile.value = file;
      } else {
        errorMessage.value = 'Invalid file type. Only JPG, JPEG and PNG are accepted.';
      }
    }
  };

  type ImageDetail = {
    url: string;
    name: string;
    uploadDate: number;
  };

  async function fetchImageDetails(itemRef: StorageReference) {
    const url = await getDownloadURL(itemRef);
    const metadata = await getMetadata(itemRef);
    const uploadDate = metadata.customMetadata?.uploadDate
      ? parseInt(metadata.customMetadata.uploadDate, 10)
      : 0;
    return { url, name: itemRef.name, uploadDate };
  }

  function filterAndSortImages(fetchedImages: ImageDetail[], existingImages: ImageDetail[]) {
    const uniqueNewImages = fetchedImages.filter(
      (fetchedImage) =>
        !existingImages.some(
          (existingImage) => existingImage.uploadDate === fetchedImage.uploadDate
        )
    );
    return [...existingImages, ...uniqueNewImages].sort((a, b) => b.uploadDate - a.uploadDate);
  }

  const fetchImages = async () => {
    try {
      const imageRef = storageRef(storage, 'images');
      const result = await list(imageRef, { maxResults: 10, pageToken: pageToken.value });
      const fetchedImages = await Promise.all(result.items.map(fetchImageDetails));

      images.value = filterAndSortImages(fetchedImages, images.value);

      pageToken.value = result.nextPageToken || null;
    } catch (error) {
      errorMessage.value = `Error fetching images: ${error}`;
    }
  };

  const uploadImage = async () => {
    if (selectedFile.value) {
      try {
        const imageRef = storageRef(storage, `images/${selectedFile.value.name}`);
        const metadata = { customMetadata: { uploadDate: Date.now().toString() } };
        await uploadBytes(imageRef, selectedFile.value, metadata);
        successMessage.value = 'Upload successful!';
        selectedFile.value = null;
        fetchImages();
      } catch (error) {
        errorMessage.value = `Upload failed: ${error}`;
      }
    }
  };

  const canFetchMore = computed(() => Boolean(pageToken.value));

  return {
    selectedFile,
    images,
    pageToken,
    errorMessage,
    successMessage,
    fetchImages,
    uploadImage,
    handleFileSelect,
    canFetchMore
  };
});

export default useImageStore;
