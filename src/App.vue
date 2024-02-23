<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="app">
    <div class="intro">
      <h1>Your digital closet</h1>
    </div>
    <nav class="navigation container-md">
      <RouterLink
        to="/"
        class="border-b-2 border-transparent hover:border-black hover:text-black transition duration-500"
        >Home</RouterLink
      >
      <RouterLink
        :to="{ name: 'about' }"
        class="border-b-2 border-transparent hover:border-black hover:text-black transition duration-500"
        >About</RouterLink
      >
      <RouterLink
        :to="{ name: 'wishlist' }"
        class="border-b-2 border-transparent hover:border-black hover:text-black transition duration-500"
        >Wish List</RouterLink
      >
      <RouterLink
        :to="{ name: 'upload' }"
        class="border-b-2 border-transparent hover:border-black hover:text-black transition duration-500"
        >Upload</RouterLink
      >
      <RouterLink
        :to="{ name: 'saved' }"
        class="border-b-2 border-transparent hover:border-black hover:text-black transition duration-500"
        >Saved</RouterLink
      >
    </nav>
    <RouterView />
  </div>
</template>

<style scoped>
.navigation {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>
