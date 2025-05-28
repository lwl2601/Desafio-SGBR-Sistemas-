import {createRouter, createWebHistory} from 'vue-router';
import MainLayout from '../layouts/MainLayout.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        component: () => import('../pages/HomePage.vue'),
      },
      {
        path: 'favoritos',
        component: () => import('../pages/FavoritesPage.vue'),
      },
      {
        path: 'categorias',
        component: () => import('../pages/CategoriesPage.vue'),
      },
      {
        path: 'sobre',
        component: () => import('../pages/AboutPage.vue'),
      },
    ],
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
