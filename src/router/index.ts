import { createRouter, createWebHistory } from 'vue-router';
import Closet from '../views/ClosetView/ClosetView.vue';
import WishList from '../views/WishListView/WishListView.vue';
import About from '../views/AboutView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'about',
      component: About
    },
    {
      path: '/closet',
      name: 'closet',
      component: Closet
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: WishList
    },
    {
      path: '/:catchAll(.*)*',
      redirect: { name: 'about' }
    }
  ]
});

export default router;
