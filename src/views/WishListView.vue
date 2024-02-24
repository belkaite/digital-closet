<script setup lang="ts">
import { ref, computed } from 'vue';
import WishItem from '@/components/WishItem.vue';
import useWishListStore from '@/stores/wishItemsStore';
import ItemFilter from '@/components/ItemFilter.vue';

const store = useWishListStore();
const filter = ref('');

const newItem = ref({ name: '', price: '', url: '' });

store.$subscribe((_, state) => {
  localStorage.setItem('wishList', JSON.stringify(state.wishList));
});

const addItem = () => {
  if (newItem.value.name && newItem.value.price) {
    store.addItem({ ...newItem.value, isPurchased: false });
    newItem.value = { name: '', price: '', url: '' };
  }
};

const setFilter = (value: string) => {
  filter.value = value;
};

const filteredItems = computed(() => {
  switch (filter.value) {
    case 'to-purchase':
      return store.wishList.filter((item) => !item.isPurchased);
    case 'purchased':
      return store.wishList.filter((item) => item.isPurchased);
    default:
      return store.wishList;
  }
});

const calculateItemsSumToPurchase = computed(() => {
  return store.wishList
    .filter((item) => !item.isPurchased)
    .reduce((sum, item) => sum + Number(item.price), 0);
});

const calculateItemsSumPurchased = computed(() => {
  return store.wishList
    .filter((item) => item.isPurchased)
    .reduce((sum, item) => sum + Number(item.price), 0);
});
</script>

<template>
  <div class="create">
    <h1 class="dark:bg-darkBlue dark:text-white">WishList</h1>
    <ItemFilter :filter="filter" @set-filter="setFilter" />
    <div class="form">
      <h3>Add a new item</h3>
      <label for="new-item-title">Title:</label>
      <input
        v-model="newItem.name"
        ref="newItemRef"
        type="text"
        id="new-item-title"
        placeholder="Title..."
      />
      <label for="new-item-price">Price:</label>
      <input
        v-model="newItem.price"
        type="number"
        ref="newItemRef"
        id="new-item-price"
        placeholder="Price..."
      />
      <label for="url">Url:</label>
      <textarea v-model="newItem.url" id="url" placeholder="Url..." />
      <button @click="addItem" :disabled="!newItem" type="button">Add Item</button>
    </div>
    <div class="w-5 h-5 bg-amber-200 rounded-full hover:animate-ping"></div>
    <div>
      <h2>Money to save: {{ calculateItemsSumToPurchase }}</h2>
      <h2>Money spent: {{ calculateItemsSumPurchased }}</h2>
    </div>
    <WishItem v-for="item in filteredItems" :key="item.id" :item="item"></WishItem>
  </div>
</template>

<style>


.form {
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: whitesmoke;
  padding: 20px;
}
</style>
