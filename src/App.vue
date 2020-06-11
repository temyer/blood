<template>
  <div id="app">
    <component :is="isAuthenticated ? 'Main' : 'Empty'">
      <router-view :key="$route.fullPath"/>
    </component>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Main from '@/layouts/Main.vue';
import Empty from '@/layouts/Empty.vue';

export default {
  components: {
    Main,
    Empty,
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
