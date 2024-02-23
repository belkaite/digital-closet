import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useWishListStore = defineStore('wishlist', () => {
  const wishList = ref([
    { id: '1', name: 'Cowboy boots', price: '100' },
    { id: '2', name: 'Skirt', price: '50' }
  ]);

  type WishListItemType = {
    id: string;
    name: string;
    price: string;
    url: string;
    creationDate: string;
  };

  const addItem = (wishListItem: Omit<WishListItemType, 'id' | 'creationDate'>) => {
    const id = new Date().getTime().toString();
    const creationDate = new Date().toISOString().substring(0, 10);
    const item = {
      id,
      name: wishListItem.name,
      price: wishListItem.price,
      creationDate,
      url: wishListItem.url
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

  return {
    wishList,
    addItem,
    calculateItemsSum,
    deleteItem,
    editItem
  };
});

export default useWishListStore;
