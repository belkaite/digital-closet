import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useWishListStore } from '../wishItemsStore';

describe('togglePurchaseStatus', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should change items purchase property correctly', () => {
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

    store.togglePurchaseStatus('1');

    expect(store.wishList[0].isPurchased).toEqual(true);
    expect(store.wishList[1].isPurchased).toEqual(false);

    store.togglePurchaseStatus('2');
    expect(store.wishList[1].isPurchased).toEqual(true);
  });
});
