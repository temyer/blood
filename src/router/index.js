import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
  },
  {
    path: '/norms',
    name: 'Norms',
    component: () => import(/* webpackChunkName: "norms" */ '@/views/Norms.vue'),
  },
  {
    path: '/me',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "norms" */ '@/views/Profile.vue'),
  },
  {
    path: '/analyze/:id(\\d+)',
    name: 'AddAnalyze',
    component: () => import(/* webpackChunkName: "norms" */ '@/views/AddAnalyze.vue'),
  },
  {
    path: '/analyze/create',
    name: 'AddAnalyze',
    component: () => import(/* webpackChunkName: "norms" */ '@/views/AddAnalyze.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkExactActiveClass: 'active',
  routes,
});

export default router;
