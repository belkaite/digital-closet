<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);

const toggle = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div>
    <div class="py-1 border-b outline-none group" tabindex="0">
      <div
        class="flex items-center justify-between py-3 text-gray-500 transition duration-500 cursor-pointer group ease"
        @click="toggle"
        @keyup.enter="toggle"
      >
        <div class="transition duration-500 ease group-hover:text-red-500">
          <slot name="title"></slot>
        </div>
        <div
          :class="{ 'rotate-180': isOpen, 'text-red-500': isOpen }"
          class="transition duration-500 ease"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12">
            <path fill="none" stroke="currentColor" stroke-width="3" d="M1 1l8 8 8-8" />
          </svg>
        </div>
      </div>

      <div v-show="isOpen" class="overflow-hidden transition duration-500 ease">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<style>
/* This is a single-line comment */
</style>

