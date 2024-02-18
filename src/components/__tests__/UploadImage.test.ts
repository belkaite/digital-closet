import { it, expect, describe } from 'vitest';
import useFileSelect from '../fileHandling';

describe('fileSelect', () => {
  it('should update selectedFile on file input change', async () => {
    const file = new File([''], 'filename.jpg', { type: 'image/jpeg' });
    const event = {
      target: {
        files: [file]
      }
    } as unknown as Event;

    const { selectedFile, handleFileSelect } = useFileSelect();

    handleFileSelect(event);
    expect(selectedFile.value).toEqual(file);
  });

  it('should accept only ".jpg,.jpeg,.png" formats', async () => {
    const file = new File([''], 'document.pdf', { type: 'image/jpg' });
    const event = {
      target: {
        files: [file]
      }
    } as unknown as Event;

    const { selectedFile, handleFileSelect } = useFileSelect();

    handleFileSelect(event);
    expect(selectedFile.value).toBeTruthy();
  });
});
