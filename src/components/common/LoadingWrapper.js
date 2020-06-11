import SkeletonGenerator from './SkeletonGenerator.vue';

export default {
  functional: true,
  components: {
    SkeletonGenerator,
  },
  props: {
    loading: Boolean,
    width: [String, Number],
    height: [String, Number],
  },
  render(h, { props, children }) {
    const { loading, width, height } = props;
    return loading
      ? h(SkeletonGenerator, {
        props: { width, height },
      })
      : children;
  },
};
