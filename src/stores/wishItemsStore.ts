import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

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

  const addItem = (wishListItem: Omit<WishListItemType, 'id' | 'creationDate'>) => {
    const id = new Date().getTime().toString();
    const creationDate = new Date().toISOString().substring(0, 10);
    const item = {
      id,
      name: wishListItem.name,
      price: wishListItem.price,
      creationDate,
      url: wishListItem.url,
      isPurchased: false
    };
    wishList.value.unshift(item);
  };

  const calculateItemsSum = computed(() => {
    return wishList.value.reduce((sum, item) => sum + Number(item.price), 0);
  });

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
    calculateItemsSum,
    deleteItem,
    editItem,
    togglePurchaseStatus
  };
});

export default useWishListStore;
