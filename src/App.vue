<template>
  <div id="app">
    <component :is="isAuthenticated ? 'Main' : 'Empty'">
      <router-view :key="$route.fullPath"/>
    </component>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {
    Main: () => import(/* webpackChunkName: "main" */ '@/layouts/Main'),
    Empty: () => import(/* webpackChunkName: "login" */ '@/layouts/Empty'),
  },
  computed: {
    ...mapGetters('auth', [
      'isAuthenticated',
    ]),
  },
};
</script>

<style lang="scss">
@import '~normalize.css';
@import '@/style';
</style>
