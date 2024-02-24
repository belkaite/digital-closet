<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);

const toggleAccordion = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <main>
    <div class=""></div>
    <div class="accordian">
      <div class="max-w-2xl m-8 mx-auto overflow-hidden">
        <div class="py-1 border-b outline-none group" tabindex="1">
          <div
            class="flex items-center justify-between py-3 text-gray-500 transition duration-500 cursor-pointer group ease"
            @click="toggleAccordion"
          >
            <div class="transition duration-500 ease group-hover:text-red-500">
              What is Digital Closet?
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

          <div
            v-show="isOpen"
            class="overflow-hidden transition duration-500 group-focus:max-h-screen max-h-0 ease"
          >
            <p class="py-2 text-justify text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, repellat amet
              doloribus consequuntur eos similique provident tempora voluptates iure quia fuga dicta
              voluptatibus culpa mollitia recusandae delectus id suscipit labore?
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
/* This is a single-line comment */
</style>
