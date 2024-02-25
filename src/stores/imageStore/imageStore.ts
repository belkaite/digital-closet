import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { storage } from '@/firebaseConfig';
import type { StorageReference } from 'firebase/storage';
import {
  ref as storageRef,
  uploadBytes,
  list,
  getDownloadURL,
  getMetadata,
  deleteObject
} from 'firebase/storage';

export const useImageStore = defineStore('images', () => {
  const selectedFile = ref<File | null>(null);
  
  type ImageType = {
    url: string;
    name: string;
    uploadDate: number;
  };
  const images = ref<ImageType[]>([]);
  const pageToken = ref<string | null>(null);
  const errorMessage = ref<string | null>(null);
  const successMessage = ref<string | null>(null);
  const hasImages = computed(() => images.value.length > 0);
  const isLoading = ref<boolean>(false);

  type ImageDetail = {
    url: string;
    name: string;
    uploadDate: number;
  };

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
    isLoading.value = true;
    try {
      const imageRef = storageRef(storage, 'images');
      const result = await list(imageRef, { maxResults: 10, pageToken: pageToken.value });
      const fetchedImages = await Promise.all(result.items.map(fetchImageDetails));

      images.value = filterAndSortImages(fetchedImages, images.value);

      pageToken.value = result.nextPageToken || null;
    } catch (error) {
      errorMessage.value = `Error fetching images: ${error}`;
    } finally {
      isLoading.value = false;
    }
  };

  const uploadImage = async () => {
    if (selectedFile.value) {
      try {
        const imageRef = storageRef(storage, `images/${selectedFile.value.name}`);
        const metadata = { customMetadata: { uploadDate: Date.now().toString() } };
        await uploadBytes(imageRef, selectedFile.value, metadata);
        successMessage.value = 'Upload successful!';
        setTimeout(() => {
          successMessage.value = '';
        }, 3000);
        selectedFile.value = null;
        fetchImages();
      } catch (error) {
        errorMessage.value = `Upload failed: ${error}`;
        setTimeout(() => {
          errorMessage.value = '';
        }, 3000);
      }
    }
  };

  const canFetchMore = computed(() => Boolean(pageToken.value));

  const deleteImage = async (imageName: string) => {
    try {
      const imageToDeleteRef = storageRef(storage, `images/${imageName}`);
      await deleteObject(imageToDeleteRef);
      images.value = images.value.filter((image) => image.name !== imageName);
    } catch (error) {
      errorMessage.value = `Error deleting image: ${error}`;
    }
  };

  return {
    selectedFile,
    images,
    pageToken,
    errorMessage,
    successMessage,
    fetchImages,
    uploadImage,
    handleFileSelect,
    canFetchMore,
    filterAndSortImages,
    deleteImage,
    hasImages,
    isLoading
  };
});

export default useImageStore;
