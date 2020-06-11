<script>
import AppNavBar from '@/components/common/AppNavBar.vue';

export default {
  functional: true,
  render(h, { children }) {
    return h('div', {
      staticClass: 'main-layout',
    }, [
      h(AppNavBar),
      h('main', {
        staticClass: 'container',
      }, children),
    ]);
  },
};
</script>

<style lang="scss" scoped>
.main-layout {
  width: 100%;
  height: 100vh;
}
</style>
