<script setup lang="ts">
import { defineProps, ref, reactive } from 'vue';
import useWishListStore from '@/stores/wishItemsStore';
import PopupModal from '@/components/PopupModal.vue';
import VueLinkPreview from '@ashwamegh/vue-link-preview';

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
  <div class="border border-gray-200 bg-white shadow-md rounded-md px-4 py-4 my-4">
    <h2>
      {{ props.item.name }}
    </h2>
    <div>{{ props.item.price }}</div>
    <vue-link-preview :url="props.item.url">
      <template v-slot:loader>
        <div class="text-center py-2">
          <div role="status">
            <svg
              aria-hidden="true"
              class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
          Please wait, the link preview is loading, usually it takes some time.
        </div>
      </template>
      <template v-slot:default="preview">
        <div class="flex flex-col p-3 space-y-1">
          <a
            :href="preview.url"
            class="text-lg leading-tight no-underline text-primary hover:no-underline hover:text-primary sm:text-xl"
          >
            {{ preview.title || 'No title available' }}
          </a>
          <p class="text-gray-500">{{ preview.domain || 'Domain information not available' }}</p>
          <p class="text-sm">{{ preview.description || 'Description not available' }}</p>
          <img v-if="preview.img" class="w-full h-96 object-cover" :src="preview.img" :alt="preview.title" />
          <div v-else class="text-center text-gray-500">No image available</div>
        </div>
      </template>
    </vue-link-preview>
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

<style scoped>
h1 {
  color: black;
}
</style>
