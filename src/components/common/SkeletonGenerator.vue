<script>
export default {
  functional: true,
  props: {
    width: [String, Number],
    height: [String, Number],
  },
  render(h, { props }) {
    let { width, height } = props;
    width = width ? `${width}px` : '100%';
    height = height ? `${height}px` : '100%';
    return h('div', {
      staticClass: 'skeleton',
      style: { width, height },
    });
  },
};
</script>

<style lang="scss" scoped>
// https://codepen.io/JCLee/pen/dyPejGV?editors=1100

.skeleton {
  position: relative;
  overflow: hidden;
  background-color: #DDDBDD;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(#fff, 0) 0,
      rgba(#fff, 0.2) 20%,
      rgba(#fff, 0.5) 60%,
      rgba(#fff, 0)
    );
    animation: shimmer 2s infinite;
    content: '';
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
}
</style>
