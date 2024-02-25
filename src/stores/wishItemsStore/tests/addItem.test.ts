import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useWishListStore } from '../wishItemsStore';

describe('addItem', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should add a new item to the wish list', () => {
    const item = { name: 'skirt', price: '100', url: 'something.com', isPurchased: false };

    const store = useWishListStore();
    store.addItem(item);

    expect(store.wishList.length).toBe(1);
  });

  it('should add item to the beginning of the wish list', () => {
    const newItem = { name: 'shirt', price: '50', url: 'something.com', isPurchased: false };

    const store = useWishListStore();
    store.addItem(newItem);

    expect(store.wishList[0].name).toMatch('shirt');
  });
});
