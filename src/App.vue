<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="app">
    <div class="intro"></div>
    <nav class="navigation">
      <RouterLink
        to="/"
        class="mx-2 border-b-2 border-transparent hover:border-red-600 hover:text-black transition duration-500"
        >About</RouterLink
      >
      <RouterLink
        :to="{ name: 'wishlist' }"
        class="mx-2 border-b-2 border-transparent hover:border-red-600 hover:text-black transition duration-500"
        >Wish List</RouterLink
      >
      <RouterLink
        :to="{ name: 'closet' }"
        class="mx-2 border-b-2 border-transparent hover:border-red-600 hover:text-black transition duration-500"
        >Closet</RouterLink
      >
    </nav>
    <RouterView />
  </div>
</template>

<style scoped>
.navigation {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-top: 20px;
  margin-bottom: 20px;
}

@media (width <= 600px) {
  .navigation {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
