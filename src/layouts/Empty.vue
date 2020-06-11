<script>
export default {
  functional: true,
  render(h, { children }) {
    return h('div', {
      staticClass: 'empty-layout',
    }, [children]);
  },
};
</script>

<style lang="scss" scoped>
.empty-layout {
  width: 100%;
  height: 100vh;
  background: #eee;
}
</style>
