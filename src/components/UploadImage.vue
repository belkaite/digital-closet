<script setup lang="ts">
import { ref } from 'vue';
import { getStorage, ref as firebaseStorageRef, uploadBytes } from 'firebase/storage';


const storage = getStorage();
const selectedFile = ref<File | null>(null);


const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    [selectedFile.value] = input.files;
  }
};


const uploadImage = async () => {
  if (selectedFile.value) {
    const imageRef = firebaseStorageRef(storage, `images/${selectedFile.value.name}`);
    try {
      console.log('Starting upload...');
      const snapshot = await uploadBytes(imageRef, selectedFile.value);
      console.log('Upload successful!', snapshot);
    } catch (error) {
      console.error('Upload failed', error);
    }
  } else {
    console.log('No file selected');
  }
};
</script>

<template>
  <div>
    <label for="fileInput">Upload Image</label>
    <input type="file" id="fileInput" @change="handleFileSelect" />
    <button type="button" @click="uploadImage">Upload Image</button>
  </div>
</template>

<style scoped>
/* styles */
</style>
