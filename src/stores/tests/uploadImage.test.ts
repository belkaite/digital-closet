import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { uploadBytes } from 'firebase/storage';
import { useImageStore } from '../imageStore';

vi.mock('firebase/storage', async () => {
  const storage = await vi.importActual('firebase/storage');

  return {
    ...storage,
    uploadBytes: vi.fn(() => Promise.resolve())
  };
});

describe('uploadImage', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should upload an image with a success message', async () => {
    const store = useImageStore();
    const mockFile = new File(['image'], 'test-image.jpg', { type: 'image/jpeg' });
    store.selectedFile = mockFile;

    await store.uploadImage();

 
    expect(uploadBytes).toHaveBeenCalled();
    expect(store.successMessage).toMatch(/success/i);
  });
});
