<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="app">
    <div class="intro">
      <h1>Your digital closet</h1>
    </div>
    <nav class="navigation container-md">
      <RouterLink to="/" class="nav-link">Home</RouterLink>
      <RouterLink :to="{ name: 'about' }" class="nav-link">About</RouterLink>
      <RouterLink :to="{ name: 'upload' }" class="nav-link">Upload</RouterLink>
      <RouterLink :to="{ name: 'create' }" class="nav-link">Create</RouterLink>
      <RouterLink :to="{ name: 'saved' }" class="nav-link">Saved</RouterLink>
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
