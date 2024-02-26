<script setup lang="ts">
import { defineProps, ref, reactive } from 'vue';
import useWishListStore from '@/stores/wishItemsStore/wishItemsStore';
import PopupModal from '@/components/PopupModal.vue';

const modalActive = ref<boolean>(false);
const store = useWishListStore();
const validationError = ref<string>('');

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
  if (!editableItem.name || !editableItem.price) {
    validationError.value = 'Name and price are required.';
    setTimeout(() => {
      validationError.value = '';
    }, 3000);
    return;
  }
  if (Number.isNaN(Number(editableItem.price))) {
    validationError.value = 'Price must be a number.';
    setTimeout(() => {
      validationError.value = '';
    }, 3000);
    return;
  }
  store.editItem(editableItem);
  modalActive.value = false;
};
</script>

<template>
  <div class="border border-gray-200 bg-white shadow-md rounded-md px-4 py-4 my-4">
    <h2>
      {{ props.item.name }}
    </h2>
    <div>{{ props.item.price }} Eur</div>
    <div>
      <a
        :href="props.item.url"
        target="_blank"
        rel="noopener noreferrer"
        class="text-red-500 hover:underline"
        >Link</a
      >
    </div>
    <br />
    <div class="text-gray-500">{{ props.item.creationDate }}</div>
    <input
      type="checkbox"
      :id="`item-${props.item.id}`"
      class="accent-red-600"
      :checked="props.item.isPurchased"
      @change="store.togglePurchaseStatus(props.item.id)"
    />
    <label :for="`item-${props.item.id}`">
      {{ props.item.isPurchased ? 'Purchased' : 'To purchase' }}
    </label>
    <br />
    <button
      type="button"
      @click="modalActive = true"
      class="x-2 my-2 bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-400 rounded shadow inline-flex items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
      <span>Edit</span>
    </button>
    <br />
    <button
      type="button"
      class="my-2 bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-400 rounded shadow"
      @click="store.deleteItem(props.item.id)"
    >
      Delete
    </button>
  </div>
  <PopupModal v-if="modalActive">
    <div class="bg-neutral-100 p-5 flex flex-col space-y-4">
      <h2>Edit item:</h2>
      <form @submit.prevent="submitEdit" class="flex flex-col space-y-2">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="editableItem.name" />
        <label for="price">Price:</label>
        <input type="number" id="price" v-model="editableItem.price" />
        <label for="url">Url:</label>
        <input type="text" id="url" v-model="editableItem.url" />
        <div v-if="validationError" class="text-red-500">{{ validationError }}</div>
        <button
          type="submit"
          class="mx-2 bg-red-800 hover:bg-red-500 text-white py-2 px-4 my-4 border border-gray-400 rounded shadow w-36"
        >
          Save changes
        </button>
      </form>
    </div>
  </PopupModal>
</template>
