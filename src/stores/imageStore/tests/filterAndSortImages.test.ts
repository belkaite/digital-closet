import { it, expect, describe, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useImageStore} from '../imageStore';

describe('filterAndSortImages', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should filter out duplicate images and sort by upload date descending', () => {
    const existingImages = [
      { url: 'url1', name: 'name1', uploadDate: 1000 },
      { url: 'url2', name: 'name2', uploadDate: 1001 }
    ];

    const fetchedImages = [
      { url: 'url3', name: 'name3', uploadDate: 1002 },
      { url: 'url2', name: 'name2', uploadDate: 1001 }
    ];
    const store = useImageStore();
    const result = store.filterAndSortImages(fetchedImages, existingImages);

    expect(result).toHaveLength(3);
    expect(result[0].uploadDate).toBeGreaterThan(result[1].uploadDate);
    expect(result[0].name).toBe('name3');
  });
});
