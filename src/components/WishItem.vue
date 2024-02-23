<script setup lang="ts">
import { defineProps, ref, reactive } from 'vue';
import useWishListStore from '@/stores/wishItemsStore';
import PopupModal from '@/components/PopupModal.vue';

const modalActive = ref(false);
const store = useWishListStore();

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

type WishListItemType = {
  id: string;
  name: string;
  price: string;
  url: string;
  creationDate: string;
  isPurchased: boolean;
};

const editableItem = reactive({ ...props.item }) as WishListItemType;

const submitEdit = () => {
  store.editItem(editableItem);
  modalActive.value = false;
};
</script>

<template>
  <div class="listitem">
    <h2>
      {{ props.item.name }}
    </h2>
    <div>{{ props.item.price }}</div>
    <div class="url-wrapper">
      <a :href="props.item.url" target="_blank" rel="noopener noreferrer">{{ props.item.url }}</a>
    </div>
    <br />
    <div>{{ props.item.creationDate }}</div>
    <input
      type="checkbox"
      :id="`item-${props.item.id}`"
      :checked="props.item.isPurchased"
      @change="store.togglePurchaseStatus(props.item.id)"
    />
    <label :for="`item-${props.item.id}`">
      {{ props.item.isPurchased ? 'Purchased' : 'To purchase' }}
    </label>
    <br />
    <button @click="modalActive = true" type="button">edit</button>
    <br />
    <button type="button" @click="store.deleteItem(props.item.id)">delete</button>
  </div>
  <PopupModal v-if="modalActive">
    <h3>Edit item:</h3>
    <form @submit.prevent="submitEdit">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="editableItem.name" />
      <label for="price">Price:</label>
      <input type="number" id="price" v-model="editableItem.price" />
      <label for="url">Url:</label>
      <input type="text" id="url" v-model="editableItem.url" />
      <button type="submit">Save changes</button>
    </form>
  </PopupModal>
</template>

<style>
h1 {
  color: black;
}

.listitem {
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: navajowhite;
  border-radius: 12px;
  padding: 20px;
  width: 700px;
  position: relative;
  height: 400px;
}

.url-wrapper {
  word-break: break-all;
  margin-bottom: 10px;
}

.url-wrapper a {
  color: black;
  text-decoration: none;
}

.url-wrapper a:hover {
  text-decoration: underline;
}
</style>
