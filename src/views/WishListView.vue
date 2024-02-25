<script setup lang="ts">
import { ref, computed } from 'vue';
import WishItem from '@/components/WishItem.vue';
import useWishListStore from '@/stores/wishItemsStore';
import ItemFilter from '@/components/ItemFilter.vue';
import PopupModal from '@/components/PopupModal.vue';

const store = useWishListStore();
const filter = ref('');
const modalActive = ref(false);

const newItem = ref({ name: '', price: '', url: '' });

store.$subscribe((_, state) => {
  localStorage.setItem('wishList', JSON.stringify(state.wishList));
});

const addItem = () => {
  if (newItem.value.name && newItem.value.price) {
    store.addItem({ ...newItem.value, isPurchased: false });
    newItem.value = { name: '', price: '', url: '' };
    modalActive.value = false;
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
    <h1>Wish List / Your purchases planner</h1>
    <ItemFilter :filter="filter" @set-filter="setFilter" class="filter py-4" />
    <button
      @click="modalActive = true"
      type="button"
      class="bg-red-800 hover:bg-red-500 text-white mx-2 my-6 py-2 px-4 sm:py-3 sm:px-6 text-xl sm:text-5xl border border-gray-400 rounded shadow"
    >
      +
    </button>
    <PopupModal v-if="modalActive">
      <div class="form bg-neutral-100">
        <h2>Add a new item:</h2>
        <label for="new-item-title">Title:</label>
        <input v-model="newItem.name" ref="newItemRef" type="text" id="new-item-title" />
        <label for="new-item-price">Price:</label>
        <input v-model="newItem.price" type="number" ref="newItemRef" id="new-item-price" />
        <label for="url">Url:</label>
        <textarea v-model="newItem.url" id="url" />
        <button
          @click="addItem"
          :disabled="!newItem"
          type="button"
          class="mx-2 bg-red-800 hover:bg-red-500 text-white py-2 px-4 my-4 border border-gray-400 rounded shadow w-36"
        >
          Add Item
        </button>
        <button
          type="button"
          @click="modalActive = false"
          class="mx-2 bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-400 rounded shadow w-36"
        >
          Close
        </button>
      </div>
    </PopupModal>
    <div class="money-calculator my-6">
      <div class="flex items-center gap-2 ">
        <div class="w-5 h-5 bg-red-600 rounded-full hover:animate-ping"></div>
        <h2>Money to save: {{ calculateItemsSumToPurchase }} Eur</h2>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-5 h-5 bg-red-600 rounded-full hover:animate-ping"></div>
        <h2>Money spent: {{ calculateItemsSumPurchased }} Eur</h2>
      </div>
    </div>
    <WishItem v-for="item in filteredItems" :key="item.id" :item="item"></WishItem>
    <div v-if="filteredItems.length === 0" class="text-center text-red-500">No items have been added here yet.</div>
  </div>
</template>

<style scoped>
.form {
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
}


</style>
