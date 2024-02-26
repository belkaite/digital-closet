import { it, expect, describe, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useImageStore } from '../imageStore';

describe('handleFileSelect', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should update selectedFile on file input change', async () => {
    const file = new File([''], 'filename.jpg', { type: 'image/jpeg' });
    const event = {
      target: {
        files: [file]
      }
    } as unknown as Event;

    const store = useImageStore();
    store.handleFileSelect(event);

    expect(store.selectedFile).toEqual(file);
  });

  it('should accept only ".jpg,.jpeg,.png" formats', async () => {
    const file = new File([''], 'shirt.jpg', { type: 'image/jpg' });
    const event = {
      target: {
        files: [file]
      }
    } as unknown as Event;

    const store = useImageStore();
    store.handleFileSelect(event);

    expect(store.selectedFile).toBeTruthy();
  });

  it('should show error when any other formats are uploaded', async () => {
    const file = new File([''], 'document.pdf', { type: 'application/pdf' });
    const event = {
      target: {
        files: [file]
      }
    } as unknown as Event;

    const store = useImageStore();
    store.handleFileSelect(event);

    expect(store.errorMessage).toMatch(/invalid file type/i);
  });
});
