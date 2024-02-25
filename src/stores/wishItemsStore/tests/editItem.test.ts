import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useWishListStore } from '../wishItemsStore';

describe('editItem', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should update the right item', () => {
    const store = useWishListStore();

    store.wishList = [
      {
        id: '1',
        name: 'skirt',
        price: '20',
        url: 'something.com',
        creationDate: '2024-01-12',
        isPurchased: false
      },
      {
        id: '2',
        name: 'jeans',
        price: '50',
        url: 'something.com',
        creationDate: '2024-01-14',
        isPurchased: false
      }
    ];

    const editedItem = {
      id: '1',
      name: 'long skirt',
      price: '25',
      url: 'something.com',
      creationDate: '2024-01-12',
      isPurchased: false
    };

    store.editItem(editedItem);
    const item = store.wishList.find((i) => i.id === editedItem.id);

    expect(item).toEqual(expect.objectContaining(editedItem));
  });
});
