<script setup lang="ts">
const props = defineProps(['filter']);
</script>

<template>
  <div class="filter">
    <p>Filter by state:</p>
    <button
      type="button"
      class="to-purchase"
      @click="$emit('set-filter', 'to-purchase')"
      :class="{ selected: props.filter === 'to-purchase' }"
    >
      To purchase
    </button>
    <button
      type="button"
      class="purchased"
      @click="$emit('set-filter', 'purchased')"
      :class="{ selected: props.filter === 'purchased' }"
    >
      Purchased
    </button>
    <button type="button" v-if="props.filter" @click="$emit('set-filter', '')" class="clear">
      Clear X
    </button>
  </div>
</template>

<style>
h1 {
  color: black;
}

.selected {
  color: red;
}
</style>
