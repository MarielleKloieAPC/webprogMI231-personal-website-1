// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue'; // Adjust paths as needed
import EduExp from '@/components/Edu_Exp.vue'; 
import Interest from '../components/Interest.vue';
import Gallery from '../components/Gallery.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/edu_exp', name: 'EduExp', component: EduExp },
  { path: '/interest', name: 'Interest', component: Interest },
  { path: '/gallery', name: 'Gallery', component: Gallery },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;


