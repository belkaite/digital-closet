<script setup lang="ts">
import { ref } from 'vue';
import WishItem from '@/components/WishItem.vue';
import useWishListStore from '@/stores/wishItemsStore';

const store = useWishListStore();


const newItem = ref({ name: '', price: '', url: '' });

const addItem = () => {
  if (newItem.value.name && newItem.value.price) {
    store.addItem({ ...newItem.value });
    newItem.value = { name: '', price: '', url: '' };
  }
};
</script>

<template>
  <div class="create">
    <h1>WishList</h1>
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
    <WishItem
      v-for="item in store.wishList"
      :key="item.id"
      :item="item"
    ></WishItem>
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
