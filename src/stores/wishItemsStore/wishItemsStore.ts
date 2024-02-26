import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useWishListStore = defineStore('wishlist', () => {
  type WishListItemType = {
    id: string;
    name: string;
    price: string;
    url: string;
    creationDate: string;
    isPurchased: boolean;
  };

  const wishList = ref<WishListItemType[]>([]);
  const error = ref<string | null>(null);

  try {
    const storedItems = localStorage.getItem('wishList');
    if (storedItems) {
      wishList.value = JSON.parse(storedItems);
    }
  } catch (err) {
    error.value = 'Failed to load habits from storage.';
  }

  const addItem = (wishListItem: Omit<WishListItemType, 'id' | 'creationDate'>) => {
    const id = new Date().getTime().toString();
    const creationDate = new Date().toISOString().substring(0, 10);
    const item = {
      id,
      name: wishListItem.name,
      price: wishListItem.price,
      creationDate,
      url: wishListItem.url,
      isPurchased: wishListItem.isPurchased
    };
    wishList.value.unshift(item);
  };

  const deleteItem = (id: string) => {
    wishList.value = wishList.value.filter((item) => item.id !== id);
  };

  const editItem = (editedItem: WishListItemType) => {
    const index = wishList.value.findIndex((i) => i.id === editedItem.id);
    if (index !== -1) {
      wishList.value[index] = { ...wishList.value[index], ...editedItem };
    }
  };

  const togglePurchaseStatus = (id: string) => {
    const index = wishList.value.findIndex((item) => item.id === id);
    if (index !== -1) {
      wishList.value[index].isPurchased = !wishList.value[index].isPurchased;
    }
  };

  return {
    wishList,
    addItem,
    deleteItem,
    editItem,
    togglePurchaseStatus
  };
});

export default useWishListStore;
