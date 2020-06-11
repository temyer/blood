import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import { checkAuthentication, checkAccess, setPageTitle } from './guards';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
    meta: {
      authRequired: true,
      title: 'Мои анализы',
      transition: 'slide-right',
    },
  },
  {
    path: '/norms',
    name: 'Norms',
    component: () => import(/* webpackChunkName: "norms" */ '@/views/Norms.vue'),
    meta: {
      authRequired: true,
      title: 'Нормативы',
    },
  },
  {
    path: '/me',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "norms" */ '@/views/Profile.vue'),
    meta: {
      authRequired: true,
      title: 'Профиль',
    },
  },
  {
    path: '/analyze/:id(\\d+)',
    name: 'AddAnalyze',
    component: () => import(/* webpackChunkName: "norms" */ '@/views/AddAnalyze.vue'),
    meta: {
      authRequired: true,
      title: 'Редактировать анализ',
      transition: 'slide-left',
    },
  },
  {
    path: '/analyze/create',
    name: 'AddAnalyze',
    component: () => import(/* webpackChunkName: "norms" */ '@/views/AddAnalyze.vue'),
    meta: {
      authRequired: true,
      title: 'Создать анализ',
      transition: 'slide-left',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
    meta: {
      title: 'Авторизация',
    },
    beforeEnter: (to, from, next) => {
      if (store.getters['auth/isAuthenticated']) {
        next({ name: 'Home' });
      } else {
        next();
      }
    },
  },
  {
    path: '/logout',
    name: 'logout',
    beforeEnter: (to, from, next) => {
      store.dispatch('auth/logout');
      next({ name: 'login' });
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkExactActiveClass: 'active',
  routes,
});

router.beforeEach(checkAuthentication);
router.beforeEach(checkAccess);
router.beforeEach(setPageTitle);

export default router;
