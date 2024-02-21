<script setup lang="ts">
import { ref } from 'vue';

const newItem = ref({ id: '', name: '', description: '' });


const wishList = ref([
  { id: '1', name: 'Cowboy boots', description: 'Here is the link:' },
  { id: '2', name: 'Skirt', description: 'Here is the link:' }
]);

const addItem = () => {
  const id = new Date().getTime().toString();
  const item = {
    id,
    name: newItem.value.name,
    description: newItem.value.description
  };
  wishList.value.unshift(item);
  newItem.value = { id: '', name: '', description: '' };
};
</script>

<template>
  <div class="create">
    <h1>Create</h1>
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
      <label for="description">Description:</label>
      <textarea v-model="newItem.description" id="description" placeholder="Description..." />
      <button @click="addItem" :disabled="!newItem" type="button">Add Item</button>
    </div>
    <div v-for="item in wishList" :key="item.id">
      <div class="listitem">
        <h2>
          {{ item.name }}
        </h2>
        <h2>
          {{ item.description }}
        </h2>
        <br />
        <br />
        <button type="button">edit</button>
        <br />
        <button type="button">delete</button>
      </div>
    </div>
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

.listitem {
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: navajowhite;
  border-radius: 12px;
  padding: 20px;
  width: 200px;
  position: relative;
}
</style>
