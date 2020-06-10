import BClickable from '../BClickable/index';

export default BClickable.extend({
  name: 'b-link',
  computed: {
    tag() {
      return this.$attrs.to ? 'router-link' : 'a';
    },
  },
});
