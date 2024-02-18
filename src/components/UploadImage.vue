<script setup lang="ts">
import { reactive } from 'vue';
import { storage } from '@/firebaseConfig';
import { ref as storageRef, uploadBytes } from 'firebase/storage';
import useFileSelect from './fileHandling';

const { selectedFile, handleFileSelect } = useFileSelect();
const state = reactive({ inputKey: 0, successMessage: '', errorMessage: '' });

const uploadImage = async () => {
  if (selectedFile.value) {
    const imageRef = storageRef(storage, `images/${selectedFile.value.name}`);
    console.log(selectedFile.value);
    try {
      await uploadBytes(imageRef, selectedFile.value);
      selectedFile.value = null;
      state.inputKey += 1;
      state.successMessage = 'Upload successful!';
    } catch (error) {
      state.errorMessage = `Upload failed: ${error}`;
    }
  }
};
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
