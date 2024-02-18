import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import About from '../views/AboutView.vue';
import Upload from '../views/UploadView.vue';
import Create from '../views/CreateView.vue';
import Saved from '../views/SavedView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    },
    {
      path: '/create',
      name: 'create',
      component: Create
    },
    {
      path: '/saved',
      name: 'saved',
      component: Saved
    }
  ]
});

export default router;
