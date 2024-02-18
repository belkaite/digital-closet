import { ref } from 'vue';

export default function useFileSelect() {
  const selectedFile = ref<File | null>(null);

  const handleFileSelect = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const file = input.files[0];
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (validTypes.includes(file.type)) {
        selectedFile.value = file;
      } else {
        // Handle invalid file type (e.g., show an error message)
        console.error('Invalid file type. Only JPG and PNG are accepted.');
      }
    }
  };

  return {
    selectedFile,
    handleFileSelect
  };
}
