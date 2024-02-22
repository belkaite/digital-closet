<script setup lang="ts">
import { ref, computed } from 'vue';
import WishItem from '@/components/WishItem.vue';


const newItem = ref({ id: '', name: '', price: '', url: '' });

const wishList = ref([
  { id: '1', name: 'Cowboy boots', price: '100' },
  { id: '2', name: 'Skirt', price: '50' }
]);

const addItem = () => {
  const id = new Date().getTime().toString();
  const creationDate = new Date().toISOString().substring(0, 10);
  const item = {
    id,
    name: newItem.value.name,
    price: newItem.value.price,
    creationDate,
    url: newItem.value.url
  };
  wishList.value.unshift(item);
  newItem.value = { id: '', name: '', price: '', url: '' };
};

const calculateItemsSum = computed(() => {
  let sum = 0;
  wishList.value.forEach((item) => {
    sum += Number(item.price);
  });
  return sum;
});

const deleteItem = (id: string) => {
  wishList.value = wishList.value.filter(item => { return item.id !== id})
}

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
        ref="newItemRef"
        type="text"
        id="new-item-title"
        placeholder="Price..."
      />
      <label for="url">Url:</label>
      <textarea v-model="newItem.url" id="url" placeholder="Url..." />
      <button @click="addItem" :disabled="!newItem" type="button">Add Item</button>
    </div>
    <div>
      <h2>Money to save: {{ calculateItemsSum }}</h2>
    </div>
    <WishItem v-for="item in wishList" :key="item.id" :item="item" @delete="deleteItem"></WishItem>
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
