<script setup lang="ts">
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['delete'])

const handleDelete = () => {
 emit('delete', props.item.id)
}
</script>

<template>
  <div class="listitem">
    <h2>
      {{ props.item.name }}
    </h2>
    <div>{{ props.item.price }}</div>
    <div class="url-wrapper">
      <a :href="props.item.url" target="_blank" rel="noopener noreferrer">{{ props.item.url }}</a>
    </div>
    <br />
    <div>{{ props.item.creationDate }}</div>
    <br />
    <button type="button">edit</button>
    <br />
    <button type="button" @click="handleDelete">delete</button>
  </div>
</template>

<style>
h1 {
  color: black;
}

.listitem {
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: navajowhite;
  border-radius: 12px;
  padding: 20px;
  width: 700px;
  position: relative;
  height: 400px;
}

.url-wrapper {
  word-break: break-all;
  margin-bottom: 10px;
}

.url-wrapper a {
  color: black;
  text-decoration: none;
}

.url-wrapper a:hover {
  text-decoration: underline;
}
</style>
