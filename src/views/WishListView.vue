<script setup lang="ts">
import { ref, computed } from 'vue';
import WishItem from '@/components/WishItem.vue';
import useWishListStore from '@/stores/wishItemsStore';
import ItemFilter from '@/components/ItemFilter.vue';

const store = useWishListStore();
const filter = ref('');

const newItem = ref({ name: '', price: '', url: '' });

const addItem = () => {
  if (newItem.value.name && newItem.value.price) {
    store.addItem({ ...newItem.value, isPurchased: false });
    newItem.value = { name: '', price: '', url: '' };
  }
};

const setFilter = (value) => {
  filter.value = value;
};

const filteredItems = computed(() => {
  switch (filter.value) {
    case 'to-purchase':
      return store.wishList.filter((item) => !item.isPurchased);
    case 'purchased':
      return store.wishList.filter((item) => item.isPurchased);
      default:
        return store.wishList
  }
});

</script>

<template>
  <div class="create">
    <h1>WishList</h1>
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
        id="new-item-title"
        placeholder="Price..."
      />
      <label for="url">Url:</label>
      <textarea v-model="newItem.url" id="url" placeholder="Url..." />
      <button @click="addItem" :disabled="!newItem" type="button">Add Item</button>
    </div>
    <div>
      <h2>Money to save: {{ store.calculateItemsSum }}</h2>
    </div>
    <WishItem v-for="item in filteredItems" :key="item.id" :item="item"></WishItem>
  </div>
</template>

<style>
h1 {
  color: black;
}

.form {
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: whitesmoke;
  padding: 20px;
}
</style>
