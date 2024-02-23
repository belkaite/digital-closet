<script setup lang="ts"></script>

<template>
  <div class="modal" aria-modal="true" role="dialog" tabindex="-1">
    <div class="inner">
      <!-- <button type="button" class="close-btn" @click="closePopup">X</button> -->
      <slot></slot>
      <img
        src="@/assets/images/clothes-on-hanger.png"
        alt="clothes on hanger"
        class="object-fit rounded-xl h-80 md:h-64 md:rounded-l-xl transform hover:scale-105 hover:rounded-xl duration-200"
      />
    </div>
  </div>
</template>

<style>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 500;
  width: 100vw;
  height: 100vh;
  background: rgb(0 0 0 / 40%);
  display: grid;
  place-items: center;
  color: black;
}

.modal .inner {
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 50%;
}

.modal .inner h3 {
  font-size: 16px;
  font-weight: 700;
  line-height: 21px;
  margin-bottom: 20px;
}

.modal .inner .close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: transparent;
  border: none;
  color: black;
}

@media (width <= 600px) {
  .modal .inner {
    width: 300px;
  }
}
</style>
