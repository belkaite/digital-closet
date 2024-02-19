import { ref, reactive } from 'vue';
import { storage } from '@/firebaseConfig';
import { ref as storageRef, uploadBytes } from 'firebase/storage';

export default function useFileSelect() {
  const selectedFile = ref<File | null>(null);
  const state = reactive({ inputKey: 0, successMessage: '', errorMessage: '' });

  const handleFileSelect = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const file = input.files[0];
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (validTypes.includes(file.type)) {
        selectedFile.value = file;
      } else {
        state.errorMessage = 'Invalid file type. Only JPG, JPEG and PNG are accepted.';
      }
    }
  };

  const uploadImage = async () => {
    if (selectedFile.value) {
      const imageRef = storageRef(storage, `images/${selectedFile.value.name}`);
      const metadata = {
        customMetadata: {
          uploadDate: Date.now().toString()
        }
      };
      try {
        await uploadBytes(imageRef, selectedFile.value, metadata);
        selectedFile.value = null;
        state.inputKey += 1;
        state.successMessage = 'Upload successful!';
      } catch (error) {
        state.errorMessage = `Upload failed: ${error}`;
      }
    }
  };

  return {
    selectedFile,
    handleFileSelect,
    state,
    uploadImage
  };
}
