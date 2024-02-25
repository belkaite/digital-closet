<script setup lang="ts">
const props = defineProps(['filter']);
</script>

<template>
  <div class="filter">
    <h3 class="text-gray-500">Filter by state:</h3>
    <div>
      <button
        type="button"
        class="to-purchase mx-2 my-2 bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-400 rounded shadow"
        @click="$emit('set-filter', 'to-purchase')"
        :class="{ selected: props.filter === 'to-purchase' }"
      >
        To purchase
      </button>
      <button
        type="button"
        class="purchased mx-2 bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-400 rounded shadow"
        @click="$emit('set-filter', 'purchased')"
        :class="{ selected: props.filter === 'purchased' }"
      >
        Purchased
      </button>
      <button
        type="button"
        v-if="props.filter"
        @click="$emit('set-filter', '')"
        class="clear mx-2 bg-white hover:bg-gray-100 text-gray-00 py-2 px-4 border border-gray-400 rounded shadow"
      >
        Clear X
      </button>
    </div>
  </div>
</template>

<style>
h3 {
  font-size: 18px;
}

.selected {
  color: red;
}
</style>
