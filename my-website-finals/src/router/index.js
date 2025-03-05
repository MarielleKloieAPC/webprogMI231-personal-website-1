// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue'; // Adjust paths as needed
import EduExp from '@/components/Edu_Exp.vue'; 
import Interest from '../components/Interest.vue';
import Gallery from '../components/Gallery.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/edu_exp', component: EduExp },
  { path: '/interest', component: Interest },
  { path: '/gallery', component: Gallery },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;


