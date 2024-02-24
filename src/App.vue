<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="app">
    <div class="intro">
    </div>
    <nav class="navigation">
      <RouterLink
        to="/"
        class="mx-2 border-b-2 border-transparent hover:border-black hover:text-black transition duration-500"
        >Home</RouterLink
      >
      <RouterLink
        :to="{ name: 'about' }"
        class=" mx-2 border-b-2 border-transparent hover:border-black hover:text-black transition duration-500"
        >About</RouterLink
      >
      <RouterLink
        :to="{ name: 'wishlist' }"
        class="mx-2 border-b-2 border-transparent hover:border-black hover:text-black transition duration-500"
        >Wish List</RouterLink
      >
      <RouterLink
        :to="{ name: 'upload' }"
        class="mx-2 border-b-2 border-transparent hover:border-black hover:text-black transition duration-500"
        >Upload</RouterLink
      >
      <RouterLink
        :to="{ name: 'saved' }"
        class="mx-2 border-b-2 border-transparent hover:border-black hover:text-black transition duration-500"
        >Saved</RouterLink
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
}
</style>
