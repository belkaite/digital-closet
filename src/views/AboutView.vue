<script setup lang="ts">
import AccordionItem from '../components/AccordionItem.vue';
</script>

<template>
  <main>
    <h1>About / It all started with the wish to make the wardrobe smarter</h1>
    <div class="accordion">
      <AccordionItem>
        <template #title> What inspired the creation of Digital Closet? </template>
        <template #content>
          <p class="py-2 text-justify text-gray-400">
            The fashion industry is a major polluter and our closets are often cluttered with
            clothes we hardly remember owning. Often we're easily attempted by trends, buying items
            we rarely need. This app aims to encourage mindful shopping by helping you to plan
            purchases wisely, track your wardrobe and create outfits from what you already own.
          </p>
          <img src="@/assets/images/dress.svg" alt="Dress" />
        </template>
      </AccordionItem>
      <AccordionItem>
        <template #title> Main features </template>
        <template #content>
          <p class="py-2 text-justify text-gray-400">
            Wish List - an assitant for purchase planning. This feature enables you to create and
            save notes about wanted items in one convenient place. Documenting your intended
            purchases gives you the opportunity to reflect on their necessity, reducing impulsive
            buys when in-store. Try to stick to your wishlist for mindful shopping.
            <img src="@/assets/images/list.svg" alt="List" />
            <br />
            Closet - digital wardrobe storage. Capture and upload photos of your clothing items to
            this digital platform. You'll be amazed by the number of stylish pieces you already own,
            ready to be reimagined and worn in new ways.
            <img src="@/assets/images/folded-clothes.svg" alt="Folded clothes" />
            <br />
            To be added: Outfit Generator - this exciting feature will allow you to create cool
            outfits by dragging and dropping items from your digital closet into a collage. Discover
            new ways to combine your existing wardrobe pieces.
            <img src="@/assets/images/puzzle.svg" alt="Folded clothes" />
          </p>
        </template>
      </AccordionItem>
    </div>
  </main>
</template>

<style scoped>
h1 {
  font-weight: bold;
  font-size: 25px;
}

img {
  width: 200px;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
