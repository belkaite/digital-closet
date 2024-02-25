import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useWishListStore } from '../wishItemsStore';

describe('deleteItem', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should remove item from wishlist', () => {
    const store = useWishListStore();

    store.wishList = [
      {
        id: '1',
        name: 'skirt',
        price: '20',
        creationDate: '2024-01-12',
        url: 'something.com',
        isPurchased: false
      },
      {
        id: '2',
        name: 'jeans',
        price: '50',
        creationDate: '2024-01-14',
        url: 'something.com',
        isPurchased: false
      }
    ];

    store.deleteItem('1');

    expect(store.wishList[0].id).not.toEqual(1);
    expect(store.wishList.length).toBe(1);
  });
});
